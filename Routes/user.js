const express = require("express");
const User = require("../Models/users");
const router = express.Router();
const { check } = require("express-validator");
const validationChecks = require("../middlewares/validation");
const CustomError = require("../Helpers/CustomError");

const authentication = require("../middlewares/authentication");
require("express-async-errors");
router.get("/", async (req, res, next) => {
  const users = await User.find({});
  res.json({
    message: "All users",
    users,
  });
});
router.post(
  "/register",
  validationChecks(
    check("emailAddress").isEmail(),

    check("password").isLength({ min: 5 }),
    check("confirmPassword").isLength({ min: 5 })
  ),
  async (req, res, next) => {
    const { emailAddress, password, confirmPassword } = req.body;
    const user = new User({ emailAddress, password, confirmPassword });
    if (password === confirmPassword) {
      await user.save();
      res.json({
        message: "user was registered successfully",
        user,
      });
    } else {
      throw CustomError("Confirm Passord is Wrong ,Try again", 404);
    }
  }
);
router.post(
  "/login",
  validationChecks(
    check("emailAddress").isEmail(),

    check("password").isLength({ min: 5 })
  ),
  async (req, res, next) => {
    const { emailAddress, password } = req.body;
    const user = await User.findOne({ emailAddress });
    if (!user) throw CustomError("Data is Wrong");
    const isMatch = user.ComparePassword(password);
    if (!isMatch) throw CustomError("Wrong Password", 404);
    const token = await user.GetToken();

    res.json({
      message: "logged in successfully",
      user,
      token,
    });
  }
);
router.delete("/delete/:id", async (req, res, next) => {
  const id = req.params;
  const user = await User.findByIdAndDelete({ _id: id.id });
  res.json({
    message: "data updated",
    user,
  });
});

router.get("/home", authentication, (req, res, next) => {
  res.json({
    message: "Done",
  });
});
module.exports = router;
