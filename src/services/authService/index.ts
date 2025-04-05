import User from "../../models/User";
import { CreationAttributes } from 'sequelize';

const getAllUsers = async () => {
    const users = await User.findAll();
    return users;
}

const createUser = async (user: CreationAttributes<any>) => {
    const newUser = await User.create(user);
    return newUser;
}

export { getAllUsers, createUser };