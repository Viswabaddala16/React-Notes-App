const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next) {
  const header = req.header('Authorization');
  if (!header) return res.status(401).json({ message: 'Authorization header missing' });

  const [type, token] = header.split(' ');
  if (type !== 'Bearer' || !token) return res.status(401).json({ message: 'Invalid auth format' });

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: payload.id, email: payload.email };
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token invalid or expired' });
  }
}

module.exports = authMiddleware;
