import type { RequestHandler } from "express";

export default (): RequestHandler => {
    return (_req, res, _next) => {
        return res.status(404).json({ message: "Not Found!" });
    }
}