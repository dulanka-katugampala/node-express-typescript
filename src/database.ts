import { Sequelize } from 'sequelize'; 
import { envs } from './core/config/env';

const sequelize = new Sequelize(envs.DATABASE_URL);

let isConnected = false;

export const connectDB = async (): Promise<Sequelize> => {
    if (isConnected) {
        console.log('🔄 Using existing database connection.');
        return sequelize;
    }

    try {
        await sequelize.authenticate();
        console.log('✅ Database connected successfully.');
        isConnected = true;
        return sequelize;
    } catch (error) {
        console.error('❌ Database connection failed:', error);
        throw error;
    }
};

export default sequelize;