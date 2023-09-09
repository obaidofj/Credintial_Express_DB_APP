import express from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const loggerMiddleware = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const logMessage = `[${new Date().toLocaleString()}] [${req.method}] ${req.path}`;
  console.log(logMessage);
  res.locals.logMessage = logMessage;
  next();
}



export {
  loggerMiddleware
}