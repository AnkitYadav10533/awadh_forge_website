import express from 'express';
import { User, Project, Team, Event, Message, Newsletter } from '../models/index.js';
import { authenticate, isAdmin } from '../middleware/auth.js';

const router = express.Router();

router.get('/stats', authenticate, isAdmin, async (req, res, next) => {
  try {
    const stats = {
      users: await User.countDocuments(),
      projects: await Project.countDocuments(),
      teamMembers: await Team.countDocuments({ isActive: true }),
      events: await Event.countDocuments(),
      messages: await Message.countDocuments({ read: false }),
      newsletter: await Newsletter.countDocuments({ unsubscribed: false })
    };

    const recentProjects = await Project.find()
      .sort('-createdAt')
      .limit(5)
      .select('title featured createdAt');

    const recentMessages = await Message.find()
      .sort('-createdAt')
      .limit(5)
      .select('name subject read createdAt');

    res.json({
      success: true,
      data: { stats, recentProjects, recentMessages }
    });
  } catch (error) {
    next(error);
  }
});

router.get('/users', authenticate, isAdmin, async (req, res, next) => {
  try {
    const users = await User.find().select('-password');
    res.json({ success: true, data: users });
  } catch (error) {
    next(error);
  }
});

router.put('/users/:id/role', authenticate, isAdmin, async (req, res, next) => {
  try {
    const { role } = req.body;
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { role, updatedAt: new Date() },
      { new: true }
    ).select('-password');

    res.json({ success: true, message: 'User role updated', data: user });
  } catch (error) {
    next(error);
  }
});

router.put('/users/:id/deactivate', authenticate, isAdmin, async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { isActive: false, updatedAt: new Date() },
      { new: true }
    ).select('-password');

    res.json({ success: true, message: 'User deactivated', data: user });
  } catch (error) {
    next(error);
  }
});

router.get('/analytics', authenticate, isAdmin, async (req, res, next) => {
  try {
    const projectsByCategory = await Project.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } }
    ]);

    const teamByRole = await Team.aggregate([
      { $match: { isActive: true } },
      { $group: { _id: '$role', count: { $sum: 1 } } }
    ]);

    const messageStats = {
      total: await Message.countDocuments(),
      read: await Message.countDocuments({ read: true }),
      replied: await Message.countDocuments({ replied: true })
    };

    res.json({
      success: true,
      data: { projectsByCategory, teamByRole, messageStats }
    });
  } catch (error) {
    next(error);
  }
});

export default router;