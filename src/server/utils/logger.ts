import type { ObjectId } from "mongoose";

export interface ILog {
    displayName: string;
    priority: number;
    color: string;
}

const lvNone: ILog = { displayName: "NONE", priority: -1, color: "\x1b[97m" };
const lvTrace: ILog = { displayName: "TRACE", priority: 7, color: "\x1b[30m" };
const lvNoDisplay: ILog = { displayName: "NO_DISPLAY", priority: 10, color: "\x1b[97m" };

const lvFull: ILog = { displayName: "FULL", priority: 0, color: "\x1b[35m" };
const lvDebug: ILog = { displayName: "DEBUG", priority: 1, color: "\x1b[32m" };
const lvInfo: ILog = { displayName: "INFO", priority: 4, color: "\x1b[92m" };
const lvLow: ILog = { displayName: "LOW", priority: 2, color: "\x1b[36m" };

const lvWarn: ILog = { displayName: "WARN", priority: 3, color: "\x1b[93m" };
const lvError: ILog = { displayName: "ERROR", priority: 5, color: "\x1b[31m" };
const lvCritical: ILog = { displayName: "CRITICAL", priority: 6, color: "\x1b[95m" };
const lvFatal: ILog = { displayName: "FATAL", priority: 7, color: "\x1b[91m" };

export const logLv = {
    NONE: lvNone,
    FULL: lvFull,
    DEBUG: lvDebug,
    WARN: lvWarn,
    LOW: lvLow,
    INFO: lvInfo,
    ERROR: lvError,
    CRITICAL: lvCritical,
    FATAL: lvFatal,
    TRACE: lvTrace,
    NO_DISPLAY: lvNoDisplay,
};

/**
 * Display a log in the console with formated date, log level, type, message and source
 * It can display somethings like this:
 * `[01/01/2023 16:00:00][INFO ](server) This is a usefull example of log`
 * @param lv level of the log => Displayed if logLevel <= lv
 * @param type of the log, if it's an error, a warning, an info, ...
 * @param message the message to display
 * @param from the source of the log, can be an ObjectId of mongoose or a string
 */
export function formatLog(lv: ILog = logLv.INFO, caller: string, message: string | Object, from: string | ObjectId = "server") {
    const date = new Date();
    if (typeof message != typeof "") message = JSON.stringify(message);
    const logLine = `[${date.toLocaleDateString()} ${date.toLocaleTimeString()}][${lv.displayName.padEnd(10)}]{${caller.padEnd(
        30
    )}}(${from}) ${message}`;
    return logLine;
}

export function getLogLevelFromString(lv: string): ILog {
    let logLvParsed: ILog = logLv.FULL;

    switch (lv.toUpperCase()) {
        case lvNone.displayName: {
            logLvParsed = logLv.NONE;
            break;
        }
        case lvTrace.displayName: {
            logLvParsed = logLv.TRACE;
            break;
        }
        case lvFull.displayName: {
            logLvParsed = logLv.FULL;
            break;
        }
        case lvDebug.displayName: {
            logLvParsed = logLv.DEBUG;
            break;
        }
        case lvInfo.displayName: {
            logLvParsed = logLv.INFO;
            break;
        }
        case lvLow.displayName: {
            logLvParsed = logLv.LOW;
            break;
        }
        case lvWarn.displayName: {
            logLvParsed = logLv.WARN;
            break;
        }
        case lvError.displayName: {
            logLvParsed = logLv.ERROR;
            break;
        }
        case lvCritical.displayName: {
            logLvParsed = logLv.CRITICAL;
            break;
        }
        case lvFatal.displayName: {
            logLvParsed = logLv.FATAL;
            break;
        }
        case lvNoDisplay.displayName: {
            logLvParsed = logLv.NO_DISPLAY;
            break;
        }
    }

    if (lv == lvNone.displayName) logLvParsed = logLv.NONE;
    else if (lv == lvTrace.displayName) logLvParsed = logLv.TRACE;

    return logLvParsed;
}
