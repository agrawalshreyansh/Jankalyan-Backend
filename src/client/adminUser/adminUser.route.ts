import express from 'express';
import { getAllAdminUsersController, getAdminUserByIdController, addAdminUserController, registerAdminController, loginAdminController, refreshAccessTokenController } from './adminUser.controller.js';

const router = express.Router();

router.post('/add', addAdminUserController);
router.post('/register', registerAdminController);
router.post('/login', loginAdminController);
router.post('/refresh-token', refreshAccessTokenController);
router.get('/users', getAllAdminUsersController);
router.get('/users/:id', getAdminUserByIdController);

export default router;