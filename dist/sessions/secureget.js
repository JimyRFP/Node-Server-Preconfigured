"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSessionValue = void 0;
function getSessionValue(req, get) {
    return req.session[get];
}
exports.getSessionValue = getSessionValue;
