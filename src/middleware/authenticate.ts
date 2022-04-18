import jwt, { JwtPayload } from 'jsonwebtoken';
import { RequestHandler } from 'express';

const SECRET_KEY = process.env.SECRET_KEY!;

const authenticate: RequestHandler = (req, res, next) => {
  const bearer = req.headers.authorization;
  const token = bearer?.split(' ')[1];
  if (token) {
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
      err
        ? res.status(403).json({ error: err.message })
        : (req.userID = (decoded as JwtPayload).userID);
    });
  }
  next();
};

export default authenticate;
