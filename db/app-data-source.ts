import { DataSource } from "typeorm"
import dotenv from 'dotenv'

const result = dotenv.config()

const myDataSource = new DataSource({
    type: "mysql",
    host: process.env.HOST_NAME,
    port: Number(process.env.PORT),
    username: process.env.DB_USER_NAME,
    password: process.env.DB_USER_PASSWORD,
    database: process.env.DB_NAME,
    entities: [],
    logging: true,
    synchronize: true,
})

export {myDataSource};