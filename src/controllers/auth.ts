import { Request, Response, NextFunction } from "express";
import { authService } from "../services/auth";
import { HttpCode } from "../core/constants";
import { ApiResponse } from "../core/classes/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler";
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from "../utils/auth";
import { AppError, UnauthorizedError } from "../core/classes/AppError";

const authSignup = asyncHandler(async function (req: Request, res: Response, next: NextFunction) {
    const userData = {
        email: req.body.email,
        name: req.body.name,
        password: req.body.password,
    };
    const user = await authService.signup(userData);
    const { id, name, email, createdAt, updatedAt } = user.dataValues;
    res.status(HttpCode.CREATED).json(ApiResponse.created('User signed up successfully.', {
        id, name, email, createdAt, updatedAt
    }));
})

const authSignin = asyncHandler(async function (req: Request, res: Response, next: NextFunction) {
    const userData = {
        email: req.body.email,
        password: req.body.password,
    };
    const user = await authService.signin(userData);
    const { id, name, email, createdAt, updatedAt } = user.dataValues;
    const userRes = { id, name, email, createdAt, updatedAt };
    const token = await generateAccessToken(userRes);
    const refreshToken = await generateRefreshToken(userRes);
    if (!(token && refreshToken)) {
        throw new AppError(HttpCode.INTERNAL_SERVER_ERROR, 'Internal Server Error!')
    }
    const refreshTokenStore = await authService.addRefreshToken(refreshToken);
    if (!refreshTokenStore) {
        throw new AppError(HttpCode.INTERNAL_SERVER_ERROR, 'Internal Server Error!')
    }
    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.status(HttpCode.OK).json(ApiResponse.ok('User signed in successfully.', { token, user: userRes }));
})

const authRefresh = asyncHandler(async function (req: Request, res: Response, next: NextFunction) {
    const refreshToken = req?.cookies?.refreshToken;
    if (!refreshToken) {
        throw new UnauthorizedError('Invalid refresh token.');
    }
    const user: any = await verifyRefreshToken(refreshToken);
    if (!user) {
        throw new UnauthorizedError('Invalid refresh token.');
    }
    const is = await authService.getRefreshToken(refreshToken);
    if (!is) {
        throw new UnauthorizedError('Invalid refresh token.');
    }

    const { id, name, email, createdAt, updatedAt } = user;
    const userRes = { id, name, email, createdAt, updatedAt };
    const token = await generateAccessToken(userRes);
    const rToken = await generateRefreshToken(userRes);
    if (!(token && rToken)) {
        throw new AppError(HttpCode.INTERNAL_SERVER_ERROR, 'Internal Server Error!')
    }
    const promiseReturn = await Promise.all([authService.addRefreshToken(rToken), authService.removeRefreshToken(refreshToken)]);
    if (!promiseReturn) {
        throw new AppError(HttpCode.INTERNAL_SERVER_ERROR, 'Internal Server Error!')
    }
    res.cookie('refreshToken', rToken, {
        httpOnly: true,
        secure: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.status(HttpCode.OK).json(ApiResponse.ok('User token refreshed successfully.', { token, user }));
})

const authLogout = asyncHandler(async function (req: Request, res: Response, next: NextFunction) {
    const refreshToken = req?.cookies?.refreshToken;

    if (refreshToken) {
        await authService.removeRefreshToken(refreshToken)
    }

    // Clear cookie
    res.clearCookie('refreshToken', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
    });

    res.status(HttpCode.OK).json(ApiResponse.ok('User logged out successfully!'));
})

export { authSignup, authSignin, authRefresh, authLogout };