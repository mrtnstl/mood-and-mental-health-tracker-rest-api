import type { RequestHandler } from "express"

export default (objectRepository: any): RequestHandler => {
    const { Moods } = objectRepository;
    return async (req, res, next) => {
        const { targetWeek, targetMonth } = req.body;
        if (typeof targetWeek == "undefined" || typeof targetMonth == "undefined") return res.status(400).json({ message: "Malformed input!" });

        // TODO: move this into separate MW
        const userId: string = res.locals.currentUser.id;
        if (typeof userId === "undefined") return res.status(401).json({ message: "Unauthorized request!" });

        const usersMoods = Moods.filter((mood: { userId: string; }) => {
            return mood.userId === userId;
        });

        if (!usersMoods.length) return next();

        // TODO: count stats

        const stats = {
            statsOfWeek: "0",
            statsOfMonth: "0"
        }

        res.locals.jsonPayload = stats;
        return next();
    }
}