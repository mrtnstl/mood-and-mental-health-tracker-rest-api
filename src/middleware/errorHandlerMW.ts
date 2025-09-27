import type { ErrorRequestHandler } from "express";

export default (objectRepository: any): ErrorRequestHandler => {
    const { ErrorLogger } = objectRepository;
    return (err, _req, res, _next) => {
        ErrorLogger.log("-1", err.title, err.message);
        return res.status(500).json({ error: "An error occured! Check error log for further clarification!" });
    }
}