import User from "../models/User";
import TokenStorage from "../models/TokenStorage";

const getAll = async () => {
    return await User.findAll();
}

const getById = async (id: string) => {
    return await User.findOne({ where: { id } });
}

const getByEmail = async (email: string) => {
    return await User.findOne({ where: { email: email } });
}

const create = async (user: any) => {
    return await User.create(user);
}

const updateById = async (id: string, user: any) => {
    return await User.update(user, { where: { id } });
}

const deleteById = async (id: string) => {
    return await User.destroy({ where: { id } });
}

const getAToken = async (token: string) => {
    return await TokenStorage.findOne({ where: { token: token } });
}

const addToken = async (token: string) => {
    return await TokenStorage.create({ token });
}

const deleteByToken = async (token: string) => {
    return await TokenStorage.destroy({ where: { token: token } });
}

export const repoAuth = { getAll, getById, create, updateById, deleteById, getByEmail, getAToken, deleteByToken, addToken };