"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
