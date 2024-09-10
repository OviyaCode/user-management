const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv").config();
const connectDB = require("./config/dbConnect");
const port = process.env.PORT || 5000;
const { errorHandler } = require("./middleware/errorMiddleware");

const app = express();

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: false }));

const corsOptions = {
  origin: ["http://localhost:3000", `http://localhost:${port}`],
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.options("*", cors());

//user routes
app.use("/api/users", require("./routes/userRoutes"));

//middleware
app.use(errorHandler);

//checking
app.get("/", (req, res) => {
  res.send("Hello world!");
});

// start server
connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server started on port ${port}`);
    });
  })
  .catch((error) => {
    console.error(`Error connecting with database: ${error}`);
  });
