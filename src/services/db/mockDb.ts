

const DB: Database = {
    Users: [],
    Moods: []
}

export function initDb(cb: Function): void {
    try {
        cb(null, DB);
    } catch (err) {
        cb(err, null);
    }
}