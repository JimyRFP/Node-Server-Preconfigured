"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initPostReader = initPostReader;
const express_1 = __importDefault(require("express"));
function initPostReader(app) {
    app.use(express_1.default.json({ limit: '1mb' }));
    app.use(express_1.default.urlencoded({ limit: '1mb', extended: true }));
}
