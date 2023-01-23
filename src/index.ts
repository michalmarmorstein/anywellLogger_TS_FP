import _ from 'lodash';
import jsonLogs from '../resources/logs.json';
import { parse } from 'csv-parse';
import * as fs from 'fs';
import * as path from 'path';
import{type LogMessage, type LogReaderCallback, TEXT_WHITE, TEXT_RESET, levelColorMap} from './types'

const jsonReader = (callback: LogReaderCallback) => {
    callback(jsonLogs as unknown as LogMessage[]); //TODO implement async for large data
}

const csvReader = (callback: LogReaderCallback) => {
    const csvFilePath = path.resolve(__dirname, "../resources/logs.csv");
    const headers = ["level", "message"];
    const csvLogs = fs.readFileSync(csvFilePath, { encoding: 'utf-8' }); //TODO implement async for large data
    parse(csvLogs, {
        delimiter: ',',
        columns: headers,
      }, (error, messages: LogMessage[]) => {
        if (error) {
          console.error(error);
        }
        callback(messages);
    });
}

const consoleWriter = (messages: LogMessage[]) => {
    messages.forEach(msg => {
        let color: string = levelColorMap.get(msg.level) || TEXT_WHITE;
        console.log(color + msg.level + ": " + msg.message + TEXT_RESET);
    })
}

const jsonFileWriter = (messages: LogMessage[]) => {
    let grouped = _.groupBy(messages, 'level'); //TODO find a way to map LogMessage to LogMessage.message while grouping by
    let json = JSON.stringify(grouped, null, 2);
    fs.writeFileSync('./output/loggerOut.json', json);
}

jsonReader(consoleWriter);
csvReader(consoleWriter);
// jsonReader(jsonFileWriter);
csvReader(jsonFileWriter);