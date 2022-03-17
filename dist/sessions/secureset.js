"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function setSessionValue(req, to, value) {
    req.session[to] = value;
}
exports.setSessionValue = setSessionValue;
function deleteSessionValue(req, to) {
    setSessionValue(req, to, undefined);
}
exports.deleteSessionValue = deleteSessionValue;
