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

  const isPasswordMatched = user.comparePassword(req.body.oldPassword);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Old password is incorrect", 401));
  }

  if (req.body.newPassword !== req.body.confirmPassword) {
    return next(new ErrorHandler("Password does not match", 401));
  }

  user.password = req.body.newPassword;

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
      width: 250,
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
    message: "changes Done",
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
      new ErrorHandler(`user does not exist with Id: ${req.params.id}`, 400)
    );
  }

  usered = await User.findByIdAndUpdate(req.params.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  })


  res.status(200).json({
    message: "changes Done",
  });
});

// Delete User -- Admin
exports.deleteUserProfile = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorHandler(`user does not exist with Id: ${req.params.id}`, 400)
    );
  }

  const imageId = user.avatar.public_id;
    await cloudinary.v2.uploader.destroy(imageId);

  await user.remove();

  // we will remove cloudinary later

  res.status(200).json({
    message: "User Deleted Successfully",
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
      new ErrorHandler(`User does not exist with Id: ${req.params.id}`)
    );
  }

  res.status(200).json({
    user,
  });
});

// router.get("/", verifyAdmin, async (req, res) => {
//   const query = req.query.new; // if there is a query new then give 5 new user
//   try {
//     const users = query
//       ? await User.find().sort({ _id: -1 }).limit(5)
//       : await User.find();
//     const { password, ...others } = users._doc;
//     return res.status(200).json(others);
//   } catch (err) {
//     return res.status(500).json(err);
//   }
// });

// // Get One User
// router.get("/:id", verifyAdmin, async (req, res) => {
//   try {
//     const user = await User.findById(req.params.id);
//     const { password, ...others } = user._doc;
//     return res.status(200).json(others);
//   } catch (err) {
//     return res.status(500).json(err);
//   }
// });
