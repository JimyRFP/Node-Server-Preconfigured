"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.debugMessage = debugMessage;
function debugMessage(isDebug, message, data = {}) {
    if (!isDebug)
        return;
    let error = new Error();
    let stack = error.stack.split("\n");
    let addData = data.data ? JSON.stringify(data.data) : "";
    console.log("----DEBUG----" +
        "\nCaller: " + stack[2] +
        "\nMessage: " + message +
        (addData ? "\naddData: " + addData : ""));
}
