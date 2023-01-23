"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.levelColorMap = exports.TEXT_RESET = exports.TEXT_WHITE = void 0;
exports.TEXT_WHITE = "\u001B[37m";
exports.TEXT_RESET = "\u001B[0m";
const TEXT_RED = "\u001B[31m";
const TEXT_GREEN = "\u001B[32m";
const TEXT_BLUE = "\u001B[34m";
const TEXT_YELLOW = "\u001B[33m";
const TEXT_BLACK = "\u001B[30m";
exports.levelColorMap = new Map([
    ["DEBUG" /* LogLevel.DEBUG */, TEXT_GREEN],
    ["ERROR" /* LogLevel.ERROR */, TEXT_RED],
    ["INFO" /* LogLevel.INFO */, TEXT_BLUE],
    ["WARNING" /* LogLevel.WARNING */, TEXT_YELLOW]
]);
