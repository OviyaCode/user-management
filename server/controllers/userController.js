const xlsx = require("xlsx");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

const registerUser = asyncHandler(async (req, res) => {
  const {
    firstname,
    lastname,
    email,
    password,
    role,
    dob,
    gender,
    city,
    state,
    mobile,
  } = req.body;

  if (!email || !password || !firstname || !lastname) {
    res.status(400);
    throw new Error("Please fill all fields");
  }
  const userExist = await User.findOne({ email });

  if (userExist) {
    res.status(400);
    throw new Error("User already exists");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    firstname,
    lastname,
    email,
    password: hashedPassword,
    role: role || "user",
    dob,
    gender,
    city,
    state,
    mobile,
  });

  if (user) {
    res.status(200).json({
      _id: user.id,
      name: user.firstname,
      email: user.email,
      role: user.role,
      token: generateJWT(user.id),
    });
  } else {
    res.status(400);
    throw new Error("Internal server error");
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    res.status(400);
    throw new Error("User doesn't exist");
  }

  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      message: `Successfully logged in`,
      token: generateJWT(user.id),
      name: user.name,
      userId: user.id,
      role: user.role,
      email: user.email,
      dp: user.dp,
    });
  } else {
    res.status(400);
    throw new Error("Invalid credentials");
  }
});

const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    res.status(400);
    throw new Error("User not found");
  }

  if (req.body.password) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashedPassword;
  }

  const updateUser = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json({
    message: `Your profile is updated`,
    updateUser,
  });
});

const getUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    res.status(400);
    throw new Error("User not found");
  }
  res.status(200).json(user);
});

const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select("-password");
  res.status(200).json(users);
});

const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    res.status(400);
    throw new Error("User not found");
  }

  await User.deleteOne();
  res.status(200).json({
    message: `User deleted ${req.params.id}`,
  });
});

const importUserData = asyncHandler(async (req, res) => {
  if (!req.file) {
    res.status(400);
    throw new Error("Please upload an Excel file");
  }

  // Log file path for debugging
  console.log("File path:", req.file.path);

  const filePath = req.file.path;

  // Ensure file exists and is readable
  const fs = require("fs");
  if (!fs.existsSync(filePath)) {
    res.status(400);
    throw new Error("Uploaded file does not exist");
  }

  // Read the uploaded Excel file
  const workbook = xlsx.readFile(filePath);
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  const users = xlsx.utils.sheet_to_json(worksheet);

  // Log the number of users read from the file for debugging
  console.log("Number of users read:", users.length);

  // Iterate over the Excel rows and create users in the database
  for (const userData of users) {
    const {
      FirstName,
      LastName,
      Email,
      Password,
      Role,
      DOB,
      Gender,
      Mobile,
      City,
      State,
    } = userData;

    if (!FirstName || !LastName || !Email || !Password) {
      continue; // Skip rows with missing mandatory fields
    }

    // Check if the user already exists
    const userExists = await User.findOne({ email: Email });
    if (userExists) {
      continue; // Skip existing users
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(Password, salt);

    // Create a new user in the database
    const user = new User({
      firstname: FirstName,
      lastname: LastName,
      email: Email,
      password: hashedPassword,
      role: Role || "User",
      dob: DOB,
      gender: Gender,
      mobile: Mobile,
      city: City,
      state: State,
    });

    await user.save();
  }

  res.status(200).json({ message: "Users imported successfully" });
});

const generateJWT = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

module.exports = {
  registerUser,
  loginUser,
  updateUser,
  getUser,
  getUsers,
  deleteUser,
  importUserData,
};
