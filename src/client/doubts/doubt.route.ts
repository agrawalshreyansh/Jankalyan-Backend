import express from 'express';
import { createDoubtController, getAllDoubtsController, getDoubtByIdController, addAnswerController, getDoubtsByIdsController } from './doubt.controller.js';
import { authenticateToken } from '../../middleware/auth.middleware.js';

const router = express.Router();

router.post('/doubts/submit', createDoubtController);
router.post('/doubts/history', getDoubtsByIdsController);
router.get('/admin/doubts', authenticateToken, getAllDoubtsController);
router.get('/doubts/:id', getDoubtByIdController);
router.post('/doubts/:id/answer', authenticateToken, addAnswerController);

export default router;