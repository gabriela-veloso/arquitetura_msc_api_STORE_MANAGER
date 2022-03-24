const connection = require('./connection');

const getAllProducts = async () => {
  const [result] = await connection.execute('SELECT * FROM StoreManager.products ORDER BY id;');
  return {
    status: 200, data: result, error: false };
};

const getProductById = async (id) => {
  const query = 'SELECT * FROM StoreManager.products WHERE id = ?';

  const [result] = await connection.execute(query, [id]);
console.log('getById', result);
  return result;
};

const createProduct = async ({ name, quantity }) => {
  const query = `
  INSERT INTO StoreManager.products (name, quantity)
  VALUES (?, ?);`;

const [result] = await connection.execute(query, [name, quantity]);

return result;
};

const deleteProduct = async (id) => {
  const [result] = await connection.execute(
    'DELETE FROM StoreManager.products WHERE id = ?;', [id],
);
  return result;
};

const updateProduct = async (name, quantity, id) => {
  const [result] = await connection.execute(
    'UPDATE StoreManager.products SET name = ?, quantity = ? WHERE id = ?;',
    [name, quantity, id],
  );
  return {
    id: result.insertId,
    name,
    quantity,
  };
};

module.exports = { getAllProducts, getProductById, createProduct, deleteProduct, updateProduct };
