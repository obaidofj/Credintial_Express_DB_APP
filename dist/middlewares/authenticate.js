import jwt from 'jsonwebtoken';
import { User } from '../db/entity/user.entity.js';
const authenticate = async (req, res, next) => {
    const token = req.headers['authorization'] || '';
    let tokenIsValid = verifyToken(token);
    if (tokenIsValid) {
        const decoded = jwt.decode(token, { json: true });
        const user = await User.findOneBy({ username: decoded?.username || '' });
        res.locals.user = user;
        next();
    }
    else {
        res.status(401).send("You are Unauthenticated!");
    }
};
const verifyToken = (token) => {
    let IsValid;
    try {
        IsValid = jwt.verify(token, process.env.SECRET_KEY || '');
        return IsValid;
    }
    catch (error) { }
};
export { authenticate, verifyToken as verify };
