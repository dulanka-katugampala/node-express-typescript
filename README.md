# Node Express TypeScript API

A robust and scalable REST API boilerplate built with Node.js, Express, TypeScript, and Sequelize ORM.

## Features

- **TypeScript**: Full type safety across the application
- **Express**: Fast, unopinionated, minimalist web framework for Node.js
- **Sequelize ORM**: SQL database integration with PostgreSQL
- **JWT Authentication**: Secure authentication system with access and refresh tokens
- **Environment Configuration**: Centralized environment variable management
- **Error Handling**: Comprehensive error handling system
- **Rate Limiting**: Protection against brute force attacks
- **Compression**: Response compression for improved performance
- **Cookie Parser**: Cookie parsing middleware
- **Module Aliases**: Clean import paths

## Project Structure

```
src/
├── app.ts                  # Application entry point
├── server.ts               # Express server configuration
├── database.ts             # Database connection setup
├── controllers/            # Request handlers
├── core/                   # Core application components
│   ├── classes/            # Error classes and utilities
│   ├── config/             # Configuration files
│   └── constants/          # Application constants
├── middlewear/             # Express middlewares
├── models/                 # Sequelize models
├── repos/                  # Data access layer
├── router/                 # Express routes
├── services/               # Business logic
└── utils/                  # Utility functions
```

## Prerequisites

- Node.js (v14 or higher)
- PostgreSQL
- npm or yarn

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd node-express-typescript
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the root directory with the following variables (see `.env.template`):
   ```
   NODE_ENV=development
   PORT=3000
   DEFAULT_API_PREFIX=/api/v1
   JWT_ACCESS_SECRET=your-access-token-secret
   JWT_REFRESH_SECRET=your-refresh-token-secret
   ACCESS_TOKEN_EXPIRES_IN=15m
   REFRESH_TOKEN_EXPIRES_IN=7d
   DATABASE_URL=postgres://username:password@localhost:5432/database_name
   ```

## Development

Start the development server with hot-reload:

```
npm run dev
```

## Production

1. Build the application:
   ```
   npm run build
   ```

2. Start the production server:
   ```
   npm start
   ```

## API Endpoints

### Authentication

- `POST /api/v1/auth/register` - Register a new user
- `POST /api/v1/auth/login` - Login with existing user credentials
- `POST /api/v1/auth/refresh` - Refresh access token
- `POST /api/v1/auth/logout` - Logout and invalidate tokens

## Database Models

### User
- `id`: UUID (Primary Key)
- `name`: String
- `email`: String (Unique)
- `password`: String (Hashed)
- `status`: Enum ('active', 'inactive')

### TokenStorage
- For storing refresh tokens and managing sessions

## Error Handling

The application implements a centralized error handling system with custom error classes for different types of errors.

## Dependencies

### Core Dependencies
- express
- sequelize
- pg (PostgreSQL client)
- jsonwebtoken
- bcrypt
- dotenv
- env-var
- compression
- cookie-parser
- express-rate-limit
- express-validator
- module-alias

### Development Dependencies
- typescript
- ts-node-dev
- eslint
- @types/* (Type definitions)
- rimraf

## License

ISC

---

This project was created as a boilerplate for Node.js REST APIs with TypeScript and PostgreSQL.