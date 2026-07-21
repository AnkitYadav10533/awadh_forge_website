import express from 'express';
import * as eventsController from '../controllers/eventsAndMessagesController.js';
import { authenticate, isAdmin } from '../middleware/auth.js';

const router = express.Router();

router.get('/', authenticate, isAdmin, eventsController.getAllMessages);
router.post('/', eventsController.createMessage);
router.patch('/:id/read', authenticate, isAdmin, eventsController.markMessageAsRead);
router.post('/:id/reply', authenticate, isAdmin, eventsController.replyToMessage);
router.delete('/:id', authenticate, isAdmin, eventsController.deleteMessage);
router.post('/newsletter/subscribe', eventsController.subscribeNewsletter);
router.post('/newsletter/unsubscribe', eventsController.unsubscribeNewsletter);
router.get('/newsletter/stats', authenticate, isAdmin, eventsController.getNewsletterStats);

export default router;