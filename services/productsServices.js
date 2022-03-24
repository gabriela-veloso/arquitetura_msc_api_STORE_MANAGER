const productsModel = require('../models/productsModel');

const getProductById = async (id) => {
  const response = await productsModel.getProductById(id);

  if (!Object.keys(response).length) {
    return { status: 404, data: [{ message: 'Product not found' }] };
  }

  return {
    status: 200,
    data: response,
  };
};

const validateCreateProduct = async (name, quantity) => {
  const { data } = await productsModel.getAllProducts();
  const alreadyProduct = data.find((p) => p.name === name);
  if (alreadyProduct) {
    return { status: 409, result: { message: 'Product already exists' } };
  }
const { insertId } = await productsModel.createProduct({ name, quantity });
return { status: 201, result: { id: insertId, name, quantity } };
};

const validateDeleteProduct = async (id) => {
  const productById = await productsModel.getProductById(id);
  if (!productById || productById.length === 0) {
    return { status: 404, result: { message: 'Product not found' } };
  }
await productsModel.deleteProduct(id);
return { status: 204 };
};

const validateUpdateProduct = async (name, quantity, id) => {
  const productById = await productsModel.getProductById(id);
  if (!Object.keys(productById).length) {
    return { status: 404, data: { message: 'Product not found' } };
  }
  const updated = await productsModel.updateProduct(name, quantity, id);
  return {
    status: 200,
    data: updated,
  };
};

module.exports = {
  getProductById, validateCreateProduct, validateDeleteProduct, validateUpdateProduct };
