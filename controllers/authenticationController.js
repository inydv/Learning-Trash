const User = require("../models/UserModel");
const catchAsyncErrors = require("../middleware/catchAsyncError");
const sendEmail = require("../utils/sendEmail");
const ErrorHandler = require("../utils/errorhandler");
const sendToken = require("../utils/jwtToken");
const sendTokenAfterRefresh = require("../utils/jwtTokenAfterRefresh");
const crypto = require("crypto");
const cloudinary = require("cloudinary");
const CryptoJS = require("crypto-js");
const cron = require("node-cron");

// Register
exports.registerUser = catchAsyncErrors(async (req, res) => {
  const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
    folder: "avatars",
    // width: 150,
    crop: "scale"
  })

  const { username, email, password } = req.body;

  const unhashedPW = CryptoJS.AES.decrypt(password, process.env.CRYPTO_KEY).toString(CryptoJS.enc.Utf8)

  const user = await User.create({
    username,
    email,
    password: unhashedPW,
    avatar: {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    },
  });

  // Get Verification Token
  const token = user.getVerificationToken();

  const verificationURL = `${req.protocol}://${req.get(
    "host"
  )}/api/verify/${token}`;

  const link = verificationURL;

  await sendEmail({
    email: email,
    subject: `Verify Your The Little Things Account`,
    link,
  });

  res.status(200).json({
    message: `Email Sent To ${email} Successfully`,
  });

  sendToken(user, 201, res);
});

// Login
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler("Please Enter Email & Password", 400));
  }

  const user = await User.findOne({ email }).select("+password");   // User.findOne(emal, "-password")

  if (!user) {
    return next(new ErrorHandler("Invalid Email Or Password", 401));
  }

  if (!user.isVerified) {
    return next(new ErrorHandler("Account Is Not Verified", 401));
  }

  const unhashedPW = CryptoJS.AES.decrypt(password, process.env.CRYPTO_KEY).toString(CryptoJS.enc.Utf8)

  const isPasswordMatched = user.comparePassword(unhashedPW);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid Email Or Password", 401));
  }

  sendToken(user, 200, res);
});

// Logout
exports.logout = catchAsyncErrors(async (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.cookie("refreshTokens", null, {
    httpOnly: true,
  });

  res.status(200).json({
    message: "Logged Out",
  });
});

// Link for Forgot Password
exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorHandler("User Not Found", 404));
  }

  if (!user.isVerified) {
    return next(new ErrorHandler("Account Is Not Verified", 401));
  }

  // Get resetPW Token
  const resetToken = user.getResetPasswordToken();

  await user.save();

  const resetPasswordUrl = `${req.protocol}://${req.get(
    "host"
  )}/password/reset/${resetToken}`;

  const link = resetPasswordUrl;

  try {
    await sendEmail({
      email: user.email,
      subject: `Reset Your The Little Things Password`,
      link,
    });

    res.status(200).json({
      message: `Email Sent To ${user.email} Successfully`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    return next(new ErrorHandler(error.message, 500));
  }
});

// reset Password
exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
  // creating token hash
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(
      new ErrorHandler(
        "Reset Password Token is Invalid Or Has Been Expired",
        400
      )
    );
  }

  const unhashedPW = CryptoJS.AES.decrypt(req.body.password, process.env.CRYPTO_KEY).toString(CryptoJS.enc.Utf8)
  const unhashedCPW = CryptoJS.AES.decrypt(req.body.confirmPassword, process.env.CRYPTO_KEY).toString(CryptoJS.enc.Utf8)

  if (unhashedPW !== unhashedCPW) {
    return next(new ErrorHandler("Password Does Not Match", 400));
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  sendToken(user, 200, res);
});

// refresh Token
exports.refreshToken = catchAsyncErrors(async (req, res) => {
  sendTokenAfterRefresh(req.user, 201, res);
})

// verifyAccount
exports.verifyAccount = catchAsyncErrors(async (req, res) => {
  const isVerifiedToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    isVerifiedToken,
    isVerifiedTokenExpire: { $gt: Date.now() },
  });

  if (!user) {
    res.render('unverifyTemplate')
  } else {
    user.isVerified = true;
    user.isVerifiedToken = undefined;
    user.isVerifiedTokenExpire = undefined;

    await user.save();

    res.render('verifyTemplate')
  }
})

cron.schedule("0 */1 * * *", function () {
  User.deleteMany({ isVerifiedTokenExpire: { $gt: Date.now() } })
});