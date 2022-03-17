"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const env_1 = __importDefault(require("../settings/env"));
function initCors(app) {
    if (env_1.default.ALLOW_CORS)
        app.use(cors_1.default());
}
exports.initCors = initCors;
