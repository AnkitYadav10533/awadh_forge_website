import { Event, Message, Newsletter } from '../models/index.js';

// ==================== EVENT CONTROLLERS ====================
export const getAllEvents = async (req, res, next) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;
    let query = {};

    if (status) query.status = status;

    const skip = (page - 1) * limit;
    const events = await Event.find(query)
      .sort({ startDate: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Event.countDocuments(query);

    res.json({
      success: true,
      data: events,
      pagination: { total, pages: Math.ceil(total / limit), page: parseInt(page) }
    });
  } catch (error) {
    next(error);
  }
};

export const getEvent = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ success: false, error: 'Event not found' });
    }
    res.json({ success: true, data: event });
  } catch (error) {
    next(error);
  }
};

export const createEvent = async (req, res, next) => {
  try {
    const event = await Event.create(req.body);
    res.status(201).json({ success: true, message: 'Event created', data: event });
  } catch (error) {
    next(error);
  }
};

export const updateEvent = async (req, res, next) => {
  try {
    const event = await Event.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: new Date() },
      { new: true, runValidators: true }
    );

    if (!event) {
      return res.status(404).json({ success: false, error: 'Event not found' });
    }

    res.json({ success: true, message: 'Event updated', data: event });
  } catch (error) {
    next(error);
  }
};

export const deleteEvent = async (req, res, next) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) {
      return res.status(404).json({ success: false, error: 'Event not found' });
    }
    res.json({ success: true, message: 'Event deleted' });
  } catch (error) {
    next(error);
  }
};

// ==================== MESSAGE CONTROLLERS ====================
export const getAllMessages = async (req, res, next) => {
  try {
    const { read, page = 1, limit = 10 } = req.query;
    let query = {};

    if (read === 'true') query.read = true;
    if (read === 'false') query.read = false;

    const skip = (page - 1) * limit;
    const messages = await Message.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Message.countDocuments(query);

    res.json({
      success: true,
      data: messages,
      pagination: { total, pages: Math.ceil(total / limit), page: parseInt(page) }
    });
  } catch (error) {
    next(error);
  }
};

export const createMessage = async (req, res, next) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ success: false, error: 'All fields are required' });
    }

    const newMessage = await Message.create({ name, email, subject, message });
    res.status(201).json({ success: true, message: 'Message received', data: newMessage });
  } catch (error) {
    next(error);
  }
};

export const markMessageAsRead = async (req, res, next) => {
  try {
    const message = await Message.findByIdAndUpdate(
      req.params.id,
      { read: true },
      { new: true }
    );

    if (!message) {
      return res.status(404).json({ success: false, error: 'Message not found' });
    }

    res.json({ success: true, message: 'Message marked as read', data: message });
  } catch (error) {
    next(error);
  }
};

export const replyToMessage = async (req, res, next) => {
  try {
    const { replyMessage } = req.body;

    const message = await Message.findByIdAndUpdate(
      req.params.id,
      {
        replied: true,
        replyMessage,
        replyDate: new Date()
      },
      { new: true }
    );

    if (!message) {
      return res.status(404).json({ success: false, error: 'Message not found' });
    }

    res.json({ success: true, message: 'Reply sent', data: message });
  } catch (error) {
    next(error);
  }
};

export const deleteMessage = async (req, res, next) => {
  try {
    const message = await Message.findByIdAndDelete(req.params.id);
    if (!message) {
      return res.status(404).json({ success: false, error: 'Message not found' });
    }
    res.json({ success: true, message: 'Message deleted' });
  } catch (error) {
    next(error);
  }
};

// ==================== NEWSLETTER CONTROLLERS ====================
export const subscribeNewsletter = async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ success: false, error: 'Email is required' });
    }

    let subscription = await Newsletter.findOne({ email });

    if (subscription) {
      subscription.unsubscribed = false;
      subscription.subscribedAt = new Date();
      await subscription.save();
    } else {
      subscription = await Newsletter.create({ email });
    }

    res.json({ success: true, message: 'Subscribed to newsletter', data: subscription });
  } catch (error) {
    next(error);
  }
};

export const unsubscribeNewsletter = async (req, res, next) => {
  try {
    const { email } = req.body;

    const subscription = await Newsletter.findOneAndUpdate(
      { email },
      { unsubscribed: true, unsubscribedAt: new Date() },
      { new: true }
    );

    if (!subscription) {
      return res.status(404).json({ success: false, error: 'Subscription not found' });
    }

    res.json({ success: true, message: 'Unsubscribed from newsletter' });
  } catch (error) {
    next(error);
  }
};

export const getNewsletterStats = async (req, res, next) => {
  try {
    const stats = {
      total: await Newsletter.countDocuments(),
      subscribed: await Newsletter.countDocuments({ unsubscribed: false }),
      unsubscribed: await Newsletter.countDocuments({ unsubscribed: true })
    };

    res.json({ success: true, data: stats });
  } catch (error) {
    next(error);
  }
};