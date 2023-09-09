import express from 'express';
import { User as userEntity } from '../db/entity/user.entity.js';
import { userValidationMiddleware } from '../middlewares/user.middelware.js';
import jwt from 'jsonwebtoken';
import { checkToken } from '../middlewares/generic.js';
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
        res.status(500).send("Something went wrong!");
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
router.get('/login', async (req, res) => {
    try {
        var token = jwt.sign({ user: 'obaid' }, process.env.ACCESS_KEY || '');
        res.send(token);
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Something went wrong!");
    }
});
router.get('/test', checkToken, async (req, res) => {
    try {
        var token = jwt.sign({ user: 'obaid' }, process.env.ACCESS_KEY);
        res.send(res.locals.send);
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Something went wrong!");
    }
});
// router.get('/:id', async (req, res) => {
//   const id = req.params.id;
//   // const task = await Todo.findOne({ where: { id } });
//   const task = await Todo.findOne({
//     where: { id },
//     relations: ['user', 'user.profile'],
//   });
//   if (task) {
//     res.status(200).send(task);
//   } else {
//     res.status(404).send("Task not found");
//   }
// });
// router.put('/:id', async (req, res) => {
//   const id = req.params.id;
//   const task = await Todo.findOneBy({ id });
//   if (task) {
//     // task.title = req.body.title;
//     // task.description = req.body.description;
//     task.status = 'done';
//     task.save();
//     res.send('Task Updated');
//   } else {
//     res.status(404).send('Task not found!');
//   }
// });
// router.delete('/:id', async (req, res) => {
//   const id = req.params.id;
//   const task = await Todo.findOneBy({ id });
//   if (task) {
//     task.remove();
//     res.send('Task Deleted');
//   } else {
//     res.status(404).send('Task not found!');
//   }
// });
export default router;
