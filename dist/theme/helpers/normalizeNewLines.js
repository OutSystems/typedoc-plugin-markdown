"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const os_1 = require("os");
function normalizeNewLines(text) {
    if (process.platform !== 'win32') {
        return text;
    }
    var newlineRegex = /([^\r])\n/g;
    return text.replace(newlineRegex, "$1" + os_1.EOL);
}
exports.normalizeNewLines = normalizeNewLines;
