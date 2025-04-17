import 'dotenv/config';
import { get } from 'env-var';

export const envs = {
    NODE_ENV: get('NODE_ENV').default('development').asString(),
    PORT: get('PORT').required().asPortNumber(),
    API_PREFIX: get('DEFAULT_API_PREFIX').default('/api/v1').asString(),
    JWT_ACCESS_SECRET: get('JWT_ACCESS_SECRET').required().default("your-access-token-secret").asString(),
    JWT_REFRESH_SECRET: get('JWT_REFRESH_SECRET').required().default("your-refresh-token-secret").asString(),
    ACCESS_TOKEN_EXPIRES_IN: get('ACCESS_TOKEN_EXPIRES_IN').required().default("15m").asString(),
    REFRESH_TOKEN_EXPIRES_IN: get('REFRESH_TOKEN_EXPIRES_IN').required().default("7d").asString(),
    DATABASE_URL: get('DATABASE_URL').required().asString(),
};