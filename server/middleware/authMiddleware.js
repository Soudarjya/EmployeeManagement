const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
  const token = req.header('Authorization');
  console.log(token);
  
  if (!token) return res.status(401).json({ message: 'No token, authorization denied' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};
const authorizeRoles = (...roles) => (req, res, next) => {
  // console.log(roles);
  // console.log(req.body);
  if (!roles.includes(req.headers.role)) {
    return res.status(403).json({ message: 'Access denied' });
  }
  next();
};

module.exports = { authenticate, authorizeRoles};
