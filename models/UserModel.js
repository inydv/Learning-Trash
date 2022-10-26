const mongoose = require("mongoose");
const validator = require("validator");
const CryptoJS = require("crypto-js"); // encryption - decryption
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please Enter Your Name"],
      maxlength: [30, "Name cannot exceed Characters"],
      minlength: [4, "Name should have more than 4 characaters"],
    },
    email: {
      type: String,
      required: [true, "Please Enter Your Email"],
      unique: true,
      validate: [validator.isEmail, "Please Enter a valid Email"],
    },
    password: {
      type: String,
      required: [true, "Please Enter Your Password"],
      minlength: [8, "Password should be greater than 8 characters"],
      select: false,
    },
    avatar: {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
    role: {
      type: String,
      default: "user",
    },
    refreshTokens: String,
    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },
  {
    timestamps: true,
  }
);

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    // let we only change username and email (not PW) then this condition run
    next();
  }

  this.password = await CryptoJS.AES.encrypt(
    this.password,
    process.env.PASS_SEC
  ).toString();
});

// JWT TOKEN
UserSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SEC, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

// Get Refresh JWT Token
UserSchema.methods.getRefreshJWTToken = function () {
  return this.refreshTokens = jwt.sign({ id: this._id }, process.env.JWT_SEC, {
    expiresIn: process.env.REFRESH_JWT_EXPIRE,
  }); 
}

// Compare Password
UserSchema.methods.comparePassword = function (enteredPassword) {
  const hashedPassword = CryptoJS.AES.decrypt(
    this.password,
    process.env.PASS_SEC
  ).toString(CryptoJS.enc.Utf8); // if using any other character then using like this

  if (hashedPassword === enteredPassword) {
    return true;
  } else {
    return false;
  }
};

// Generating Password Reset Token
UserSchema.methods.getResetPasswordToken = function () {
  // Generating Token
  const resetToken = crypto.randomBytes(20).toString("hex");

  // Hashing and add to userSchema
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

  return resetToken;
};

module.exports = mongoose.model("User", UserSchema);
