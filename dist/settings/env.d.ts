declare const ENV: {
    NODE_ENV: string;
    ALLOW_CORS: boolean;
    PORT: number;
    DATABASE: {
        dialect: string;
        host: string;
        database: any;
        username: string;
        password: string;
    };
    SESSION_SECRET: string;
};
export default ENV;
