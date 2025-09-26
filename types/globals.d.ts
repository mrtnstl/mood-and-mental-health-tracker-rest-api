export { };

declare global {
    interface Database {
        Users: Array<object>,
        Moods: Array<object>
    }
    interface Mood {
        userId: string,
        timestamp: Date,
        moodLevel: Number,
        moodCause: String
    }
    type User = {
        id: string,
        userName: string,
        userEmail: string,
    }
}
