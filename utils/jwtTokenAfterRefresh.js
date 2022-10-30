const User = require("../models/UserModel");
const CryptoJS = require("crypto-js");

// Create Token And Save in Cookie
const sendTokenAfterRefresh = async (user, statusCode, res) => {
  const token = user.getJWTToken();
  const refresh_Token = user.getRefreshJWTToken();

  user = await User.findByIdAndUpdate(
    user._id,
    {
      refreshToken: refresh_Token,
    },
    { new: true }
  );

  let TokenDate = new Date(Date.now() + 1000 * 60 * 60 * 24 * process.env.COOKIE_EXPIRE);
  let RefreshTokenDate = new Date(Date.now() + 1000 * 60 * 60 * 24 * process.env.REFRESH_COOKIE_EXPIRE);

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

  const { password, verified, updatedAt, refreshToken, __v, ...others } = user._doc;

  user = others;

  TokenDate = TokenDate.getTime();

  const hashedToken = CryptoJS.AES.encrypt(token, process.env.CRYPTO_KEY).toString()
  const hashedRefreshToken = CryptoJS.AES.encrypt(refreshToken, process.env.CRYPTO_KEY).toString()

  res.cookie("token", hashedToken, options1).cookie("refreshToken", hashedRefreshToken, options2).status(statusCode).json({
    user, TokenDate
  });
};

module.exports = sendTokenAfterRefresh;