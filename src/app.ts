import "dotenv/config";
import appConfig from "./appConfig.js";

import express, { type Application } from "express";
import { initDb } from "./services/db/mockDb.js";
import { initRoutes } from "./routes/index.js";

// init Validator class
import ValidatorUtility from "./utils/Validator.js";
const Validator = new ValidatorUtility();

// init RandomIdGenerators class
import RandomIdGenerators from "./utils/RandomIdGenerators.js";

// import loggers
import { ApplicationLogger as AppLogger, AccessLogger as AccLogger, ErrorLogger as ErrLogger } from "./services/Logger.js";
// init loggers and subscribe to events
const ApplicationLogger = new AppLogger(appConfig);
ApplicationLogger.subscribeToEvent("applog", "application_log");
const AccessLogger = new AccLogger(appConfig);
AccessLogger.subscribeToEvent("accesslog", "access_log");
const ErrorLogger = new ErrLogger(appConfig);
ErrorLogger.subscribeToEvent("errlog", "error_log");

AccessLogger.log("127.0.0.1", "null", "null", "000", "0", "none"); // TODO: test purposes only
ErrorLogger.log("-1", "test", "test"); // TODO: test purposes only

const PORT = process.env.PORT || 3001;

const app: Application = express();

app.use(express.json());

initDb((err: Error, DB: Database) => {
    if (err) return console.error(`${err.name} | ${err.message}`);
    initRoutes(app, DB, Validator, ApplicationLogger, AccessLogger, ErrorLogger);
    app.listen(PORT, () => { ApplicationLogger.log(`started ${RandomIdGenerators.genUserId("mood-and-mental-health-api")} on port ${PORT}`); });
});