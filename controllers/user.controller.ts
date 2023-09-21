
import express from 'express';
import { User } from '../types/user.js';
import { User as userEntity } from '../db/entity/user.entity.js';
import { Permissions } from '../db/entity/permissions.entity.js';
import { userValidationMiddleware } from '../middlewares/user.middelware.js';
import { Role } from '../db/entity/role.entity.js';
import { EntityManager, In  } from 'typeorm';
import { Profile } from '../db/entity/profile.entity.js';
import { myDataSource } from "../db/app-data-source.js"
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';




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

const insertProfile = async (payload: User.Profile) => {
    return myDataSource.manager.transaction(async (transaction: EntityManager) => {
        try {


            const user = await userEntity.findOne({ where: { id: Number(payload.id) } });
            if (user) {
                const profile = Profile.create({
                    firstName: payload.firstName,
                    lastName: payload.lastName,
                    dateOfBirth: payload.dateOfBirth
                });

                await transaction.save(profile);

                user.profile = profile;
                await transaction.save(user);

                return profile;
            } //end if
            else {
                throw ("this user dose not exist");

            }
        } catch (error) {
            console.log(error);
            throw ("Something went wrong");
        }


    });

}

const assignRoleToUser = async (payload: User.UserRoles) => {
    try {

        const user = await userEntity.findOne({ where: { id: Number(payload.id) } });
        const roles = await Role.findBy({ id: In(payload.roles) });

        if (user) {
            if (!user.roles) {
                user.roles = []; // Initialize roles as an empty array if it's undefined
            }

            user.roles.push(...roles); // Use the spread operator to add multiple roles
            await user.save();

            return user;
        }
    } catch (error) {
        console.log(error);
        throw ("Something went wrong");
    }
}

const login = async (username: string, email: string, password: string) => {
    try {
      const user = await userEntity.findOneBy({
        username:username
      });

      
      const passwordMatching = await bcrypt.compare(password, user?.password || '');

      if (user && passwordMatching) {
        const token = jwt.sign(
          {
            userName: user.username,
            email: user.email,
            full_name: user?.profile?.firstName+' '+user?.profile?.lastName
          },
          process.env.SECRET_KEY || '',
          {
            expiresIn: "2w"
          }
        );
  
        return token;
      } else {
        throw ("Invalid Username or password!");
      }
    } catch (error) {
      throw ("Invalid Username or password!");
    }
  }

  
export { insertPermission, insertRole, assignRoleToUser, insertProfile,login }