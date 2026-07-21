import express from 'express';
import * as teamController from '../controllers/teamController.js';
import { authenticate, isAdmin } from '../middleware/auth.js';

const router = express.Router();

router.get('/', teamController.getAllTeamMembers);
router.get('/stats', teamController.getTeamStats);
router.get('/:id', teamController.getTeamMember);
router.post('/', authenticate, isAdmin, teamController.createTeamMember);
router.put('/:id', authenticate, isAdmin, teamController.updateTeamMember);
router.delete('/:id', authenticate, isAdmin, teamController.deleteTeamMember);

export default router;