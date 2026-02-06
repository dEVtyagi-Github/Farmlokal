const pool = require('../config/db');

exports.getProducts = async ({ category, limit, cursor }) => {
  const values = [];
  let query = `
    SELECT id, name, price, rating
    FROM products
    WHERE 1=1
  `;

  if (category) {
    values.push(category);
    query += ` AND category_id = $${values.length}`;
  }

  if (cursor) {
    values.push(cursor);
    query += ` AND id > $${values.length}`;
  }

  values.push(limit);
  query += ` ORDER BY id ASC LIMIT $${values.length}`;

  const { rows } = await pool.query(query, values);
  return rows;
};
