export const enum LogLevel {
    DEBUG = "DEBUG",
    ERROR = "ERROR",
    WARNING = "WARNING",
    INFO = "INFO"
}

export type LogMessage = {
    level: LogLevel;
    message:string;
}

export type LogReaderCallback = (messages: LogMessage[]) => void;

export const TEXT_WHITE = "\u001B[37m";
export const TEXT_RESET = "\u001B[0m";
const TEXT_RED = "\u001B[31m";
const TEXT_GREEN = "\u001B[32m";
const TEXT_BLUE = "\u001B[34m";
const TEXT_YELLOW = "\u001B[33m";
const TEXT_BLACK = "\u001B[30m";


export const levelColorMap = new Map([
    [LogLevel.DEBUG, TEXT_GREEN],
    [LogLevel.ERROR, TEXT_RED],
    [LogLevel.INFO, TEXT_BLUE],
    [LogLevel.WARNING, TEXT_YELLOW]
  ]);