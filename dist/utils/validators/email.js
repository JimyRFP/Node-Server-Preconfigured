"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkEmail = void 0;
function checkEmail(email) {
    const atIndex = email.indexOf("@");
    if (atIndex < 1)
        return false;
    const after = email.slice(atIndex + 1);
    if (after.length < 3)
        return false;
    if (after.indexOf('@') >= 0)
        return false;
    const periodIndex = after.indexOf('.');
    if (periodIndex < 1 || periodIndex >= after.length - 1)
        return false;
    return true;
}
exports.checkEmail = checkEmail;
