"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JSONResponse = JSONResponse;
exports.sendIError = sendIError;
exports.WSResponse = WSResponse;
const logs_1 = require("../logs/logs");
function JSONResponse(data, error) {
    return JSON.stringify({
        data,
        hasError: Boolean(error),
        error,
    });
}
;
function sendIError(req, res, error, options) {
    (0, logs_1.saveInternalErrorLog)(req, error, options);
    return res.status(500).send(JSONResponse("", "I-E"));
}
function WSResponse(isOK, message = '', errorMessage = "", data = {}) {
    return JSON.stringify({
        is_ok: isOK,
        message: message,
        error_message: errorMessage,
        data: data
    });
}
