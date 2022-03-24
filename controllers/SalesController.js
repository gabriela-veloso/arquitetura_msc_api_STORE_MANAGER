// const salesModel = require('../models/salesModel');
const salesService = require('../services/salesServices');

const listSales = async (_req, res, next) => {
  try {
    const result = await salesService.validateAllSales();
    return res.status(result.status).json(result.data);
  } catch (e) {
    console.error(e.message);
    next(e);
  }
};

const listSalesById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await salesService.getSaleById(id);
    return res.status(result.status).json(result.data);
  } catch (e) {
    console.error(e.message);
    next(e);
  }
};

const createSale = async (req, res) => {
  const itemsSold = req.body;
  const createdSale = await salesService.createSale(itemsSold);
  return res.status(201).json(createdSale);
};

const updateSale = async (req, res) => {
  const bodyReq = req.body;
  const { id } = req.params;

  const updatedSale = await salesService.updateSale(bodyReq, id);

  if (updatedSale.error) return res.status(404).json(updatedSale.error);

  return res.status(200).json(updatedSale);
};

const deleteSale = async (req, res, next) => {
  try {
    const { id } = req.params;

    const excludeSale = await salesService.validateDeleteSale(id);
    if (excludeSale.error) return res.status(404).json({ message: 'Sale not found' });

    const { code } = excludeSale;

    return res.status(code).end();
  } catch (e) {
    next(e);
  }
};

module.exports = { listSales, listSalesById, updateSale, deleteSale, createSale };
