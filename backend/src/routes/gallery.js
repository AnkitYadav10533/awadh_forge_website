import express from 'express';
import { authenticate, isAdmin } from '../middleware/auth.js';

const router = express.Router();

router.get('/', (req, res) => {
  res.json({ success: true, data: [] });
});

router.get('/:id', (req, res) => {
  res.json({ success: true, data: {} });
});

router.post('/', authenticate, isAdmin, (req, res) => {
  res.status(201).json({ success: true, message: 'Image uploaded', data: {} });
});

router.put('/:id', authenticate, isAdmin, (req, res) => {
  res.json({ success: true, message: 'Image updated', data: {} });
});

router.delete('/:id', authenticate, isAdmin, (req, res) => {
  res.json({ success: true, message: 'Image deleted' });
});

export default router;