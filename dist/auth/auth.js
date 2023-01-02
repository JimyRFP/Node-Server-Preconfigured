"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logoutUser = exports.setUserLogged = exports.userIsLogged = void 0;
const secureget_1 = require("../sessions/secureget");
const config_1 = require("./config");
const server_1 = require("../server");
const server_2 = require("../server");
function userIsLogged(req) {
    let user = (0, secureget_1.getSessionValue)(req, config_1.SESSION_LOGGED_DATA);
    if (user)
        return true;
    return false;
}
exports.userIsLogged = userIsLogged;
function setUserLogged(req, email) {
    (0, server_1.setSessionValue)(req, config_1.SESSION_LOGGED_DATA, email);
}
exports.setUserLogged = setUserLogged;
function logoutUser(req) {
    (0, server_2.deleteSessionValue)(req, config_1.SESSION_LOGGED_DATA);
}
exports.logoutUser = logoutUser;
