const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken");
const User = require("../models/loginSignupModal");

exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
  const bearerToken = req.headers.authorization;
  req.token = bearerToken;

  if (!bearerToken) {
    return next(new ErrorHander("Please Login to access this resource", 401));
  }
  const token = bearerToken.split(" ")[1];

  const decodedData = jwt.verify(token, process.env.JWT_SECRET);

  req.user = await User.findById(decodedData.id);

  next();
});
