const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  console.log('Auth middleware - checking token for:', req.method, req.path);
  
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    console.log('No token provided');
    return res.status(401).json({ message: 'No token, authorization denied.' });
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; 
    console.log('Token verified for user:', decoded.username);
    next();
  } catch (err) {
    console.log('Token verification failed:', err.message);
    res.status(401).json({ message: 'Token is not valid.' });
  }
};

module.exports = auth;