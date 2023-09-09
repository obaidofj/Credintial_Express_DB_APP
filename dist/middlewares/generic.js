import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
const loggerMiddleware = (req, res, next) => {
    const logMessage = `[${new Date().toLocaleString()}] [${req.method}] ${req.path}`;
    console.log(logMessage);
    res.locals.logMessage = logMessage;
    next();
};
const checkToken = async (req, res, next) => {
    let tok = req.headers.authorization;
    let tokenisvalid;
    try {
        // verify a token symmetric
        tokenisvalid = jwt.verify(tok || '', process.env.ACCESS_KEY || '');
    }
    catch (err) {
        res.status(400).send("There are a proplem");
    }
    if (tokenisvalid && tok) {
        const decode = jwt.decode(tok);
        res.locals.send = decode;
        next();
    }
    else {
        res.status(401).send("You are not authrzed");
    }
};
export { loggerMiddleware, checkToken };
