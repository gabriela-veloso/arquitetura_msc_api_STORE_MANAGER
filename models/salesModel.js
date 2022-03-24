const connection = require('./connection');

const getAllSales = async () => {
  const query = `SELECT
  s.id AS saleId,
  s.date,
  sp.product_id AS productId,
  sp.quantity
FROM
  StoreManager.sales AS s
INNER JOIN StoreManager.sales_products AS sp
ON s.id = sp.sale_id
ORDER BY s.id, sp.product_id;`;

  const [result] = await connection.execute(query);
  return {
    status: 200, data: result, error: false };
};

const getSaleById = async (id) => {
  const query = `SELECT
  s.date,
  sp.product_id AS productId,
  sp.quantity
FROM
  StoreManager.sales AS s
INNER JOIN StoreManager.sales_products AS sp
ON s.id = sp.sale_id
WHERE id = ?
ORDER BY sp.sale_id, sp.product_id`;

  const [result] = await connection.execute(query, [id]);

  return result;
};

const addProductToSale = async (saleId, productId, quantity) => {
  const querySalesProduct = `
  INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?);
  `;
  await connection.execute(querySalesProduct, [saleId, productId, quantity]);
  const addedProduct = {
      productId,
      quantity,
  };
  return addedProduct;
};

const createSale = async () => {
  const querySales = 'INSERT INTO StoreManager.sales (date) VALUES (NOW());';
  const [sale] = await connection.execute(querySales);
  const saleId = sale.insertId;
  return saleId;
};

const updateSale = async ({ saleId, bodyReq }) => {
  const { productId, quantity } = bodyReq[0];
  await connection.execute(`
    UPDATE StoreManager.sales_products
    SET product_id = ?, quantity = ?
    WHERE sale_id = ?
  `, [productId, quantity, saleId]);
  return {
    saleId,
    itemUpdated: bodyReq,
  };
};

const updateProductsBySale = async ({ productId, quantity, operator }) => {
  await connection.execute(
    `UPDATE StoreManager.products SET quantity = quantity ${operator} ? WHERE id = ?;`,
    [quantity, productId],
  );
  return 'done';
};

const deleteSale = async (id) => {
  const salesById = await getSaleById(id);
  await connection.execute(
    'DELETE FROM StoreManager.sales WHERE id = ?',
    [id],
  );
  await connection.execute(
    'DELETE FROM StoreManager.sales_products WHERE sale_id = ?',
    [id],
  );

  await Promise.all(salesById.map((itemsSold) => updateProductsBySale({
    productId: itemsSold.productId,
    quantity: itemsSold.quantity,
    operator: '+',
})));
  return 'done';
};

module.exports = { getAllSales, getSaleById, updateSale, createSale, addProductToSale, deleteSale };
