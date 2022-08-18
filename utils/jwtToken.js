const User = require("../models/UserModel");

// Create Token And Save in Cookie
const sendToken = async (user, statusCode, res) => {
  const token = user.getJWTToken();
  const refreshToken = user.getRefreshJWTToken();

  user = await User.findByIdAndUpdate(
    user._id,
    {
      refreshTokens: refreshToken,
    },
    { new: true }
  );

  // Option for cookie
  const options1 = {
    expires: new Date(Date.now() + 1000 * 20),
    // expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * process.env.COOKIE_EXPIRE  // Expire in days * hours * minutes * seconds * miniSeconds
    // ),
    // maxAge: new Date(Date.now() + 24),
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    // secure: true
  };

  const options2 = {
    expires: new Date(Date.now() + 1000 * 60),
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
  };

  const { password, verified, createdAt, updatedAt, refreshTokens, __v, ...others } = user._doc;

  user = others;

  res.cookie("token", token, options1).cookie("refreshToken", refreshToken, options2).status(statusCode).json({
    user
  });
};

module.exports = sendToken;
