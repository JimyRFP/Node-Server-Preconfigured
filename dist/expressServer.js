"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const sessions_1 = require("./modules/sessions");
const postreader_1 = require("./modules/postreader");
const initcors_1 = require("./modules/initcors");
const env_1 = __importDefault(require("./settings/env"));
const users_1 = __importDefault(require("./routes/users"));
const wsauth_1 = require("./routes/wsauth");
class ExpressServer {
    constructor() {
        this.authBaseUrl = "";
        this.wsAuthBaseUrl = "";
        this.usePort = env_1.default.PORT;
        this.app = (0, express_1.default)();
        this.initModules();
    }
    listen(port = null) {
        if (port != null)
            this.usePort = parseInt(port);
        this.app.listen(this.usePort);
    }
    initModules() {
        (0, sessions_1.initSessions)(this.app);
        (0, postreader_1.initPostReader)(this.app);
        (0, initcors_1.initCors)(this.app);
    }
    initAuthSystem(baseUrl = '/user') {
        this.authBaseUrl = baseUrl;
        this.app.use(this.authBaseUrl, users_1.default);
    }
    initWSAuthSystem(wsBaseUrl = '/ws') {
        this.wsAuthBaseUrl = wsBaseUrl;
        this.app.use(this.wsAuthBaseUrl, wsauth_1.router);
    }
    getApp() {
        return this.app;
    }
}
exports.default = ExpressServer;
