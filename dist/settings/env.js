"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ENV = {
    NODE_ENV: process.env.SERVER_ENV == 'development' ? 'development' : 'production',
    ALLOW_CORS: process.env.ALLOW_CORS == 'ALLOW' ? true : false,
    PORT: process.env.SERVER_PORT ? parseInt(process.env.SERVER_PORT) : 3000,
    DATABASE: {
        dialect: process.env.DATABASE_DIALECT ? process.env.DATABASE_DIALECT : 'postgres',
        host: process.env.DATABASE_HOST ? process.env.DATABASE_HOST : 'localhost',
        database: process.env.DATABASE_DATABASE ? process.env.DATABASE_DATABASE : 'postgres',
        username: process.env.DATABASE_USERNAME ? process.env.DATABASE_USERNAME : 'postgres',
        password: process.env.DATABASE_PASSWORD ? process.env.DATABASE_PASSWORD : '',
    },
    SESSION_SECRET: process.env.SESSION_SECRET ? process.env.SESSION_SECRET : "secret key session",
};
exports.default = ENV;
