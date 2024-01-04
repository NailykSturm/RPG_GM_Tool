import { ObjectId } from 'mongoose';
import fs from 'fs';

const config = useRuntimeConfig();
const logFolder = '.' + config.app.baseURL + 'logs/';

interface ILog {
    displayName: string;
    priority: number;
    color: string;
}

const lvNone: ILog = { displayName: 'NONE', priority: -1, color: '\x1b[0m' };
const lvTrace: ILog = { displayName: 'TRACE', priority: 7, color: '\x1b[33m' };

const lvFull: ILog = { displayName: 'FULL', priority: 0, color: '\x1b[35m' };
const lvDebug: ILog = { displayName: 'DEBUG', priority: 1, color: '\x1b[34m' };
const lvInfo: ILog = { displayName: 'INFO', priority: 4, color: '\x1b[36m' };
const lvLow: ILog = { displayName: 'LOW', priority: 3, color: '\x1b[37m' };

const lvWarn: ILog = { displayName: 'WARN', priority: 2, color: '\x1b[93m' };
const lvError: ILog = { displayName: 'ERROR', priority: 5, color: '\x1b[91m' };
const lvCritical: ILog = { displayName: 'CRITICAL', priority: 6, color: '\x1b[94m' };
const lvFatal: ILog = { displayName: 'FATAL', priority: 7, color: '\x1b[95m' };

const logLv = {
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
function logWriter(lv: ILog = logLv.INFO, caller: string, message: string | Object, from: string | ObjectId = 'server') {
    const date = new Date();
    if (typeof message != typeof '') message = JSON.stringify(message);
    const logLine = `[${date.toLocaleDateString()} ${date.toLocaleTimeString()}][${lv.displayName.padEnd(10)}]{${caller.padEnd(
        30
    )}}(${from}) ${message}`;
    if (logLevel.priority <= lv.priority && lv != logLv.NONE) {
        console.log(`${lv.color}${logLine}\x1b[0m`);
    }

    const fileLog = `${logFolder}${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}.log`;

    fs.appendFile(fileLatestLog, `${logLine.replaceAll('\n', '')}\n`, { flag: 'a' }, (err) => {
        if (err) throw err;
    });
    fs.appendFile(fileLog, `${logLine}\n`, { flag: 'a' }, (err) => {
        if (err) {
            if (err.code === 'ENOENT') {
                fs.mkdir(logFolder, (err) => {
                    throw err;
                });
            }
        }
    });
}

// function logTrace(message: Object) {
//     const date = new Date();
//     const str = JSON.stringify(message);
//     const fileLog = `${logFolder}${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}.log`;

//     console.log(lvTrace.color, str, '\x1b[0m');
//     fs.appendFile(fileLatestLog, str + '\n', { flag: 'a' }, (err) => { if (err) throw err; });
//     fs.appendFile(fileLog, str + '\n', { flag: 'a' }, (err) => {
//         if (err) {
//             if (err.code === 'ENOENT') {
//                 fs.mkdir(logFolder, (err) => { throw err; });
//             }
//         }
//     });
// }

class Log {
    private static instance: Log;
    private constructor() {}

    static getInstance() {
        if (!Log.instance) {
            Log.instance = new Log();
        }
        return Log.instance;
    }

    none(caller: string, message: string | Object, from: string | ObjectId = 'server') {
        logWriter(logLv.NONE, caller, message, from);
    }
    full(caller: string, message: string | Object, from: string | ObjectId = 'server') {
        logWriter(logLv.FULL, caller, message, from);
    }
    debug(caller: string, message: string | Object, from: string | ObjectId = 'server') {
        logWriter(logLv.DEBUG, caller, message, from);
    }
    warn(caller: string, message: string | Object, from: string | ObjectId = 'server') {
        logWriter(logLv.WARN, caller, message, from);
    }
    low(caller: string, message: string | Object, from: string | ObjectId = 'server') {
        logWriter(logLv.LOW, caller, message, from);
    }
    info(caller: string, message: string | Object, from: string | ObjectId = 'server') {
        logWriter(logLv.INFO, caller, message, from);
    }
    error(caller: string, message: string | Object, from: string | ObjectId = 'server') {
        logWriter(logLv.ERROR, caller, message, from);
    }
    critical(caller: string, message: string | Object, from: string | ObjectId = 'server') {
        logWriter(logLv.CRITICAL, caller, message, from);
    }
    fatal(caller: string, message: string | Object, from: string | ObjectId = 'server') {
        logWriter(logLv.FATAL, caller, message, from);
    }
    trace(caller: string, message: string | Object, from: string | ObjectId = 'server') {
        logWriter(logLv.TRACE, caller, message, from);
    }
}

export const log: Log = Log.getInstance();

const folderExists = fs.existsSync(logFolder);
if (!folderExists) {
    fs.mkdir(logFolder, (err) => {
        if (err) throw err;
    });
}

const fileLatestLog = `${logFolder}latest.log`;
if (!fs.existsSync(fileLatestLog)) {
    fs.writeFile(fileLatestLog, '', (err) => {
        if (err) throw err;
    });
} else {
    fs.truncate(fileLatestLog, 0, (err) => {
        if (err) throw err;
    });
}

const logLevel = logLv.FULL;
const servRestart = `${'='.repeat(10)} Server restarted ${'='.repeat(10)}`;
log.none('log', servRestart);
log.debug('log', `Log level set to ${logLevel.displayName}`);

// for (let lv in logLv){
//     log(logLv[lv as keyof typeof logLv], 'log', `This is a ${lv} log`);
// }

// console.log('\x1b[30m30\x1b[0m')
// console.log('\x1b[31m31\x1b[0m')
// console.log('\x1b[32m32\x1b[0m')
// console.log('\x1b[33m33\x1b[0m')
// console.log('\x1b[34m34\x1b[0m')
// console.log('\x1b[35m35\x1b[0m')
// console.log('\x1b[36m36\x1b[0m')
// console.log('\x1b[37m37\x1b[0m')
// console.log('\x1b[90m90\x1b[0m')
// console.log('\x1b[91m91\x1b[0m')
// console.log('\x1b[92m92\x1b[0m')
// console.log('\x1b[93m93\x1b[0m')
// console.log('\x1b[94m94\x1b[0m')
// console.log('\x1b[95m95\x1b[0m')
// console.log('\x1b[96m96\x1b[0m')
// console.log('\x1b[97m97\x1b[0m')
