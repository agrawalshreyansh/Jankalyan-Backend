import express from 'express';
import { getAnalyticsController } from './analytics.controller.js';

const router = express.Router();

router.get('/', getAnalyticsController);

export default router;