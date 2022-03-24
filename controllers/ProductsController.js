// Renomeie esse arquivo
const productsModel = require('../models/productsModel');
const productsService = require('../services/productsServices');

const listProducts = async (_req, res, next) => {
  try {
    const result = await productsModel.getAllProducts();
    return res.status(result.status).json(result.data);
  } catch (e) {
    console.error(e.message);
    next(e);
  }
};

const listProductById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = await productsService.getProductById(id);

    return res.status(response.status).json(response.data[0]);
  } catch (e) {
    console.error(e.message);
    next(e);
  }
};

const newProduct = async (req, res) => {
  const { name, quantity } = req.body;
  const { status, result } = await productsService.validateCreateProduct(name, quantity);
  if (status !== 200) {
    return res.status(status).json(result);
  }
  return res.status(201).json(result);
};

const deletProduct = async (req, res) => {
  const { id } = req.params;
  const result = await productsService.validateDeleteProduct(id);
  if (result) {
    return res.status(result.status).json(result.result);
  }
  return res.status(204).end();
};

const updateProduct = async (req, res) => {
  const { name, quantity } = req.body;
  const { id } = req.params;
  const result = await productsService.validateUpdateProduct(name, quantity, id);
  if (result) {
    return res.status(result.status).json(result.data);
  }
  return res.status(204).end();
};

module.exports = { listProducts, listProductById, newProduct, deletProduct, updateProduct };
