export default class ExpressServer {
    app: any;
    authBaseUrl: string;
    usePort: number;
    constructor();
    listen(port?: any): void;
    initModules(): void;
    initAuthSystem(baseUrl?: string): void;
    getApp(): any;
}
