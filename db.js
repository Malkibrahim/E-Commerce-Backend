var mongoose = require("mongoose");
require("dotenv").config();

mongoose
  .connect(process.env.CONNECT_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("hhhhhhhhhhhhhh");
  })
  .catch((err) => {
    console.error(err);
    Progress.exit(1);
  });
