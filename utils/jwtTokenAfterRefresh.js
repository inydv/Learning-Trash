const User = require("../models/UserModel");

// Create Token And Save in Cookie
const sendTokenAfterRefresh = async (user, statusCode, res) => {
  const token = user.getJWTToken();
  const refreshToken = user.getRefreshJWTToken();

  user = await User.findByIdAndUpdate(
    user._id,
    {
      refreshTokens: refreshToken,
    },
    { new: true }
  );

  let TokenDate = new Date(Date.now() + 1000 * 20);
  let RefreshTokenDate = new Date(Date.now() + 1000 * 60);

  // Option for cookie
  const options1 = {
    expires: TokenDate,
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    // secure: true
  };

  const options2 = {
    expires: RefreshTokenDate,
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
  };

  const { password, verified, createdAt, updatedAt, refreshTokens, __v, ...others } = user._doc;

  user = others;

  TokenDate = TokenDate.getTime();
  RefreshTokenDate = RefreshTokenDate.getTime();

  res.cookie("token", token, options1).cookie("refreshToken", refreshToken, options2).status(statusCode).json({
    message: "Token Refreshed!!!", user, TokenDate, RefreshTokenDate
  });
};

module.exports = sendTokenAfterRefresh;
