import express from 'express';
import { getAnalyticsController } from './analytics.controller.js';
import { authenticateToken } from '../../middleware/auth.middleware.js';

const router = express.Router();

router.get('/', authenticateToken, getAnalyticsController);

export default router;