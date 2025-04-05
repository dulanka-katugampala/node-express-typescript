import { check } from "express-validator";
import { validationErrorHandler } from "../errorHandlers/validationErrorHandler";

const signupValidator = [
    check('name').notEmpty().withMessage('Name is required'),
    check('email').notEmpty().withMessage('Email is required').isEmail().withMessage('Proper Email is required'),
    check('password').notEmpty().withMessage('Password is required').isLength({ min: 5 }).withMessage('Password must be at least 5 characters long'),
    validationErrorHandler,
];

export { signupValidator };