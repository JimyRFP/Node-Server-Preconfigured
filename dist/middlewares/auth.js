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
exports.setUserDataMiddleware = void 0;
const server_1 = require("../server");
const server_2 = require("../server");
const server_3 = require("../server");
const env_1 = __importDefault(require("../settings/env"));
const DEBUG = env_1.default.NODE_ENV === 'development' ? true : false;
function setUserDataMiddleware(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!(0, server_1.userIsLogged)(req))
            return res.status(401).send((0, server_2.JSONResponse)(false, undefined, "User Must Be Logged"));
        try {
            const dealerEmail = (0, server_3.getUserSessionData)(req);
            const user = yield server_1.User.findOne({ where: { email: dealerEmail, is_active: true } });
            if (!user)
                throw "Unknown user";
            req.user = { email: dealerEmail, id: user.id };
            yield (0, server_1.updateUserLastAction)(user);
            next();
        }
        catch (e) {
            let more = null;
            if (DEBUG)
                more = e;
            return res.status(500).send((0, server_2.JSONResponse)(false, undefined, "Get dealer data error", more));
        }
    });
}
exports.setUserDataMiddleware = setUserDataMiddleware;
