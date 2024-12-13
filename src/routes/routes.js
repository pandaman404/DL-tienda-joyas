import { Router } from 'express';
import { asyncHandler } from '../middlewares/asyncHandler.js';
import { getJewels, getJewelsByFilter } from '../controllers/StockController.js';

const router = Router();

router.get('/joyas', asyncHandler(getJewels));
router.get('/joyas/filtros', asyncHandler(getJewelsByFilter));

export default router;
