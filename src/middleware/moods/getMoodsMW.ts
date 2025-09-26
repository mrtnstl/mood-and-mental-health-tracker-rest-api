import type { RequestHandler } from "express"

export default (objectRepository: any): RequestHandler => {
    const { Moods, Validator } = objectRepository;
    return async (_req, res, next) => {
        const { isUndefined } = Validator;

        const userId: string = res.locals.currentUser.id;
        if (isUndefined(typeof userId)) return res.status(401).json({ message: "Unauthorized request!" });

        const usersMoods = Moods.filter((mood: Mood) => mood.userId === userId);

        res.locals.jsonPayload = usersMoods;
        return next();
    }
}