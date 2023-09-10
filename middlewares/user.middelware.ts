import {User} from '../types/user';
import express from 'express';

const userValidationMiddleware = (req: User.Request, res: express.Response, next: express.NextFunction) => {
  if (!req.body.username || req.body.username.length < 3) {
    res.status(400).send('Username is required, and should be at least 3 letters long!');
    return;
  }
  if (!req.body.password) {
    res.status(400).send('password required');
    return;
  }

  next();
};


export {
  userValidationMiddleware
}