"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const os_1 = require("os");
function getCommentTag(tagName, text) {
    let md = `*__${tagName}__*:`;
    if (text.startsWith('\n```')) {
        md = md + os_1.EOL;
    }
    return md;
}
exports.getCommentTag = getCommentTag;
