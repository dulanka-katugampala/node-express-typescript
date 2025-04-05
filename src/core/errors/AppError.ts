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
        super(400, message, errors);
    }
}

export class UnauthorizedError extends AppError {
    constructor(message: string) {
        super(401, message);
    }
}

export class ForbiddenError extends AppError {
    constructor(message: string) {
        super(403, message);
    }
}

export class NotFoundError extends AppError {
    constructor(message: string) {
        super(404, message);
    }
}