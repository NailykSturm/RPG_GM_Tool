import type { ObjectId } from "mongoose";

import { type ILog, logLv, formatLog, getLogLevelFromString } from "./logger";
const config = useRuntimeConfig();

/**
 * Logger only for the console
 * Can be extended to add a file logger
 */
export class ConsoleLogger {
    protected _logLevel: ILog;

    get logLevel() {
        return this._logLevel;
    }
    set logLevel(lv: ILog) {
        this._logLevel = lv;
    }

    constructor() {
        this._logLevel = logLv.NONE;
        this.setLogLvFromEnv();
    }
    protected logWriter(lv: ILog = logLv.INFO, caller: string, message: string | Object, from: string | ObjectId = "server") {
        if (this._logLevel.priority <= lv.priority) {
            const logLine = formatLog(lv, caller, message, from);
            console.log(`${lv.color}${logLine}\x1b[0m`);
        }
    }

    setLogLvFromEnv() {
        this._logLevel = getLogLevelFromString(config.LOG_LEVEL ?? "FULL");
    }
    none(caller: string, message: string | Object, from: string | ObjectId = "server") {
        this.logWriter(logLv.NONE, caller, message, from);
    }
    full(caller: string, message: string | Object, from: string | ObjectId = "server") {
        this.logWriter(logLv.FULL, caller, message, from);
    }
    debug(caller: string, message: string | Object, from: string | ObjectId = "server") {
        this.logWriter(logLv.DEBUG, caller, message, from);
    }
    warn(caller: string, message: string | Object, from: string | ObjectId = "server") {
        this.logWriter(logLv.WARN, caller, message, from);
    }
    low(caller: string, message: string | Object, from: string | ObjectId = "server") {
        this.logWriter(logLv.LOW, caller, message, from);
    }
    info(caller: string, message: string | Object, from: string | ObjectId = "server") {
        this.logWriter(logLv.INFO, caller, message, from);
    }
    error(caller: string, message: string | Object, from: string | ObjectId = "server") {
        this.logWriter(logLv.ERROR, caller, message, from);
    }
    critical(caller: string, message: string | Object, from: string | ObjectId = "server") {
        this.logWriter(logLv.CRITICAL, caller, message, from);
    }
    fatal(caller: string, message: string | Object, from: string | ObjectId = "server") {
        this.logWriter(logLv.FATAL, caller, message, from);
    }
    trace(caller: string, message: string | Object, from: string | ObjectId = "server") {
        this.logWriter(logLv.TRACE, caller, message, from);
    }
}

export const consoleLogger = new ConsoleLogger();
