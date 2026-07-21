import express from 'express';
import * as eventsController from '../controllers/eventsAndMessagesController.js';
import { authenticate, isAdmin } from '../middleware/auth.js';

const eventRouter = express.Router();

eventRouter.get('/', eventsController.getAllEvents);
eventRouter.get('/:id', eventsController.getEvent);
eventRouter.post('/', authenticate, isAdmin, eventsController.createEvent);
eventRouter.put('/:id', authenticate, isAdmin, eventsController.updateEvent);
eventRouter.delete('/:id', authenticate, isAdmin, eventsController.deleteEvent);

const messageRouter = express.Router();

messageRouter.get('/', authenticate, isAdmin, eventsController.getAllMessages);
messageRouter.post('/', eventsController.createMessage);
messageRouter.patch('/:id/read', authenticate, isAdmin, eventsController.markMessageAsRead);
messageRouter.post('/:id/reply', authenticate, isAdmin, eventsController.replyToMessage);
messageRouter.delete('/:id', authenticate, isAdmin, eventsController.deleteMessage);
messageRouter.post('/newsletter/subscribe', eventsController.subscribeNewsletter);
messageRouter.post('/newsletter/unsubscribe', eventsController.unsubscribeNewsletter);
messageRouter.get('/newsletter/stats', authenticate, isAdmin, eventsController.getNewsletterStats);

export { eventRouter, messageRouter };