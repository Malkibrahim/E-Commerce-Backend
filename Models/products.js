var mongoose = require("mongoose");
require("dotenv").config();
mongoose.connect(process.env.CONNECT_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
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
