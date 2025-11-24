import express from 'express';
import { createDoubtController, getAllDoubtsController, getDoubtByIdController, addAnswerController } from './doubt.controller.js';

const router = express.Router();

router.post('/createdoubt', createDoubtController);
router.get('/doubts', getAllDoubtsController);
router.get('/doubts/:id', getDoubtByIdController);
router.put('/doubts/:id/answer', addAnswerController);

export default router;