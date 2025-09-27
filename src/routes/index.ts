import type { Application } from "express";

// auth middleware
import verifyTokenMW from "../middleware/auth/verifyTokenMW.js";
// moods middleware
import newMoodMW from "../middleware/moods/newMoodMW.js";
import getMoodsMW from "../middleware/moods/getMoodsMW.js";
// other middleware
import jsonResponseMW from "../middleware/jsonResponseMW.js";
import wildcardMW from "../middleware/wildcardMW.js";
import errorHandlerMW from "../middleware/errorHandlerMW.js";

export function initRoutes(app: Application, DB: Database, Validator: Object, ApplicationLogger: Object, AccessLogger: Object, ErrorLogger: Object) {
    const { Users, Moods } = DB;
    const objectRepository: any = {
        Users, Moods,
        Validator, ApplicationLogger, AccessLogger, ErrorLogger
    };

    // TODO: rate limiting middleware on login route

    // moods routes
    app.post("/moods",
        verifyTokenMW(),
        newMoodMW(objectRepository),
        jsonResponseMW()
    );
    app.get("/moods",
        verifyTokenMW(),
        getMoodsMW(objectRepository),
        jsonResponseMW()
    )

    // wildcard route
    app.use(wildcardMW());

    app.use(errorHandlerMW(objectRepository));
}