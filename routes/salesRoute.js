const express = require('express');

const route = express.Router();

const SalesController = require('../controllers/SalesController');
const { validateProductId, validateQuantity } = require('../middlewares/validationsSales');

route.get(
  '/', SalesController.listSales,
);

route.post(
  '/', validateProductId, validateQuantity,
  SalesController.createSale,
);

route.get(
  '/:id', SalesController.listSalesById,
);

route.put(
  '/:id', validateProductId, validateQuantity, SalesController.updateSale,
);

route.delete(
  '/:id', SalesController.deleteSale,
);

module.exports = route;
