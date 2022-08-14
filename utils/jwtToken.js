// Create Token And Save in Cookie
const sendToken = (user, statusCode, res) => {
  const token = user.getJWTToken();

  // Option for cookie
  const options = {
    // expires: new Date(
    //   Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 100 // Expire in days * hours * minutes * seconds * miniSeconds
    // ),
    maxAge: new Date(
      Date.now() + 24 // Expire in days * hours * minutes * seconds * miniSeconds
    ),
    httpOnly: true,
  };

  const { password, verified, createdAt, updatedAt, __v, ...others } = user._doc;

  user = others;

  res.cookie("token", token, options).status(statusCode).json({
    user
  });
};

module.exports = sendToken;
