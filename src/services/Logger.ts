/**
 * text logger for application logs, access logs and error logs
 * separator: semicolon(;)
 * 
 * application log should contain: timestamp, application event(startup, shutdown), os data
 * access log should contain: timestamp, client IP, HTTP method, URI, response code, latency, user agent
 * error log should contain: timestamp, error code, error type/name, error message
 */
import EventEmitter from "node:events";
import { appendFile } from "node:fs/promises";
import path from "node:path";
import os from "node:os";

class Logger extends EventEmitter {
    protected logsDir: string;
    protected sinkLogsToConsole: boolean = false;
    constructor(appConfig: AppConfig) {
        super();
        this.logsDir = process.env.LOGS_DIR || path.resolve(process.cwd(), "logs");
        this.sinkLogsToConsole = appConfig.sinkLogsToConsole;
    }
}

class ApplicationLogger extends Logger {
    constructor(appConfig: AppConfig) {
        super(appConfig);
    }
    log(event: string) {
        const timestamp = new Date;
        const logBody = `${timestamp.toISOString()};${event};${os.platform()}/${os.type()}/${os.release()} ${os.arch()} ${os.hostname()} ${(os.freemem() / (1024 * 1024 * 1024)).toFixed(2)}GB/${(os.totalmem() / (1024 * 1024 * 1024)).toFixed(2)}GB\n`;
        this.emit("applog", logBody);
    }
    subscribeToEvent() {
        this.on("applog", log => {
            this.sinkLogsToConsole && console.log(log); // TODO: app config should determine if loggers sink to console or not
            appendFile(`${this.logsDir}/application_log.txt`, log);
        })
    }
}
class AccessLogger extends Logger {
    constructor(appConfig: AppConfig) {
        super(appConfig);
    }
    log() { // TODO: finish this
        this.emit("accesslog", "access log placeholder");
    }
    subscribeToEvent() {
        this.on("accesslog", log => {
            this.sinkLogsToConsole && console.log(log);
            appendFile(`${this.logsDir}/access_log.txt`, log);
        })
    }
}
class ErrorLogger extends Logger {
    constructor(appConfig: AppConfig) {
        super(appConfig);
    }
    log(code: string, type: string, message: string) {
        const timestamp = new Date;
        const logBody = `${timestamp.toISOString()};${code};${type};${message}\n`;
        this.emit("errlog", logBody);
    }
    subscribeToEvent() {
        this.on("errlog", log => {
            this.sinkLogsToConsole && console.log(log);
            appendFile(`${this.logsDir}/error_log.txt`, log);
        })
    }
}

export { ApplicationLogger, AccessLogger, ErrorLogger };