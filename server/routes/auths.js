import express from 'express';
import {register, login, logout} from '../controlars/auth.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);

export default router;
