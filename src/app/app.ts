
import express, { NextFunction, Request, Response } from 'express';
const app = express();

import dotenv from 'dotenv';
dotenv.config();

import morgan from 'morgan';
app.use(morgan('dev'));


//errorHandler
// import { errorHandler, notFound } from '../middlewares/errorHandler';

//controllers

import userRoutes from '../route/users/usersRoute';
import postRoutes from '../route/posts/postRoute';
import commentRoutes from '../route/comments/commentsRoute';
import emailRoutes from '../route/email/emailRouts';
import categoryRoutes from '../route/category/categoryRoute';
import cors from 'cors';
import router from '@shared/routes';
import stream from "@infra/logging/stream"
import globalErrorHandler from '@infra/http/express/middlewares/globalErrorHandler';
import status from 'http-status';


app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With');
    next();
});

// app.use(morgan('dev'));
app.use(morgan("combined", { stream }));

//middleware
app.use(express.json());

// corse
app.use(cors());

if (process.env.NODE_ENV === 'development') {
    app.get('/', (req, res) => res.status(200).send('development'));
} else {
    app.get('/', (req, res) => res.status(200).send('production'));
}

app.use("/api/v2", router);
//user route
app.use('/api/users', userRoutes);

//post route
app.use('/api/posts', postRoutes);

//comment route
app.use('/api/comments', commentRoutes);

//Email route
app.use('/api/email', emailRoutes);

//category Routes
app.use('/api/category', categoryRoutes);

app.use(globalErrorHandler);

app.use((req: Request, res: Response, next: NextFunction) => {

    res.status(status.NOT_FOUND).json({
        success: false,
        message: "API NOT FOUND!",
        error: {
            path: req.originalUrl,
            message: "Your requested path is not found!",
        },
    });
});



export default app;
