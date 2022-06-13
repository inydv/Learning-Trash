// Create Token And Save in Cookie
const sendToken = (user, statusCode, res) => {
  const token = user.getJWTToken();

  // Option for cookie
  const options = {
    // expires: new Date(
    //   Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 100 // Expire in days * hours * minutes * seconds * miniSeconds
    // ),
    maxAge: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 100 // Expire in days * hours * minutes * seconds * miniSeconds
    ),
    httpOnly: true,
  };

  res.cookie("token", token, options).status(statusCode).json({
    user,
    token,
  });
};

module.exports = sendToken;
