import type { RequestHandler } from "express";

export default (): RequestHandler => {
    return (_req, res, next) => {
        // DUMMY!
        const currentUser: User = { id: "BG329546-2E6FA534", userName: "Bear Grillz", userEmail: "bgrill@mail.com" };
        res.locals.currentUser = currentUser;
        return next();
    }
}