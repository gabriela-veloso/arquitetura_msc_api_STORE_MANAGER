// Renomeie esse arquivo
const mysql = require('mysql2/promise');
require('dotenv').config();

const connection = mysql.createPool({
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  host: process.env.MYSQL_HOST,

});

module.exports = connection;
