const ErrorHandler = require("../utils/errorhandler");
const catchAsyncError = require("./catchAsyncError");
const User = require("../models/UserModel");
const jwt = require("jsonwebtoken");

exports.isAuthenticatedUser = catchAsyncError(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new ErrorHandler("please Login", 401));
  }

  const unhashedToken = CryptoJS.AES.decrypt(token, process.env.CRYPTO_KEY).toString(CryptoJS.enc.Utf8)

  const decodedData = jwt.verify(unhashedToken, process.env.JWT_SEC);

  req.user = await User.findById(decodedData.id);

  if (!req.user) {
    return next(
      new ErrorHandler(`user does not exist with Id: ${decodedData.id}`, 400)
    );
  }

  next();
});

exports.checkForRefreshToken = catchAsyncError(async (req, res, next) => {
  const { refreshToken } = req.cookies;

  if (!refreshToken) {
    return next(new ErrorHandler("You are not authenticated!", 401));
  }

  const unhashedRefreshToken = CryptoJS.AES.decrypt(refreshToken, process.env.CRYPTO_KEY).toString(CryptoJS.enc.Utf8)


  const decodedData = jwt.verify(unhashedRefreshToken, process.env.JWT_SEC);

  req.user = await User.findById(decodedData.id);

  if (!req.user) {
    return next(
      new ErrorHandler(`user does not exist with Id: ${decodedData.id}`, 400)
    );
  }

  if (req.user.refreshTokens !== refreshToken) {
    return next(
      new ErrorHandler(`Refresh token is not valid!`, 400)
    );
  }

  next();
});

exports.authorizeRoles = (...roles) => {
  // ...roles as array
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `Role: ${req.user.role} is not allowed to access this resourse`,
          403
        )
      );
    }

    next();
  };
};
