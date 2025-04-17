import { HttpCode } from "../constants";

export class AppError extends Error {
    constructor(
        public statusCode: number,
        public message: string,
        public errors?: any[],
        public isOperational = true,
        public stack = '',
    ) {
        super(message);
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}

export class BadRequestError extends AppError {
    constructor(message: string, errors?: any[]) {
        super(HttpCode.BAD_REQUEST, message, errors);
    }
}

export class UnauthorizedError extends AppError {
    constructor(message: string) {
        super(HttpCode.UNAUTHORIZED, message);
    }
}

export class ForbiddenError extends AppError {
    constructor(message: string) {
        super(HttpCode.FORBIDDEN, message);
    }
}

export class NotFoundError extends AppError {
    constructor(message: string) {
        super(HttpCode.NOT_FOUND, message);
    }
}