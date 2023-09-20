import express from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../../db/entities/User.js';
import { verify } from 'crypto';

const authenticate = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const token = req.headers['authorization'] || '';

  let tokenIsValid=verifyToken(token);

  if (tokenIsValid) {
    const decoded = jwt.decode(token, { json: true });
    const user = await User.findOneBy({ email: decoded?.email || '' })
    res.locals.user = user;
    next();
  } else {
    res.status(401).send("You are Unauthorized!");
  }
}



const verifyToken = (token:string)=>
{
  let IsValid;

  try {
    IsValid = jwt.verify(token, process.env.SECRET_KEY || '');
    return IsValid;
  } catch (error) { }

}



export {
  authenticate, verifyToken
}