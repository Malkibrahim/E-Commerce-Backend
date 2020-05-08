var mongoose = require("mongoose");
require("dotenv").config();

mongoose
  .connect(
    "mongodb+srv://test123:112233445566@cluster0-6ego3.mongodb.net/users-app?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log(process.env.CONNECT_URI);
    console.log("hhhhhhhhhhhhhh");
  })
  .catch((err) => {
    console.error(err);
    Progress.exit(1);
  });
