import jwt from 'jsonwebtoken';

export const authenticate = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ success: false, error: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ success: false, error: 'Invalid token' });
  }
};

export const isAdmin = (req, res, next) => {
  if (req.user?.role !== 'Admin') {
    return res.status(403).json({ success: false, error: 'Admin access required' });
  }
  next();
};

export const isModerator = (req, res, next) => {
  if (!['Admin', 'Moderator'].includes(req.user?.role)) {
    return res.status(403).json({ success: false, error: 'Moderator access required' });
  }
  next();
};

export const optionalAuth = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
    }
  } catch (error) {
    // Continue without authentication
  }
  next();
};

export const verifyOwnership = (req, res, next) => {
  if (req.user?.id !== req.params.userId && req.user?.role !== 'Admin') {
    return res.status(403).json({ success: false, error: 'Access denied' });
  }
  next();
};