import { DataTypes } from 'sequelize';
import sequelize from '../database';

const TokenStorage = sequelize.define('TokenStorage', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    token: {
        type: DataTypes.TEXT,
        unique: true,
        allowNull: false,
    },
}, {
    tableName: 'token-storage',
    timestamps: true,
});

export default TokenStorage;
