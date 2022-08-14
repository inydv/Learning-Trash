// Create Token And Save in Cookie
const sendToken = (user, statusCode, res) => {
  const token = user.getJWTToken();

  // Option for cookie
  const options = {
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * process.env.COOKIE_EXPIRE  // Expire in days * hours * minutes * seconds * miniSeconds
    ),
    // maxAge: new Date(Date.now() + 24),
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    // secure: true
  };

  const { password, verified, createdAt, updatedAt, __v, ...others } = user._doc;

  user = others;

  res.cookie("token", token, options).status(statusCode).json({
    user
  });
};

module.exports = sendToken;
