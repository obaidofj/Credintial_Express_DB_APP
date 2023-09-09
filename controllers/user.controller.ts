
import express from 'express';
import {User} from '../types/user.js';
import { User as userEntity } from '../db/entity/user.entity.js';
import { Permissions } from '../db/entity/permissions.entity.js';
import { userValidationMiddleware } from '../middlewares/user.middelware.js';
import { Role } from '../db/entity/role.entity.js';
import { In } from 'typeorm';

const insertRole = async (payload: User.Role) => {
    try {
      const role = new Role();
      role.name = payload.name;
      role.permissions = await Permissions.findBy({
        id: In(payload.permissions)
      });
      await role.save();
      return role;
    } catch (error) {
      throw ("Something went wrong");
    }
  }
  
  const insertPermission = async (payload: User.Permissions) => {
    try {
      const permission = Permissions.create({
        name: payload.name
      });
      await permission.save();
      return permission;
    } catch (error) {
      console.log(error);
      throw ("Something went wrong");
    }
  }