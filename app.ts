import  express from "express"
import { Request, Response } from "express"
import { User } from "./db/entity/user.entity"
import { myDataSource } from "./db/app-data-source"
import { loggerMiddleware } from './middlewares/generic.js';

// establish database connection
myDataSource
    .initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization:", err)
    })

const PORT = process.env.APP_PORT || 3000;

// create and setup express app
const app = express()
app.use(express.json())

app.use(loggerMiddleware);


app.get('/', (req, res) => {
  res.send('Server UP!');
});

app.use('/v1/user', userRouter);
app.use('/v1/admin', adminRouter);

// register routes
app.get("/users", async function (req: Request, res: Response) {
    const users = await myDataSource.getRepository(User).find()
    res.json(users)
})

app.get("/users/:id", async function (req: Request, res: Response) {
    const results = await myDataSource.getRepository(User).findOneBy({
        id: req.params.id,
    })
    return res.send(results)
})

app.post("/users", async function (req: Request, res: Response) {
    const user = await myDataSource.getRepository(User).create(req.body)
    const results = await myDataSource.getRepository(User).save(user)
    return res.send(results)
})

app.put("/users/:id", async function (req: Request, res: Response) {
    const user = await myDataSource.getRepository(User).findOneBy({
        id: req.params.id,
    })
    myDataSource.getRepository(User).merge(user, req.body)
    const results = await myDataSource.getRepository(User).save(user)
    return res.send(results)
})

app.delete("/users/:id", async function (req: Request, res: Response) {
    const results = await myDataSource.getRepository(User).delete(req.params.id)
    return res.send(results)
})

// start express server
app.listen(PORT, () => {
    console.log(`App is running and Listening on port ${PORT}`);
    //myDataSource.initialize();
  });