declare const ENV: {
    NODE_ENV: string;
    ALLOW_CORS: boolean;
    PORT: number;
    DATABASE: {
        dialect: string;
        port: string | number | undefined;
        host: string | undefined;
        database: string | undefined;
        username: string | undefined;
        password: any;
    };
    SESSION_SECRET: string;
};
export default ENV;
