import bcrypt from 'bcrypt';
import { envs } from '../core/config/env';
import jwt from 'jsonwebtoken';

const saltRounds = 10;

const hashPassword = async (password: string) => {
    return await bcrypt.hash(password, saltRounds);
}

const comparePassword = async (password1: string, password2: string) => {
    return await bcrypt.compare(password1, password2);
}

const generateAccessToken = async (user: any) => {
    return jwt.sign(user, String(envs.JWT_ACCESS_SECRET), {
        expiresIn: String(envs.ACCESS_TOKEN_EXPIRES_IN),
    });
};

const generateRefreshToken = async (user: any) => {
    return jwt.sign(user, String(envs.JWT_REFRESH_SECRET), {
        expiresIn: String(envs.REFRESH_TOKEN_EXPIRES_IN),
    });
};

const verifyAccessToken = async (token: string) => {
    return await jwt.verify(token, String(envs.JWT_ACCESS_SECRET));
};

const verifyRefreshToken = async (token: string) => {
    return await jwt.verify(token, String(envs.JWT_REFRESH_SECRET));
};

export {
    hashPassword,
    comparePassword,
    generateAccessToken,
    generateRefreshToken,
    verifyAccessToken,
    verifyRefreshToken
}