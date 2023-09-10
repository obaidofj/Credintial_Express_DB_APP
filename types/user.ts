import express from 'express';
import {User as userEntity} from '../db/entity/user.entity'
namespace User {

  export enum UserType {
    company = 'Admin',
    employee = 'Dev',
    admin = 'Demo',
  }
    export interface User {
        id: string;
        username: string;
        password: string;
        email: string;
      }

  export interface Request extends express.Request {
    body: {
        id: string;
        username: string;
        password: string;
        email: string;
    }
  }

  export interface Response extends express.Response {
   
  }  
  
  export interface Permissions {
    id: string;
    name: string;
  } 
  
  export interface Role {
    id: string;
    name: string;
    permissions: number[];
  }

  export interface Profile {
    id: string;
    firstName: string;
    lastName: string;
    dateOfBirth: string;
  }
 export interface UserRoles {
    id: string;
    roles: number[];
 
  }
}

export {User}