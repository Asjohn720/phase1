const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const sendToken = require("../utils/jwtToken");
const express = require("express");
const User = require("../models/loginSignupModal");

// Register a User
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
  const { name, username, password, mobile } = req.body;
  const user = await User.create({
    name,
    username,
    mobile,
    password,
    role: "Patient",
  });
  sendToken(user, 201, res);
});

// Admin  Login
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  const { username, password } = req.body;
  let user;

  if (username) {
    if (!username || !password) {
      return next(new ErrorHander("Please Enter UserName & Password", 400));
    }

    user = await User.findOne({ username }).select("+password");

    if (!user) {
      return next(new ErrorHander("Invalid UserName or password", 401));
    }
    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
      return next(new ErrorHander("Invalid UserName or password", 401));
    }
  }
  sendToken(user, 201, res, "Login successful!");
});
