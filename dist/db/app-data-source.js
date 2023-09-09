import { DataSource } from "typeorm";
import dotenv from 'dotenv';
import { Profile } from './entity/profile.entity.js';
import { User } from './entity/user.entity.js';
import { Role } from './entity/role.entity.js';
import { Permissions } from './entity/permissions.entity.js';
const result = dotenv.config();
const myDataSource = new DataSource({
    type: "mysql",
    host: process.env.HOST_NAME,
    port: Number(process.env.PORT),
    username: process.env.DB_USER_NAME,
    password: process.env.DB_USER_PASSWORD,
    database: process.env.DB_NAME,
    entities: [Profile, User, Role, Permissions],
    logging: true,
    synchronize: true,
});
export { myDataSource };
