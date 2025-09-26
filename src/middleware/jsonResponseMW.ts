import type { RequestHandler } from "express";

export default (): RequestHandler => {
    return (_req, res, _next) => {
        return res.status(200).json(res.locals.jsonPayload || null);
    }
}