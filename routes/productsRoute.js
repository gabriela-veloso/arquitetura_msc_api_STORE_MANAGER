const express = require('express');

const route = express.Router();

const ProductsController = require('../controllers/ProductsController');
const { validateName, validateQuantity } = require('../middlewares/validationsProducts');

route.get(
  '/',
  ProductsController.listProducts,
);

route.post(
  '/', validateName, validateQuantity,
  ProductsController.newProduct,
);

route.get(
  '/:id', ProductsController.listProductById,
);

route.put(
  '/:id', validateName, validateQuantity, ProductsController.updateProduct,
);

route.delete(
  '/:id', ProductsController.deletProduct,
);

module.exports = route;
