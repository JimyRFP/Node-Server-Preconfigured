export let dialect: string;
export let host: string | undefined;
export let database: string | undefined;
export let username: string | undefined;
export let password: any;
export let port: string | number | undefined;
export namespace define {
    let underscored: boolean;
    let timestamps: boolean;
}
export let logging: boolean;
