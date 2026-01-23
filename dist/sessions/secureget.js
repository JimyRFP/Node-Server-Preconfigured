"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSessionValue = getSessionValue;
function getSessionValue(req, get) {
    return req.session[get];
}
