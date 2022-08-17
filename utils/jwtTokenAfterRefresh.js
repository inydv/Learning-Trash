// Create Token And Save in Cookie
const sendTokenAfterRefresh = async (user, statusCode, res) => {
    const token = user.getJWTToken();
    const refreshTokens = user.getRefreshJWTToken();

    await user.save();
  
    // Option for cookie
    const options1 = {
      expires: new Date(Date.now() + 1000 * 20),
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
  
    res.cookie("token", token, options1).cookie("refreshToken", refreshTokens, options2).status(statusCode).json({
      message: "Token Refreshed!!!"
    });
  };
  
  module.exports = sendTokenAfterRefresh;
  