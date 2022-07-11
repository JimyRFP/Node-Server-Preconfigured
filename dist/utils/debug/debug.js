"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.debugMessage = void 0;
function debugMessage(isDebug, message, data = {}) {
    if (!isDebug)
        return;
    let error = new Error();
    let stack = error.stack.split("\n");
    console.log("----DEBUG----" +
        "\nCaller: " + stack[2] +
        "\nMessage: " + message);
}
exports.debugMessage = debugMessage;
