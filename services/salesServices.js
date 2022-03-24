const salesModel = require('../models/salesModel');

const getSaleById = async (id) => {
  const response = await salesModel.getSaleById(id);

  if (!response.length) {
    return { status: 404, data: { message: 'Sale not found' } };
  }

  return {
    status: 200,
    data: response,
  };
};

const validateAllSales = async () => {
  const sales = await salesModel.getAllSales();
console.log(sales);
  return sales;
};

const createSale = async (itemsSold) => {
  const saleId = await salesModel.createSale();
  const items = await Promise.all(
      itemsSold.map(async (i) => salesModel.addProductToSale(saleId, i.productId, i.quantity)),
  );

  const createdSale = {
    id: saleId,
    itemsSold: items,
};

  return createdSale;
};

const updateSale = async (bodyReq, saleId) => {
  const foundSale = await salesModel.getSaleById(saleId);
  if (!foundSale) return { error: { message: 'Sale not found' } };
  return salesModel.updateSale({
    saleId,
    bodyReq,
  });
};

const validateDeleteSale = async (id) => {
  const isAnExistentId = await getSaleById(id);
  if (isAnExistentId.status === 404) return { error: { message: 'Sale not found' } };

await salesModel.deleteSale(id);

  return { code: 204 };
};
module.exports = { getSaleById, validateAllSales, updateSale, createSale, validateDeleteSale };
