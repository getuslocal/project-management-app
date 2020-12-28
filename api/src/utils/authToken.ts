import jwt from 'jsonwebtoken';
import config from '../config/config';

export const generateAccessToken = (userId: object) => {
  return jwt.sign(userId, config.server.token.accessSecret, {
    expiresIn: config.server.token.expireTime,
  });
};
