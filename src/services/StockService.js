import DB from '../db/db.js';
import format from 'pg-format';
import { generateHATEOAS } from '../utils/generateHATEOAS.js';

const getJewelsInStock = async (limit = 10, order_by = 'id_ASC', page = 1) => {
  const [column, direction] = order_by.split('_');
  const offset = Math.abs((page - 1) * limit);

  const formattedQuery = format(
    'SELECT * FROM inventario ORDER BY %I %s LIMIT %L OFFSET %L',
    column,
    direction,
    limit,
    offset
  );

  const { rows } = await DB.query(formattedQuery);

  const response = generateHATEOAS(rows);
  return response;
};

const getJewelsInStockByFilter = async () => {
  const { rows } = await DB.query('SELECT * FROM inventario');
  return rows;
};

export { getJewelsInStock, getJewelsInStockByFilter };
