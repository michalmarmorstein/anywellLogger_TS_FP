"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = __importDefault(require("lodash"));
const logs_json_1 = __importDefault(require("../resources/logs.json"));
const csv_parse_1 = require("csv-parse");
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const types_1 = require("./types");
const jsonReader = (callback) => {
    callback(logs_json_1.default); //TODO implement async for large data
};
const csvReader = (callback) => {
    const csvFilePath = path.resolve(__dirname, "../resources/logs.csv");
    const headers = ["level", "message"];
    const csvLogs = fs.readFileSync(csvFilePath, { encoding: 'utf-8' }); //TODO implement async for large data
    (0, csv_parse_1.parse)(csvLogs, {
        delimiter: ',',
        from_line: 2,
        columns: headers,
    }, (error, messages) => {
        if (error) {
            console.error(error);
        }
        callback(messages);
    });
};
const consoleWriter = (messages) => {
    messages.forEach(msg => {
        let color = types_1.levelColorMap.get(msg.level) || types_1.TEXT_WHITE;
        console.log(color + msg.level + ": " + msg.message + types_1.TEXT_RESET);
    });
};
const jsonFileWriter = (messages) => {
    let grouped = lodash_1.default.groupBy(messages, 'level'); //TODO find a way to map LogMessage to LogMessage.message while grouping by
    let json = JSON.stringify(grouped, null, 2);
    fs.writeFileSync('./output/loggerOut.json', json);
};
jsonReader(consoleWriter);
csvReader(consoleWriter);
// jsonReader(jsonFileWriter);
csvReader(jsonFileWriter);
