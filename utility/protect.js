import jwt from 'jsonwebtoken'

export default function () {
  const token = req.cookie['token'];

  if (!token) {
    return res.status(401).json({ error: 'Access denied' });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  }
  catch (error) {
    res.status(400).json({ error: 'Invalid token' });
  }
}