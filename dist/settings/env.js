"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const custom_env_path = path_1.default.join(process.cwd(), "spc_envfile.json");
const custom_env_path_prod = path_1.default.join(process.cwd(), "spc_envfile_prod.json");
var custom_env = {};
try {
    if (process.env.DEV_ENVIRONMENT) {
        custom_env = JSON.parse(fs_1.default.readFileSync(custom_env_path).toString());
    }
    else {
        custom_env = JSON.parse(fs_1.default.readFileSync(custom_env_path_prod).toString());
    }
}
catch (e) {
    custom_env = {};
}
const ENV = {
    NODE_ENV: process.env.DEV_ENVIRONMENT ? 'development' : 'production',
    ALLOW_CORS: process.env.ALLOW_CORS == 'ALLOW' ? true : false,
    PORT: process.env.SERVER_PORT ? parseInt(process.env.SERVER_PORT) : 3000,
    DATABASE: {
        dialect: process.env.DATABASE_DIALECT ? process.env.DATABASE_DIALECT : 'postgres',
        port: (custom_env.DATABASE && custom_env.DATABASE.PORT) ? process.env.DATABASE_PORT : 5432,
        host: (custom_env.DATABASE && custom_env.DATABASE.HOST) ? process.env.DATABASE_HOST : process.env.DATABASE_HOST || 'localhost',
        database: (custom_env.DATABASE && custom_env.DATABASE.DATABASE) ? process.env.DATABASE_DATABASE : 'postgres',
        username: (custom_env.DATABASE && custom_env.DATABASE.USERNAME) ? process.env.DATABASE_USERNAME : process.env.DATABASE_USERNAME || 'postgres',
        password: (custom_env.DATABASE && custom_env.DATABASE.PASSWORD) ? custom_env.DATABASE.PASSWORD : process.env.DATABASE_PASSWORD || '',
    },
    SESSION_SECRET: process.env.SESSION_SECRET ? process.env.SESSION_SECRET : "secret key session",
};
exports.default = ENV;
