export default class ExpressServer {
    app: any;
    authBaseUrl: string;
    usePort: number;
    wsAuthBaseUrl: string;
    constructor();
    listen(port?: any): void;
    initModules(): void;
    initAuthSystem(baseUrl?: string): void;
    initWSAuthSystem(wsBaseUrl?: string): void;
    getApp(): any;
}
