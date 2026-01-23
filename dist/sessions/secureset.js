"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setSessionValue = setSessionValue;
exports.deleteSessionValue = deleteSessionValue;
function setSessionValue(req, to, value) {
    req.session[to] = value;
}
function deleteSessionValue(req, to) {
    setSessionValue(req, to, undefined);
}
