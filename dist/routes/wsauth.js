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
const express_1 = __importDefault(require("express"));
const response_1 = require("../utils/response");
const auth_1 = require("../auth/auth");
const wsauth_1 = require("../wsauth/wsauth");
const users_1 = require("../users/users");
const server_1 = require("../server");
const config_1 = require("../auth/config");
exports.router = express_1.default.Router();
var GenerateTokenError;
(function (GenerateTokenError) {
    GenerateTokenError[GenerateTokenError["UserMustBeLogged"] = 1] = "UserMustBeLogged";
    GenerateTokenError[GenerateTokenError["GetUserError"] = 2] = "GetUserError";
    GenerateTokenError[GenerateTokenError["InternalError"] = 3] = "InternalError";
})(GenerateTokenError || (GenerateTokenError = {}));
;
exports.router.post('/gettoken', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!auth_1.userIsLogged(req))
        return res.send(response_1.JSONResponse(false, GenerateTokenError.UserMustBeLogged, "User Must Be Logged"));
    try {
        let userId = yield users_1.getUserIdByUserEmail(server_1.getSessionValue(req, config_1.SESSION_LOGGED_DATA));
        if (userId == NaN)
            return res.send(response_1.JSONResponse(false, GenerateTokenError.GetUserError, "Get user error"));
        let n = yield wsauth_1.setWSAuthDataNewToken(userId);
        return res.send(response_1.JSONResponse(true, 0, "", { token: n.dataValues.token,
            expiration: n.dataValues.expiration,
            userId: userId
        }));
    }
    catch (e) {
    }
}));
