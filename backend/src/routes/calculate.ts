import express from 'express';
import { calculateRoutesController } from "../controllers/calculateRoutesController"

const router = express.Router();

router.get('/calculate', calculateRoutesController.getAllRoutes);

export default router;