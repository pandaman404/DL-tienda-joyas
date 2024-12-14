import { StatusCodes } from 'http-status-codes';
import { getJewelsInStock, getJewelsInStockByFilter } from '../services/StockService.js';

const getJewels = async (req, res) => {
  const { limit, order_by, page } = req.query;
  const results = await getJewelsInStock({ limit, order_by, page });
  return res.status(StatusCodes.OK).json(results);
};

const getJewelsByFilter = async (req, res) => {
  const { precio_min, precio_max, categoria, metal } = req.query;
  const results = await getJewelsInStockByFilter({ precio_min, precio_max, categoria, metal });
  return res.status(StatusCodes.OK).json(results);
};

export { getJewels, getJewelsByFilter };
