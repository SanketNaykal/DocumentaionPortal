import express from 'express';
import { getPost, getPosts, addPost, updatePost, deletePost } from '../controlars/post.js';

const router = express.Router();

router.get('/:id', getPost);
router.get('/', getPosts);
router.post('/', addPost);
router.put('/:id', updatePost);
router.delete('/:id', deletePost);

export default router;