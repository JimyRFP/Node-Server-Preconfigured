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
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const response_1 = require("../utils/response");
const wsauth_1 = require("../wsauth/wsauth");
const auth_1 = require("../middlewares/auth");
exports.router = express_1.default.Router();
exports.router.post('/gettoken', auth_1.setUserDataMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let userId = req.user.id;
        let n = yield (0, wsauth_1.setWSAuthDataNewToken)(userId);
        return res.send((0, response_1.JSONResponse)({ token: n.dataValues.token,
            expiration: n.dataValues.expiration,
            userId: userId
        }));
    }
    catch (e) {
        return (0, response_1.sendIError)(req, res, e);
    }
}));
