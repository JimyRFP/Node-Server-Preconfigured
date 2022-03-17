"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getSessionValue(req, get) {
    return req.session[get];
}
exports.getSessionValue = getSessionValue;
