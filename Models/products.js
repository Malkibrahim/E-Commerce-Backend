var mongoose = require("mongoose");

var Schema = mongoose.Schema;
var productsSchema = new Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  data: {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    lang: {
      id: {
        type: Number,
      },
      langName: { type: String },
    },
  },
  price: {
    type: Number,
    required: true,
  },
  discount: {
    type: Number,
  },
  imgUrl: { type: [String], required: false },
  categoryType: {
    type: mongoose.Types.ObjectId,
    ref: "category",
  },
});

const Product = mongoose.model("product", productsSchema);
module.exports = Product;
