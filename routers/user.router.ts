import express from 'express';
import {User} from '../types/user.js';
import { User as userEntity } from '../db/entity/user.entity.js';
import { userValidationMiddleware } from '../middlewares/user.middelware.js';
import * as userController from '../controllers/user.controller.js';
import { verify } from '../middlewares/authenticate.js';

const router = express.Router();

const saltRounds = 10;

router.post('/', userValidationMiddleware);

router.get('/', async (req: User.Request, res: User.Response,next:) => {
  try {

    const [items, total] = await userEntity.findAndCount({
      // relations: ['role', 'user.profile' ,'permissions']
      // loadRelationIds: true,
    });

    res.send({
      total,
      items 
    });

  } catch (error) {
    next(error);
    // console.error(error);
    // res.status(500).send("Something went wrong!"+error);
  }
});

router.post('/', async (req: User.Request, res: User.Response,next:express.next) => {

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


router.post('/profile',  (req, res, next) => {
  userController.insertProfile(req.body).then((data) => {
    res.status(201).send(data)
  }).catch(err => {
    console.error(err);
    res.status(500).send(err);
  });
});

router.post('/login', (req, res) => {
  const email = req.body.email;
  const userName = req.body.username;
  const password = req.body.password;

  userController.login(userName, email, password)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(401).send(err);
    })
});

router.post('/verify', (req, res) => {
  const token = req.body.token;

  if(verify(token))
  {
    res.send({'token':true,'msg':'The token is right'})
  }
  else
  {
    res.send({'token':false,'msg':'The token is wrong'})
  }
   
});



export default router;