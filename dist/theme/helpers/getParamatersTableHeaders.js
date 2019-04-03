"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const os_1 = require("os");
function getParametersTableHeaders(parameters) {
    let headers = ['Name', 'Type', 'Default value', 'Description'];
    const hasDefaultValues = parameters.find((param) => {
        return param.defaultValue;
    });
    const hasComments = parameters.find((param) => {
        return param.comment;
    });
    if (!hasDefaultValues) {
        headers = headers.filter((header) => {
            return header !== 'Default value';
        });
    }
    else {
        parameters.forEach((param) => {
            param.defaultValue = param.defaultValue ? param.defaultValue : '-';
        });
    }
    if (!hasComments) {
        headers = headers.filter((header) => {
            return header !== 'Description';
        });
    }
    let md = '|';
    headers.forEach((header) => {
        md += ` ${header} |`;
    });
    md += os_1.EOL;
    md += '|';
    headers.forEach(() => {
        md += ` ------ |`;
    });
    return md;
}
exports.getParametersTableHeaders = getParametersTableHeaders;
