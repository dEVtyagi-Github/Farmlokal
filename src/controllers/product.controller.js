const productService = require('../services/product.service');

exports.getProducts = async (req, res) => {
  try {
    const { category, limit = 20, cursor } = req.query;

    const products = await productService.getProducts({
      category,
      limit: Number(limit),
      cursor
    });

    res.json({
      data: products,
      nextCursor: products.length ? products[products.length - 1].id : null
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
