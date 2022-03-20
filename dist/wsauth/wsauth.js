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
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("../server");
const server_2 = require("../server");
const random_1 = require("./../utils/string/random");
server_1.WebSocketAuth.init(server_2.dataBase);
function getWSAuthDataByUserId(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let u = yield server_1.WebSocketAuth.findOne({ where: { user_id: userId.toString() } });
            return u;
        }
        catch (e) {
            throw e;
        }
    });
}
exports.getWSAuthDataByUserId = getWSAuthDataByUserId;
function setWSAuthDataNewToken(userId, expiration_hours = 72) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let ws = yield getWSAuthDataByUserId(userId);
            let token = random_1.randomString(50);
            let expiration = new Date();
            expiration.setTime(expiration.getTime() + expiration_hours * 60 * 60 * 1000);
            if (ws == null || ws == undefined) {
                return yield server_1.WebSocketAuth.create({ user_id: userId.toString(),
                    token: token,
                    expiration: expiration,
                });
            }
            else {
                ws.token = token;
                ws.expiration = expiration;
                return yield ws.save();
            }
        }
        catch (e) {
            throw e;
        }
    });
}
exports.setWSAuthDataNewToken = setWSAuthDataNewToken;
function checkWSAuthToken(userId, token) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let ws = yield getWSAuthDataByUserId(userId);
            if (!Boolean(ws))
                return false;
            if (ws.dataValues.token != token)
                return false;
            if (Date.now() > ws.dataValues.expiration.getTime())
                return false;
            return true;
        }
        catch (e) {
            return false;
        }
    });
}
exports.checkWSAuthToken = checkWSAuthToken;
