"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WSResponse = exports.sendIError = exports.JSONResponse = void 0;
const logs_1 = require("../logs/logs");
function JSONResponse(data, error) {
    return JSON.stringify({
        data,
        hasError: Boolean(error),
        error,
    });
}
exports.JSONResponse = JSONResponse;
;
function sendIError(req, res, error, options) {
    (0, logs_1.saveInternalErrorLog)(req, error, options);
    return res.status(500).send(JSONResponse("", "I-E"));
}
exports.sendIError = sendIError;
function WSResponse(isOK, message = '', errorMessage = "", data = {}) {
    return JSON.stringify({
        is_ok: isOK,
        message: message,
        error_message: errorMessage,
        data: data
    });
}
exports.WSResponse = WSResponse;
