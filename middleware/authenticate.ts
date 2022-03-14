import jwt from "jsonwebtoken";
import { RequestHandler } from "express";

const SECRET_KEY = process.env.SECRET_KEY!;

const authenticate: RequestHandler = (req, _res, next) => {
  const bearer = req.headers.authorization;
  const token = bearer?.split(" ")[1];

  if (token) {
    jwt.verify(token, SECRET_KEY, (err, payload: any) => {
      if (err) {
        next(err);
      } else {
        req.userID = payload.userID; // TODO: add typing so payload accepts userID property
        next();
      }
    });
  } else {
    next();
  }
};

export default authenticate;