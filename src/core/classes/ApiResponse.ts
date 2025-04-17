import { HttpCode } from "../constants";

export class ApiResponse {
    constructor(
        public ok: boolean,
        public statusCode: number,
        public message: string,
        public data?: any,
        public errors?: any[]
    ) {}

    static success(statusCode: number, message: string, data?: any): ApiResponse {
        return new ApiResponse(true, statusCode, message, data);
    }

    static error(statusCode: number, message: string, errors?: any[]): ApiResponse {
        return new ApiResponse(false, statusCode, message, undefined, errors);
    }

    // Common success responses
    static ok(message: string, data?: any): ApiResponse {
        return this.success(HttpCode.OK, message, data);
    }

    static created(message: string, data?: any): ApiResponse {
        return this.success(HttpCode.CREATED, message, data);
    }

    // Common error responses
    static badRequest(message: string = 'Bad Request', errors?: any[]): ApiResponse {
        return this.error(HttpCode.BAD_REQUEST, message, errors);
    }

    static unauthorized(message: string = 'Unauthorized'): ApiResponse {
        return this.error(HttpCode.UNAUTHORIZED, message);
    }

    static forbidden(message: string = 'Forbidden'): ApiResponse {
        return this.error(HttpCode.FORBIDDEN, message);
    }

    static notFound(message: string = 'Not Found'): ApiResponse {
        return this.error(HttpCode.NOT_FOUND, message);
    }

    static internalServerError(message: string = 'Internal Server Error'): ApiResponse {
        return this.error(HttpCode.INTERNAL_SERVER_ERROR, message);
    }
}