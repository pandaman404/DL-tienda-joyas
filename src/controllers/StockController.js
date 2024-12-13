import { StatusCodes } from 'http-status-codes';
import { getJewelsInStock } from '../services/StockService.js';

const getJewels = async (req, res) => {
  const { limit, order_by, page } = req.query;
  const jewels = await getJewelsInStock(limit, order_by, page);
  return res.status(StatusCodes.OK).json(jewels);
};

const getJewelsByFilter = async (_, res) => {
  return res.status(StatusCodes.OK).json({ test: 'test' });
};

export { getJewels, getJewelsByFilter };
