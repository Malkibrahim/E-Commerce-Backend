var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/user", {
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
