"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WSResponse = exports.JSONResponse = void 0;
function JSONResponse(is_ok, error_code = 0, error_message = '', data = {}) {
    const ret_data = {
        is_ok: is_ok,
        error_code: error_code,
        error_message: error_message,
        data: data,
    };
    return JSON.stringify(ret_data);
}
exports.JSONResponse = JSONResponse;
function WSResponse(isOK, message = '', errorMessage = "", data = {}) {
    return JSON.stringify({
        is_ok: isOK,
        message: message,
        error_message: errorMessage,
        data: data
    });
}
exports.WSResponse = WSResponse;
