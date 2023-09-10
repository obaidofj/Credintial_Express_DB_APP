import dotenv from 'dotenv';
dotenv.config();
const loggerMiddleware = (req, res, next) => {
    const logMessage = `[${new Date().toLocaleString()}] [${req.method}] ${req.path}`;
    console.log(logMessage);
    res.locals.logMessage = logMessage;
    next();
};
export { loggerMiddleware };
