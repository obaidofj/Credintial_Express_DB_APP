import { myDataSource } from "../db/app-data-source.js"
import  supertest  from "supertest"
import {app} from '../index.js'


beforeAll(async () => {
  myDataSource 
    .initialize() 
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization:", err)
    }) 
});

afterAll(async () => {
  await dataSource.destroy();
});

const userData = {
  "username":"mohamed",
  "email": "mohamed@email.com",
  "password": "1234"
};

describe("POST Create User,Rout /v1/user/", async () => {
  
  // beforeAll(async () => {    
  // })

  const res = await supertest(app).post('/v1/user').send(userData);

  expect(res.statusCode).toBe(200);
  expect(response.text).toMatch(/^User Created with ID:\d+$/);

  // expect(response.body).toHaveProperty('message');
  // expect(response.body.message).toMatch(/^User Created with ID:\d+$/); 

});