/// <reference types="node" />
import express from "express";
import { Express } from "express";
import { Server } from "http";
export default class ExpressServer {
    app: Express;
    authBaseUrl: string;
    usePort: number;
    server?: Server;
    wsAuthBaseUrl: string;
    constructor();
    listen(port?: any): void;
    initModules(): void;
    initAuthSystem(baseUrl?: string): void;
    initWSAuthSystem(wsBaseUrl?: string): void;
    getApp(): express.Express;
    getServer(): Server | undefined;
}
