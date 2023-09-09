import express from 'express';
import {User as userEntity} from '../db/entity/user.entity'
namespace User {

    export interface Type {
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
  }

  export interface Profile {
    id: string;
    firstName: string;
    lastName: string;
    dateOfBirth: string;
  }

}

export {User}