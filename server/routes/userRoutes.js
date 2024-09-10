const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  updateUser,
  getUser,
  getUsers,
  deleteUser,
  importUserData,
} = require("../controllers/userController");

const upload = require("../controllers/fileController");

router.get("/", getUsers);
router.get("/:id", getUser);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);
router.post("/upload-users", upload.single("excel"), importUserData);

module.exports = router;
