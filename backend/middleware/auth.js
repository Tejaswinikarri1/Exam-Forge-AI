const jwt  = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ success: false, message: 'Not authenticated.' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select('-password');
    if (!req.user) return res.status(401).json({ success: false, message: 'User not found.' });

    next();
  } catch (err) {
    res.status(401).json({ success: false, message: 'Token invalid or expired.' });
  }
};

// Role guard middleware — use after protect
// Usage: router.get('/route', protect, requireRole('Teacher'), handler)
const requireRole = (...roles) => (req, res, next) => {
  if (!roles.includes(req.user?.role)) {
    return res.status(403).json({ success: false, message: 'Access denied — insufficient role.' });
  }
  next();
};

module.exports = { protect, requireRole };