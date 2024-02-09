import type { ObjectId } from "mongoose";
import fs from "fs";

import { type ILog, logLv, formatLog } from "./logger";
import { ConsoleLogger } from "./consolelogger";

const config = useRuntimeConfig();
const logFolder = "." + config.app.baseURL + "logs/";

class FileLogger extends ConsoleLogger {
    private _fileLatestLog: string;
    private static _instance: FileLogger;

    private constructor() {
        super();
        const folderExists = fs.existsSync(logFolder);
        if (!folderExists) {
            fs.mkdir(logFolder, (err) => {
                if (err) throw err;
            });
        }

        this._fileLatestLog = `${logFolder}latest.log`;
        if (!fs.existsSync(this._fileLatestLog)) {
            fs.writeFile(this._fileLatestLog, "", (err) => {
                if (err) throw err;
            });
        } else {
            fs.truncate(this._fileLatestLog, 0, (err) => {
                if (err) throw err;
            });
        }

        this._logLevel = logLv.FULL;
        const servRestart = `${"=".repeat(10)} Server restarted ${"=".repeat(10)}`;
        this.none("log", servRestart);
        this.debug("log", `Log level set to ${this._logLevel.displayName}`);
    }

    static getInstance() {
        if (!FileLogger._instance) {
            FileLogger._instance = new FileLogger();
        }
        return FileLogger._instance;
    }

    override logWriter(lv: ILog = logLv.INFO, caller: string, message: string | Object, from: string | ObjectId = "server") {
        const date = new Date();
        const logLine = formatLog(lv, caller, message, from);

        if (this._logLevel.priority <= lv.priority) {
            console.log(`${lv.color}${logLine}\x1b[0m`);
        }
        const fileLog = `${logFolder}${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}.log`;

        try {
            fs.appendFile(this._fileLatestLog, `${logLine.replaceAll("\n", "")}\n`, { flag: "a" }, (err) => {
                if (err) throw err;
            });
            fs.appendFile(fileLog, `${logLine}\n`, { flag: "a" }, (err) => {
                if (err) {
                    if (err.code === "ENOENT") {
                        fs.mkdir(logFolder, (err) => {
                            throw err;
                        });
                    }
                }
            });
        } catch (err) {
            console.error(err);
        }
    }
}

export const log: FileLogger = FileLogger.getInstance();

function testColor() {
    console.log(
        "\x1b[30m30\x1b[0m " +
            "\x1b[31m31\x1b[0m " +
            "\x1b[32m32\x1b[0m " +
            "\x1b[33m33\x1b[0m " +
            "\x1b[34m34\x1b[0m " +
            "\x1b[35m35\x1b[0m " +
            "\x1b[36m36\x1b[0m " +
            "\x1b[37m37\x1b[0m " +
            "\n" +
            "\x1b[90m90\x1b[0m " +
            "\x1b[91m91\x1b[0m " +
            "\x1b[92m92\x1b[0m " +
            "\x1b[93m93\x1b[0m " +
            "\x1b[94m94\x1b[0m " +
            "\x1b[95m95\x1b[0m " +
            "\x1b[96m96\x1b[0m " +
            "\x1b[97m97\x1b[0m "
    );
    log.none("log", "This is a none log");
    log.full("log", "This is a full log");
    log.debug("log", "This is a debug log");
    log.warn("log", "This is a warning log");
    log.low("log", "This is a low log");
    log.info("log", "This is an info log");
    log.error("log", "This is an error log");
    log.critical("log", "This is a critical log");
    log.fatal("log", "This is a fatal log");
    log.trace("log", "This is a trace log");
}
// testColor();
