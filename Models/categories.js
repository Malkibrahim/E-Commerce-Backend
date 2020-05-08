var mongoose = require("mongoose");

require("dotenv").config();
mongoose.connect(process.env.CONNECT_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
var Schema = mongoose.Schema;
var categorySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
});

const category = mongoose.model("category", categorySchema);
module.exports = category;
