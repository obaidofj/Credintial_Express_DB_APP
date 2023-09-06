import { DataSource } from "typeorm"
import dotenv from 'dotenv'

const myDataSource = new DataSource({
    type: "mysql",
    host: process.env."localhost",
    port: 3306,
    username: "test",
    password: "test",
    database: "test",
    entities: ["src/entity/*.js"],
    logging: true,
    synchronize: true,
})