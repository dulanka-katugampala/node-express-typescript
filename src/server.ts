import express from 'express';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import cookieParser from "cookie-parser";

import { ONE_HUNDRED, ONE_THOUSAND, SIXTY } from './core/constants';
import router from './router';
import { connectDB, syncDB } from './database';
import { NotFoundError } from './core/classes/AppError';
import { errorHandler } from './middlewear/errorHandlers/errorHandler';

export interface ServerOptions {
    port: number;
    prefix: string;
}

export async function start(options: ServerOptions): Promise<void> {
    const { port, prefix } = options;
    const app = express();
    await connectDB();
    await syncDB();

    // Middlewares
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(compression());
    app.use(cookieParser());

    // limit repeated requests to public APIs
    app.use(
        rateLimit({
            max: ONE_HUNDRED,
            windowMs: SIXTY * SIXTY * ONE_THOUSAND,
            message: 'Too many requests from this IP, please try again in one hour'
        })
    );

    // router 
    app.use(prefix, router);

    // 404 handler
    app.all('*', (req, res, next) => {
        next(new NotFoundError(`Route ${req.originalUrl} not found`));
    });

    // Global error handler
    app.use(errorHandler);

    app.listen(port, () => {
        console.log(`✅ Server running on port ${port}...`);
    });
}