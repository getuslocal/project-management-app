import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import config from '../config/config';

// Check if the client request has token in header without falcification
const verify = (req: Request, res: Response, next: NextFunction) => {
  // Get request header.
  const authHeader = req.header('Authorization');
  // Get token from header after Bearer.
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.status(401).send('Access Denied');

  jwt.verify(token, config.server.token.accessSecret, (err, user) => {
    if (err) return res.status(403).send('Invalid Token');
    res.locals.user = user;
    next();
  });
};

export default verify;
