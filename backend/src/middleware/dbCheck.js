import mongoose from 'mongoose';

export const checkDB = (req, res, next) => {
  if (mongoose.connection.readyState !== 1) {
    return res.status(503).json({
      success: false,
      error: 'Database is currently unavailable'
    });
  }
  next();
};
