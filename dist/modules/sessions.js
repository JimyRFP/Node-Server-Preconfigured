"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initSessions = initSessions;
const express_session_1 = __importDefault(require("express-session"));
const env_1 = __importDefault(require("../settings/env"));
function initSessions(app) {
    app.set('trust proxy', 1); // trust first proxy
    app.use((0, express_session_1.default)({
        secret: env_1.default.SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
        cookie: { secure: env_1.default.NODE_ENV == 'development' ? false : true,
            httpOnly: true,
        },
    }));
}
