const Product = require("../Models/products");
const CustomError = require("../Helpers/CustomError");
require("express-async-errors");
module.exports = async (req, res, next) => {
  const { id } = req.params;
  const product = await Product.findById({ _id: id });
  // const { userId } = req.user.id;
  if (product.userId.equals(req.user.id)) {
    next();
  } else {
    throw CustomError("Not authorized", 404);
  }
};
