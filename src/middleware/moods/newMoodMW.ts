import type { RequestHandler } from "express";

export default (objectRepository: any): RequestHandler => {
    const { Moods, Validator } = objectRepository;
    return async (req, res, next) => {
        const { timestamp, moodLevel, moodCause } = req.body;
        const { isUndefined } = Validator;

        if (isUndefined(typeof timestamp) || isUndefined(typeof moodLevel) || isUndefined(typeof moodCause))
            return res.status(400).json({ message: "Malformed request!" });

        const userId: string = res.locals.currentUser.id;
        if (isUndefined(typeof userId)) return res.status(400).json({ message: "userId can't be found on res.locals" });

        const moodData: Mood = { userId, timestamp, moodLevel, moodCause };

        Moods.push(moodData);

        res.locals.jsonPayload = { message: `Mood for ${moodData.userId} recorded at ${moodData.timestamp}` };

        return next();
    }
}