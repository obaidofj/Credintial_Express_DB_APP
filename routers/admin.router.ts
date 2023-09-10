import express from 'express';
import {User} from '../types/user.js';
import { User as userEntity } from '../db/entity/user.entity.js';
import { userValidationMiddleware } from '../middlewares/user.middelware.js';
import * as userCon from '../controllers/user.controller.js'

const router = express.Router();

router.post('/role',  (req, res, next) => {
  userCon.insertRole(req.body).then((data) => {
      res.status(201).send(data)
    }).catch(err => {
      console.error(err);
      res.status(500).send(err);
    });
  });
  
  router.post('/permission',  (req, res, next) => {
    userCon.insertPermission(req.body).then((data) => {
      res.status(201).send(data)
    }).catch(err => {
      console.error(err);
      res.status(500).send(err);
    });
  });

    router.post('/assignrole',  (req, res, next) => {
    userCon.assignRoleToUser(req.body).then((data) => {
      res.status(201).send(data)
    }).catch(err => {
      console.error(err);
      res.status(500).send(err);
    });
  });

  export default router;
  