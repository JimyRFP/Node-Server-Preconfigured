"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const random_1 = require("../utils/string/random");
const wsauth_1 = require("../wsauth/wsauth");
const response_1 = require("../utils/response");
const server_1 = require("../server");
const meta_sanitizer_1 = __importDefault(require("meta-sanitizer"));
const DEBUG = true;
function checkWSAuth(ws, msg) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (ws.userId && ws.connectionToken) {
                if ((yield (0, wsauth_1.checkConnectionAuth)(ws.userId, ws.connectionToken)))
                    return true;
            }
            const message = JSON.parse(msg);
            if (message.action === "Authenticate") {
                const token = meta_sanitizer_1.default.justCharsAndNumbers(message.token, false);
                const userId = parseInt(meta_sanitizer_1.default.justNumbers(message.userId, false));
                const connectionToken = (0, random_1.randomString)(35);
                if ((yield (0, server_1.authenticateWS)(userId, token, connectionToken))) {
                    ws.userId = userId;
                    ws.connectionToken = connectionToken;
                    return true;
                }
                else {
                    return sendError(false, "Invalid Token or UserID");
                }
            }
            else {
                return sendError(false, "Need auth", "'action'='Authenticate' and must have 'token' and 'userId'");
            }
        }
        catch (e) {
            return sendError(false, "Internal Error", "", e);
        }
        function sendError(isOk, message, errorMessage = "", data = {}) {
            ws.send((0, response_1.WSResponse)(isOk, message, errorMessage, data));
            return false;
        }
    });
}
