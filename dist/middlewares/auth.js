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
exports.setUserDataMiddleware = void 0;
const server_1 = require("../server");
const server_2 = require("../server");
const server_3 = require("../server");
const response_1 = require("../utils/response");
function setUserDataMiddleware(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!(0, server_1.userIsLogged)(req))
            return res.status(401).send((0, server_2.JSONResponse)({}, "User Must Be Logged"));
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
            return (0, response_1.sendIError)(req, res, e);
        }
    });
}
exports.setUserDataMiddleware = setUserDataMiddleware;
