import express from 'express';
import { setNewBlogCode } from '../controlars/processedData.js';
const router = express.Router();

router.post('/setNewBlogCode', setNewBlogCode);
router.post('/setNewBlogCode/:id', setNewBlogCode);

export default router;