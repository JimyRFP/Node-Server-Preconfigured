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
const auth_1 = __importDefault(require("./routes/auth"));
class ExpressServer {
    constructor() {
        this.authBaseUrl = "";
        this.usePort = env_1.default.PORT;
        this.app = express_1.default();
        this.initModules();
    }
    listen(port = null) {
        if (port != null)
            this.usePort = parseInt(port);
        this.app.listen(this.usePort);
    }
    initModules() {
        sessions_1.initSessions(this.app);
        postreader_1.initPostReader(this.app);
        initcors_1.initCors(this.app);
    }
    initAuthSystem(baseUrl = '/user') {
        this.authBaseUrl = baseUrl;
        this.app.use(this.authBaseUrl, auth_1.default);
    }
    getApp() {
        return this.app;
    }
}
exports.default = ExpressServer;
