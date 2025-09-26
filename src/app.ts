import "dotenv/config";
import express, { type Application } from "express";

import { initDb } from "./services/db/mockDb.js";
import { initRoutes } from "./routes/index.js";

import ValidatorUtility from "./utils/Validator.js";
const Validator = new ValidatorUtility();

import RandomIdGenerators from "./utils/RandomIdGenerators.js";
console.log(RandomIdGenerators.genUserId("ms"));

const PORT = process.env.PORT || 3001;

const app: Application = express();

app.use(express.json());

initDb((err: Error, DB: Database) => {
    if (err) return console.error(`${err.name} | ${err.message}`);
    initRoutes(app, DB, Validator);
    app.listen(PORT, () => { console.log(`API is listening on port ${PORT}`) });
});