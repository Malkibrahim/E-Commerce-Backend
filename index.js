var express = require("express");
var app = express();
const userRouter = require("./Routes/user");
const productRouter = require("./Routes/products");
const catgories = require("./Routes/category");
var cors = require("cors");

require("express-async-errors");
const port = 3000;
var bodyParser = require("body-parser");

var allowCrossDomain = function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
};

app.use(allowCrossDomain);
//some other code
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use("/user", userRouter);
app.use("/product", productRouter);
app.use("/category", catgories);

app.use((err, req, res, next) => {
  console.log(err);
  const statusCode = err.statusCode || 500;
  if (statusCode >= 500) {
    return res.status(statusCode).json({
      message: err.message,
      type: "INTERNAL_SERVER_ERROR",
      details: [],
    });
  }
});
app.listen(port);
