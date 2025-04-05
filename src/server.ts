import express from 'express';
import compression from 'compression';
import rateLimit from 'express-rate-limit';

import { ONE_HUNDRED, ONE_THOUSAND, SIXTY } from './core/constants';
import router from './router';
import { connectDB } from './database';
import { NotFoundError } from './core/errors/AppError';
import { errorHandler } from './middlewear/errorHandlers/errorHandler';

export interface ServerOptions {
    port: number;
    prefix: string;
}

export class Server {
    private readonly app = express();
    private readonly port: number;
    private readonly prefix: string;

    constructor(options: ServerOptions) {
        const { port, prefix } = options;
        this.port = port;
        this.prefix = prefix;
    }

    async start(): Promise<void> {
        await connectDB();
        //* Middlewares
        this.app.use(express.json()); // parse json in request body (allow raw)
        this.app.use(express.urlencoded({ extended: true })); // allow x-www-form-urlencoded
        this.app.use(compression());

        //  limit repeated requests to public APIs
        this.app.use(
            rateLimit({
                max: ONE_HUNDRED,
                windowMs: SIXTY * SIXTY * ONE_THOUSAND,
                message: 'Too many requests from this IP, please try again in one hour'
            })
        );

        // router 
        this.app.use(this.prefix ,router);

        // 404 handler
        this.app.all('*', (req, res, next) => {
            next(new NotFoundError(`Route ${req.originalUrl} not found`));
        });

        // Global error handler
        this.app.use(errorHandler);

        this.app.listen(this.port, () => {
            console.log(`✅ Server running on port ${this.port}...`);
        });
    }
}