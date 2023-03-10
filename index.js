const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const createError = require("http-errors");
require("dotenv").config();

const authRoute = require("./routes/auth.route");
const mongo = require("./helpers/mongoDB");
mongo.connectDB();
const { verifyAccessToken } = require("./helpers/generateToken");

const app = express();

app.use(morgan("tiny"));
app.use(express.json());
app.get("/", verifyAccessToken, async (req, res, next) => {
  res.status(200).json({
    message:
      "Hello Sudip Kumar Ji, Lets explore the power of jwt authentication",
  });
  console.log("Welcome to index page ");
});

app.use("/auth", authRoute);

app.use(async (req, res, next) => {
  //   const error = new Error('Not Found');
  //   error.status = 404;
  //   next(error);
  next(createError.NotFound("This route does not exist "));
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
});

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server is running at port ${port}🌟`);
});
