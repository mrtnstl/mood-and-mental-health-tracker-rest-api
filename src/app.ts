import "dotenv/config";
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
const ApplicationLogger = new AppLogger();
ApplicationLogger.subscribeToEvent();
const AccessLogger = new AccLogger();
AccessLogger.subscribeToEvent();
const ErrorLogger = new ErrLogger();
ErrorLogger.subscribeToEvent();

AccessLogger.log(); // TODO: test purposes only
ErrorLogger.log(); // TODO: test purposes only

const PORT = process.env.PORT || 3001;

const app: Application = express();

app.use(express.json());

initDb((err: Error, DB: Database) => {
    if (err) return console.error(`${err.name} | ${err.message}`);
    initRoutes(app, DB, Validator, ApplicationLogger, AccessLogger, ErrorLogger);
    app.listen(PORT, () => { ApplicationLogger.log(`started ${RandomIdGenerators.genUserId("mood-and-mental-health-api")} on port ${PORT}`); });
});