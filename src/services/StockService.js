import DB from '../db/db.js';
import format from 'pg-format';
import { generateHATEOAS } from '../utils/generateHATEOAS.js';

const getJewelsInStock = async ({ limit = 10, order_by = 'id_ASC', page = 1 }) => {
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

const getJewelsInStockByFilter = async ({ precio_min = 0, precio_max = 0, categoria = '', metal = '' }) => {
  let baseQuery = 'SELECT * FROM inventario WHERE 1=1';
  const values = [];

  if (precio_min > 0) {
    baseQuery += ' AND precio >= %L';
    values.push(precio_min);
  }

  if (precio_max > 0) {
    baseQuery += ' AND precio <= %L';
    values.push(precio_max);
  }
  if (categoria) {
    baseQuery += ' AND categoria = %L';
    values.push(categoria);
  }
  if (metal) {
    baseQuery += ' AND metal = %L';
    values.push(metal);
  }

  const formattedQuery = format(baseQuery, ...values);
  const { rows } = await DB.query(formattedQuery);
  return rows;
};

export { getJewelsInStock, getJewelsInStockByFilter };
