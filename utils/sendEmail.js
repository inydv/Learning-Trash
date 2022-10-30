const nodemailer = require("nodemailer");
const hbs = require('nodemailer-express-handlebars');
const path = require('path');

module.exports = async ({ email, subject, link }) => {
  const transporter = nodemailer.createTransport({
    host: process.env.HOST,
    service: process.env.SERVICE,
    port: Number(process.env.EMAIL_PORT),
    secure: Boolean(process.env.SECURE),
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  const handlebarOption = {
    viewEngine: {
      ext: ".handlebars",
      layoutsDir: path.join(__dirname, "../Email Templates"),
      defaultLayout: false,
    },
    viewPath: path.join(__dirname, "../Email Templates"),
    extName: ".handlebars",
  }

  transporter.use('compile', hbs(handlebarOption))

  if (subject == "Reset Your The Little Things Password") {
    await transporter.sendMail({
      from: process.env.MAIL_USER,
      to: email,
      subject: subject,
      template: 'resetPWLink',
      context: {
        link: link,
        email: email,
      }
    });
  } else if (subject == "Verify Your The Little Things Account") {
    await transporter.sendMail({
      from: process.env.MAIL_USER,
      to: email,
      subject: subject,
      template: 'verifyemail',
      context: {
        link: link,
      }
    });
  }

};
