import { Request, Response, NextFunction } from 'express';
import { BadRequestError } from '../../core/errors/AppError';
import { validationResult } from 'express-validator';

export const validationErrorHandler = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        throw new BadRequestError('Validation failed', errors.array());
    }
    next();
};