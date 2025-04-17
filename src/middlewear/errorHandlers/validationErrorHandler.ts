import { Request, Response, NextFunction } from 'express';
import { BadRequestError } from '../../core/classes/AppError';
import { validationResult } from 'express-validator';

export const validationErrorHandler = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        next(new BadRequestError('Validation failed', errors.array()));
    }
    next();
};