declare const ENV: {
    NODE_ENV: string;
    ALLOW_CORS: boolean;
    PORT: number;
    DATABASE: {
        dialect: string;
        host: string;
        database: string;
        username: string;
        password: string;
    };
};
export default ENV;
