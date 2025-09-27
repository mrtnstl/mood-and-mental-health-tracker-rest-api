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
    type AppConfig = {
        sinkLogsToConsole: boolean
    }
    /*type logger = {
        ApplicationLogger: Object,
        AccessLogger: Object,
        ErrorLogger: Object
    }*/
}
