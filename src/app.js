require("dotenv").config();
require("express-async-errors");
const express = require("express");

const connectDatabase = require("./database/connectDatabase");
const {
  routeNotFoundMiddleware: routeNotFound,
  errorHandlerMiddleware: errorHandler,
} = require("./middlewares");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req, res) => res.send("<h1>Welcome on this eCommerce API!</h1>"));

app.use(routeNotFound);
app.use(errorHandler);

const startServer = async () => {
  try {
    await connectDatabase(process.env.MONGO_URI);
    console.log("Connected to the database successfully!");
    app.listen(port, () => console.log(`Server listening on port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

startServer();
