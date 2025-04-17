import { Request, Response, NextFunction } from 'express';
import { UnauthorizedError } from '../core/classes/AppError';
import { validationResult } from 'express-validator';
import { verifyAccessToken } from "../utils/auth";

export const authMiddlewear = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let token = null;

        // Check token in Authorization header
        const authHeader = req.headers.authorization;
        if (authHeader && authHeader.startsWith("Bearer ")) {
            token = authHeader.split(" ")[1];
        }

        if (!token) {
            throw new UnauthorizedError('No token provided.')
        }

        const decoded = await verifyAccessToken(token);
        if (!decoded) {
            throw new UnauthorizedError('Invalid or expired token.');
        }

        req.user = decoded;
        next();
    } catch (error) {
        next(new UnauthorizedError('Unauthorized.'));
    }
};