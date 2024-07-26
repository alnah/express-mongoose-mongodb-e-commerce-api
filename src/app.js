require("dotenv").config();
require("express-async-errors");
const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

const { authRoutes, userRoutes } = require("./routes");
const {
  routeNotFoundMiddleware: routeNotFound,
  errorHandlerMiddleware: errorHandler,
} = require("./middlewares");
const connectDatabase = require("./database/connectDatabase");

const app = express();
const port = process.env.PORT || 3000;

// logger
app.use(morgan("tiny"));

// parsers
app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));

// routes
app.get("/", (req, res) => res.send("<h1>Welcome on this eCommerce API!</h1>"));
app.get("/api/v1", (req, res) => console.log(req.signedCookies));
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", userRoutes);

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
