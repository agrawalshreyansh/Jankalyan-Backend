import express from 'express';
import { increaseJaapCountController, getTotalJaapCountController } from './jaap.controller.js';

const router = express.Router();

router.post('/increasecount/:deviceID', increaseJaapCountController);
router.get('/total', getTotalJaapCountController);

export default router;