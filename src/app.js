const path = require("path");

require("dotenv").config();
require("express-async-errors");
const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const cloudinary = require("cloudinary").v2;
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const xss = require("xss-clean");
const cors = require("cors");
const mongoSanitize = require("express-mongo-sanitize");

const {
  authRoutes,
  userRoutes,
  productRoutes,
  reviewRoutes,
  orderRoutes,
} = require("./routes");
const {
  routeNotFoundMiddleware: routeNotFound,
  errorHandlerMiddleware: errorHandler,
} = require("./middlewares");
const connectDatabase = require("./database/connectDatabase");

const app = express();
const port = process.env.PORT || 3000;

// security
app.set("trust proxy", 1);
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 100,
    standardHeaders: "draft-7",
    legacyHeaders: false,
  })
);
app.use(helmet());
app.use(xss());
app.use(mongoSanitize());
// cookies are not CORS, you must set a proxy on client-side
app.use(cors());

// logger
if (process.env.NODE_ENV === "development") {
  app.use(morgan("tiny"));
}

// parsers
app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));

// file uploader
app.use(fileUpload({ useTempFiles: true }));

// cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/products", productRoutes);
app.use("/api/v1/reviews", reviewRoutes);
app.use("/api/v1/orders", orderRoutes);

// errors
app.use(routeNotFound);
app.use(errorHandler);

// helper
const startServer = async () => {
  try {
    await connectDatabase(process.env.MONGO_URI);
    console.log("Connected to the database successfully!");
    app.listen(port, () => console.log(`Server listening on port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

// start
startServer();
