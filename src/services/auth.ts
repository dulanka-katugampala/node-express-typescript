import { repoAuth } from "../repos/auth";
import { AppError, BadRequestError } from "../core/classes/AppError";
import { hashPassword, comparePassword } from "../utils/auth";
import { HttpCode } from "../core/constants";

export interface userSignup {
    id?: string;
    email: string;
    name: string;
    password: string;
    status?: string;
}
const signup = async (user: userSignup) => {
    const userExist = await repoAuth.getByEmail(user.email);
    if (userExist) {
        throw new BadRequestError('User already exists.');
    }
    const hash = await hashPassword(user.password);
    const userNew = await repoAuth.create({ ...user, password: hash });
    return userNew;
}

export interface userSignin {
    email: string;
    password: string;
}
const signin = async (user: userSignin) => {
    const userExist: any = await repoAuth.getByEmail(user.email);
    if (!userExist) {
        throw new BadRequestError('Invalid credentials.');
    }
    const match = await comparePassword(user.password, userExist.password);

    if (!match) {
        throw new BadRequestError('Invalid credentials.');
    }

    return userExist;
}

const addRefreshToken = async (token: string) => {
    const data = await repoAuth.addToken(token);
    return data;
}

const getRefreshToken = async (token: string) => {
    const data = await repoAuth.getAToken(token);
    return data;
}

const removeRefreshToken = async (token: string) => {
    const data = await repoAuth.deleteByToken(token);
    return data;
}

export const authService = { signup, signin, addRefreshToken, getRefreshToken, removeRefreshToken };