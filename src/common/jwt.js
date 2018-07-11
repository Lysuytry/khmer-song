import jwt from 'jsonwebtoken';

const {SECRET} = process.env;

export const getToken = (payload) => {
  return jwt.sign(payload, SECRET);
};

export const verifyToken = (token) => {
  return jwt.verify(token, SECRET);
};
