const express = require('express');
const productController = require('./controllers/product.controller');
const authMiddleware = require('./middleware/auth.middleware');

const app = express();
app.use(express.json());

app.get('/health', (req, res) => res.send('OK'));

app.get('/products', productController.getProducts);

app.get('/secure-products', authMiddleware, productController.getProducts);

module.exports = app;
