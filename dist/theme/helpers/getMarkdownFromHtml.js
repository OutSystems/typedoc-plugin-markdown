"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TurndownService = require('turndown');
const turndownService = new TurndownService({
    codeBlockStyle: 'fenced',
});
function getMarkdownFromHtml(options) {
    return turndownService.turndown(options.fn(this)).replace(/\\`\\`\\`/g, '```').replace(/\\`/g, '`').replace(/[|]/g, '\\|');
}
exports.getMarkdownFromHtml = getMarkdownFromHtml;