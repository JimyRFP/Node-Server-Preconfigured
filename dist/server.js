"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.debugMessage = exports.JSONResponse = exports.randomString = exports.WebSocketAuth = exports.dataBase = exports.User = void 0;
__exportStar(require("./auth/auth"), exports);
;
var User_1 = require("./database/models/User");
Object.defineProperty(exports, "User", { enumerable: true, get: function () { return User_1.User; } });
var database_1 = require("./database/database");
Object.defineProperty(exports, "dataBase", { enumerable: true, get: function () { return database_1.dataBase; } });
__exportStar(require("./sessions/secureset"), exports);
__exportStar(require("./sessions/secureget"), exports);
__exportStar(require("./users/users"), exports);
var WSAuth_1 = require("./database/models/WSAuth");
Object.defineProperty(exports, "WebSocketAuth", { enumerable: true, get: function () { return WSAuth_1.WebSocketAuth; } });
__exportStar(require("./wsauth/wsauth"), exports);
var random_1 = require("./utils/string/random");
Object.defineProperty(exports, "randomString", { enumerable: true, get: function () { return random_1.randomString; } });
var response_1 = require("./utils/response");
Object.defineProperty(exports, "JSONResponse", { enumerable: true, get: function () { return response_1.JSONResponse; } });
const expressServer_1 = __importDefault(require("./expressServer"));
var debug_1 = require("./utils/debug/debug");
Object.defineProperty(exports, "debugMessage", { enumerable: true, get: function () { return debug_1.debugMessage; } });
__exportStar(require("./middlewares/auth"), exports);
__exportStar(require("./middlewares/wsauth"), exports);
exports.default = expressServer_1.default;
