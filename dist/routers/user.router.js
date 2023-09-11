import express from 'express';
import { User as userEntity } from '../db/entity/user.entity.js';
import { userValidationMiddleware } from '../middlewares/user.middelware.js';
const router = express.Router();
const saltRounds = 10;
router.post('/', userValidationMiddleware);
router.get('/', async (req, res) => {
    try {
        const [items, total] = await userEntity.findAndCount({
        // relations: ['role', 'user.profile' ,'permissions']
        // loadRelationIds: true,
        });
        res.send({
            total,
            items
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Something went wrong!" + error);
    }
});
router.post('/', async (req, res) => {
    const newUser = new userEntity();
    newUser.username = req.body.username;
    newUser.password = req.body.password;
    newUser.email = req.body.email;
    newUser.save().then((response) => {
        res.status(201).send('User Created with ID:' + response.id);
    }).catch(error => {
        console.error(error);
        res.status(500).send('Something went wrong');
    });
});
router.post('/assignrole', (req, res, next) => {
    userCon.assignRoleToUser(req.body).then((data) => {
        res.status(201).send(data);
    }).catch(err => {
        console.error(err);
        res.status(500).send(err);
    });
});
export default router;
