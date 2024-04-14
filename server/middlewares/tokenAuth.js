import jwt from 'jsonwebtoken';

export function tokenHandler(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer')) {
    return res.status(400).json({ message: 'Invalid Token' });
  }
  try {
    const token = authHeader.split(' ')[1];

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    if (!decodedToken) {
      return res.status(400).json({ message: 'Incorrect Token' });
    }

    req.userId = decodedToken.userId;
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  next();
}
