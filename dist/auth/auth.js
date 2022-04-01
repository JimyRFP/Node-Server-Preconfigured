"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userIsLogged = void 0;
const secureget_1 = require("../sessions/secureget");
const config_1 = require("./config");
function userIsLogged(req) {
    let user = (0, secureget_1.getSessionValue)(req, config_1.SESSION_LOGGED_DATA);
    if (user)
        return true;
    return false;
}
exports.userIsLogged = userIsLogged;
