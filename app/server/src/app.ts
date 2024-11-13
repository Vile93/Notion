import express, { json } from 'express';
import router from './routers/router';
import cors from 'cors';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import moragan from 'morgan';
import 'dotenv/config';

const app = express();
const PORT = process.env.PORT || 3000;
const start = async () => {
    try {
        await mongoose
            .connect(process.env.DB ?? '')
            .then(() => console.log('The database has been launched'));
        app.listen(PORT);
    } catch (e) {
        console.log(e);
    }
};

app.use(cookieParser(), json(), cors(), moragan('tiny'), router);
start();
