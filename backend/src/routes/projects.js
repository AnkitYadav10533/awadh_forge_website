import express from 'express';
import * as projectController from '../controllers/projectController.js';
import { authenticate, isAdmin } from '../middleware/auth.js';

const router = express.Router();

router.get('/', projectController.getAllProjects);
router.get('/stats', projectController.getProjectStats);
router.get('/:id', projectController.getProject);
router.post('/', authenticate, isAdmin, projectController.createProject);
router.put('/:id', authenticate, isAdmin, projectController.updateProject);
router.delete('/:id', authenticate, isAdmin, projectController.deleteProject);

export default router;