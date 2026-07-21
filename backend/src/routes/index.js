import express from 'express';
import authRoutes from './auth.js';
import projectRoutes from './projects.js';
import teamRoutes from './team.js';
import { eventRouter, messageRouter } from './events.js';
import galleryRoutes from './gallery.js';
import adminRoutes from './admin.js';
import { checkDB } from '../middleware/dbCheck.js';

const router = express.Router();

// Mount all routes
router.use('/auth', checkDB, authRoutes);
router.use('/projects', projectRoutes);
router.use('/team', teamRoutes);
router.use('/events', checkDB, eventRouter);
router.use('/messages', checkDB, messageRouter);
router.use('/gallery', checkDB, galleryRoutes);
router.use('/admin', checkDB, adminRoutes);

// Health check
router.get('/health', (req, res) => {
  res.json({ success: true, message: 'API is running' });
});

export default router;