"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function removeNewLines(text) {
    return text.replace(/\r\n/g, ' ').replace(/\n/g, ' ');
}
exports.removeNewLines = removeNewLines;
