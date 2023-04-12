import express from 'express';
import { list } from '../controllers/user.js';
const router = express.Router();

router.get('/users', list);

export default router;
