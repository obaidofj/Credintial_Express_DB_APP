import express from "express";
import { myDataSource } from "./db/app-data-source";
import { loggerMiddleware } from './middlewares/generic';
import userRouter from './routers/user.router';
// import  adminRouter  from './routers/admin.router';
// establish database connection
myDataSource
    .initialize()
    .then(() => {
    console.log("Data Source has been initialized!");
})
    .catch((err) => {
    console.error("Error during Data Source initialization:", err);
});
const PORT = process.env.APP_PORT || 3000;
// create and setup express app
const app = express();
app.use(express.json());
app.use(loggerMiddleware);
app.get('/', (req, res) => {
    res.send('Server UP!');
});
app.use('/v1/user', userRouter);
// app.use('/v1/admin', adminRouter);
// start express server
app.listen(PORT, () => {
    console.log(`App is running and Listening on port ${PORT}`);
    //myDataSource.initialize();
});
