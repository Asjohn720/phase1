const sendToken = (user, statusCode, res, message) => {
  const token = user.getJWTToken();

  res.status(statusCode).json({
    success: true,
    message: message,
    user,
    token: `Bearer ${token}`,
  });
};

module.exports = sendToken;
