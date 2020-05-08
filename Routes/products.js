const express = require("express");
const Product = require("../Models/products");
const router = express.Router();

const authentication = require("../middlewares/authentication");
const ownerProduct = require("../middlewares/ownerProducts");
require("express-async-errors");

router.get("/", async (req, res, next) => {
  const products = await Product.find({});
  res.json({
    message: "All Products",
    products,
  });
});
router.post(
  "/add-product",
  authentication,

  async (req, res, next) => {
    const {
      userId,
      data: {
        name,
        description,
        lang: { id, langName },
      },
      price,
      discount,
      imgUrl,
      categoryType,
    } = req.body;
    const product = new Product({
      userId,
      data: {
        name,
        description,
        lang: { id, langName },
      },
      price,
      discount,
      imgUrl,
      categoryType,
    });

    await product.save();
    res.json({
      product,
    });
  }
);
router.patch(
  "/edit/:id",
  authentication,
  ownerProduct,
  async (req, res, next) => {
    const {
      userId,
      data: {
        name,
        description,
        lang: { id, langName },
      },
      price,
      discount,
      imgUrl,
      categoryType,
    } = req.body;
    const idp = req.params;
    const product = await Product.findByIdAndUpdate(
      { _id: idp.id },
      {
        userId,
        data: {
          name,
          description,
          lang: { id, langName },
        },
        price,
        discount,
        imgUrl,
        categoryType,
      }
    );
    console.log(product);
    res.json({
      message: "done",
      product,
    });
  }
);
router.delete(
  "/delete/:id",
  authentication,
  ownerProduct,
  async (req, res, next) => {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete({ _id: id });
    res.json({
      message: "data updated",
      product,
    });
  }
);
router.post("/search", authentication, async (req, res, next) => {
  const { searchResult } = req.body;
  // const product = await Product.find({ data: { name: searchResult } });
  const product = await Product.find({ "data.name": searchResult });

  res.json(product);
});
router.get("/sort", authentication, async (req, res, next) => {
  // const { SortType } = req.body;
  // const product = await Product.find({ data: { name: searchResult } });
  const product = await Product.find().sort({ "data.name": 1 });

  res.json(product);
});
router.get("/sort-high-price", authentication, async (req, res, next) => {
  // const { SortType } = req.body;
  // const product = await Product.find({ data: { name: searchResult } });
  const product = await Product.find().sort({ price: -1 });

  res.json(product);
});
router.get("/sort-low-price", authentication, async (req, res, next) => {
  // const { SortType } = req.body;
  // const product = await Product.find({ data: { name: searchResult } });
  const product = await Product.find().sort({ price: 1 });

  res.json(product);
});
router.get("/filter/:id", authentication, async (req, res, next) => {
  const { id } = req.params;

  const product = await Product.find({ categoryType: id });

  res.json(product);
});
router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  const product = await Product.findOne({ _id: id });
  res.json({
    product,
  });
});
module.exports = router;
