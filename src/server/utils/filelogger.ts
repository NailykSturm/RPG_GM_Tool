import type { ObjectId } from "mongoose";
import fs from "fs";

import { type ILog, logLv, formatLog } from "./logger";
import { ConsoleLogger } from "./consolelogger";

const config = useRuntimeConfig();
const baseLogFolder = "." + config.app.baseURL + "logs/";
let logFolder = baseLogFolder;

class FileLogger extends ConsoleLogger {
    private _fileLatestLog: string;
    private static _instance: FileLogger;

    private constructor() {
        super();
        this.checkFolderAndCreateIfNotExists(baseLogFolder);

        const date = new Date();
        const testEnv = config.ENV.toUpperCase() === "TEST";
        if (testEnv) {
            logFolder += "test/";
            this.checkFolderAndCreateIfNotExists(logFolder);
        }
        logFolder += `${date.getFullYear()}/`;
        this.checkFolderAndCreateIfNotExists(logFolder);
        logFolder += `${date.getMonth() + 1}/`;
        this.checkFolderAndCreateIfNotExists(logFolder);

        this._fileLatestLog = `${baseLogFolder}latest${testEnv ? "_test" : ""}.log`;
        if (!fs.existsSync(this._fileLatestLog)) {
            fs.writeFile(this._fileLatestLog, "", (err) => {
                if (err) throw err;
            });
        } else {
            fs.truncate(this._fileLatestLog, 0, (err) => {
                if (err) throw err;
            });
        }

        this.moveLogFiles();

        this.none("log", `${"=".repeat(10)} Server restarted ${"=".repeat(10)}`);
        this.info("log", `Log level set to ${this._logLevel.displayName}`);
        this.info("log", `Server environment: ${config.ENV}`);
    }

    /**
     * Verify if the folder exists and create it if it doesn't
     * @param folder the path of the folder to check
     */
    private checkFolderAndCreateIfNotExists(folder: string) {
        let folderExists = fs.existsSync(folder);
        if (!folderExists) {
            fs.mkdir(folder, (err) => {
                if (err) throw err;
            });
        }
    }

    /**
     * Move all log files from the base log folder into a folder with the year and a subfolder with the month of the log
     */
    private moveLogFiles() {
        const baseLogFolder = `.${config.app.baseURL}logs/`;

        const files = fs.readdirSync(baseLogFolder);
        const fileNameRegex = /(\d{4})-(\d{1,2})-(\d{1,2}).log/;
        files.forEach((file) => {
            if (!file.startsWith("latest")) {
                const match = file.match(fileNameRegex);
                if (match) {
                    const year = match[1];
                    const month = match[2];

                    let logFolder = `${baseLogFolder}${year}/`;
                    this.checkFolderAndCreateIfNotExists(logFolder);
                    logFolder += `${month}/`;
                    this.checkFolderAndCreateIfNotExists(logFolder);

                    const oldPath = `${baseLogFolder}${file}`;
                    const newPath = `${logFolder}${file}`;
                    fs.rename(oldPath, newPath, (err) => {
                        if (err) throw err;
                    });
                }
            }
        });
    }

    /**
     * Get the instance of the FileLogger because it's a singleton to avoid multiple file access
     * @returns the instance of the FileLogger
     */
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
