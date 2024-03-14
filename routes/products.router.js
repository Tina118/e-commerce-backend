const express = require("express");

const Product = require("../model/product.model");

const router = express.Router();

router.route("/products").post(async (req, res) => {
  let page = req.body.page;
  let products = await Product.find();
  let filteredProducts = products;

  const end = page * 10;
  const start = end - 10;

  if (req.body.category.length > 0) {
    filteredProducts = filteredProducts.filter(({ category }) =>
      req.body.category.includes(category)
    );
  }

  if (req.body.brand.length > 0) {
    filteredProducts = filteredProducts.filter(({ title }) =>
      req.body.brand.includes(title)
    );
  }

  let productList = filteredProducts.slice(start, end);

  if(req.body.price!==''){
    req.body.price === 'Low to High' && productList.sort((a, b) => a.price - b.price);
    req.body.price === 'High to Low' && productList.sort((a, b) => b.price - a.price);
  }

  const brand = [...new Set(products.map((product) => product.title))];

  res
    .status(200)
    .json({ products: productList, brand, total: filteredProducts.length });
});

module.exports = router;
