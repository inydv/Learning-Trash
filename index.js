// Handling uncaught Exception -- console.log(youtube) -- youtube is not defined
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log("shutting down the server");

  process.exit(1);
});

// DOTENV
const dotenv = require("dotenv");
dotenv.config();

//MONGOOSE
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URL).then(() => console.log("DB CONNECTED")).catch((err) => console.log(err));

// for cloud congiguration
const cloudinary = require("cloudinary")
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

// EXPRESS
const express = require("express");
const app = express();

// Cross-site scripting - Sets security-related HTTP response headers to protect against some well-known web vulnerabilities.
const helmet = require("helmet");
app.use(helmet());

// XSS ATTACK - Sanitizes user input coming from POST request body (req.body), GET request query (req.query) and URL parameters (req.params)
const xss = require('xss-clean');
app.use(xss())

// DoS Attack - Puts the array parameters in req.query and/or req.body asides and just selects the last parameter value to avoid HTTP Parameter Pollution attacks.
const hpp = require('hpp');
app.use(hpp());

// Searches for any keys in objects that begin with a $ sign or contain a . from req.body, req.query or req.params and either removes such keys and data or replaces the prohibited characters with another allowed character
const mongoSanitize = require('express-mongo-sanitize');
app.use(mongoSanitize());

// cookie-parser is a middleware which parses cookies attached to the client request object
const cookieParser = require("cookie-parser");
app.use(cookieParser());

// Limit -- for DoS attack

// For using Json
app.use(express.json({ limit: '15kb' }));

// With express version => 4.16.0 the body-parser middleware was added back under the methods express.urlencoded() 
// In order to get access to the post data we have to use body-parser . Basically what the body-parser is which allows express to read the body and then parse that into a Json object that we can understand.
app.use(express.urlencoded({ limit: '25mb', extended: true }));

// for Uploading
const fileUpload = require("express-fileupload");
app.use(fileUpload());

// CORS -- Cross-Origin Resource Sharing -- a mechanism that allows restricted resources on a web page to be requested from another domain outside the domain from which the first resource was served
const cors = require("cors");
app.use(cors({
  origin: "http://localhost:3000",
  preflightContinue: true,
  credentials: true
}));

// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "http://localhost:3000");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
//   res.header("Access-Control-Allow-Credentials", true);
//   next();
// });

// EXPRESS HANDLEBARS
const handlebars = require('express-handlebars');

app.engine('handlebars', handlebars.engine())
app.set('view engine', 'handlebars');
app.set('views', './views')

// DDoS Attack - Used to limit IP addresses from making repeated requests to API endpoints.
const expressRate = require('express-rate-limit');

const apiLimiter = expressRate.rateLimit({
  windowMS: 15 * 60 * 1000,  // 15 minutes
  max: 200
})

// LOCAL REQUIRES FILES
const user = require("./routes/userRoute");
const auth = require("./routes/authRoute");
const Product = require("./routes/productRoute");
const Order = require("./routes/orderRoute");
const payment = require("./routes/paymentRoute");

app.use("/api", apiLimiter, auth);
app.use("/api", user);
app.use("/api", Product);
app.use("/api", Order);
app.use("/api", payment);

// Error Handler
const errorMiddleware = require("./middleware/error");
app.use(errorMiddleware);


// LISTEN SERVER
let server = app.listen(process.env.PORT || 5000, () => {
  console.log("Backend server is running!");
});

// unhandled Promise Rejection of Database
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log("shutting down the server");

  server.close(() => {
    process.exit(1);
  });
});
