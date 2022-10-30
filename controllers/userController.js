const User = require("../models/UserModel");
const catchAsyncErrors = require("../middleware/catchAsyncError");
const ErrorHandler = require("../utils/errorhandler");
const sendToken = require("../utils/jwtToken");
const cloudinary = require("cloudinary");

// Get User Detail
exports.getUserDetails = catchAsyncErrors(async (req, res) => {
  const user = await User.findById(req.user.id);

  sendToken(user, 200, res);
});

// Update User password
exports.updatePassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");

  const unhashedOPW = CryptoJS.AES.decrypt(req.body.oldPassword, process.env.CRYPTO_KEY).toString(CryptoJS.enc.Utf8)
  const unhashedNPW = CryptoJS.AES.decrypt(req.body.newPassword, process.env.CRYPTO_KEY).toString(CryptoJS.enc.Utf8)
  const unhashedCPW = CryptoJS.AES.decrypt(req.body.confirmPassword, process.env.CRYPTO_KEY).toString(CryptoJS.enc.Utf8)

  const isPasswordMatched = user.comparePassword(unhashedOPW);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Old Password is Incorrect", 401));
  }

  if (unhashedNPW !== unhashedCPW) {
    return next(new ErrorHandler("Password Does Not Match", 401));
  }

  user.password = unhashedNPW;

  await user.save();

  sendToken(user, 200, res);
});

// Update User profile
exports.updateProfile = catchAsyncErrors(async (req, res) => {
  const newUserData = {
    username: req.body.username,
    email: req.body.email,
  };

  if (req.body.avatar !== "") {
    const user = await User.findById(req.user._id)

    const imageId = user.avatar.public_id;
    await cloudinary.v2.uploader.destroy(imageId);

    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
      folder: "avatars",
      // width: 250,
      crop: "scale"
    })

    newUserData.avatar = {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    }
  }

  const user = await User.findByIdAndUpdate(
    req.user.id,
    {
      $set: newUserData,
    },
    { new: true }
  );

  res.status(200).json({
    message: "Changes Done",
    user
  });
});

// update User Role -- Admin
exports.updateUserRole = catchAsyncErrors(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  };

  const usered = await User.findById(req.params.id);

  if (!usered) {
    return next(
      new ErrorHandler(`User Does Not Exist With Id: ${req.params.id}`, 400)
    );
  }

  usered = await User.findByIdAndUpdate(req.params.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  })


  res.status(200).json({
    message: "Changes Done",
    usered
  });
});

// Delete User -- Admin
exports.deleteUserProfile = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorHandler(`User Does Not Exist With Id: ${req.params.id}`, 400)
    );
  }

  const imageId = user.avatar.public_id;
  await cloudinary.v2.uploader.destroy(imageId);

  const deletedUser = await user.remove();

  // TODO we will remove cloudinary later

  res.status(200).json({
    message: "User Deleted Successfully",
    deletedUser
  });
});

// Get All User -- Admin
exports.getAllUser = catchAsyncErrors(async (req, res) => {
  const users = await User.find();

  res.status(200).json({
    users,
  });
});

// Get single User -- Admin
exports.getSingleUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorHandler(`User Does Not Exist With Id: ${req.params.id}`)
    );
  }

  res.status(200).json({
    user,
  });
});