"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userIsLogged = userIsLogged;
exports.setUserLogged = setUserLogged;
exports.logoutUser = logoutUser;
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
function setUserLogged(req, email) {
    (0, server_1.setSessionValue)(req, config_1.SESSION_LOGGED_DATA, email);
}
function logoutUser(req) {
    (0, server_2.deleteSessionValue)(req, config_1.SESSION_LOGGED_DATA);
}
