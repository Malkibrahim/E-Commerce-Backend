const express = require("express");
const Category = require("../Models/categories");
const router = express.Router();

require("express-async-errors");

router.get("/", async (req, res, next) => {
  const categories = await Category.find({});
  res.json({
    categories,
  });
});
router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  const category = await Category.findOne({ _id: id });
  res.json({
    category,
  });
});
router.post("/add-category", async (req, res, next) => {
  const { name } = req.body;
  const cat = new Category({
    name,
  });

  await cat.save();
  res.json({
    message: "product added",
    cat,
  });
});

module.exports = router;
