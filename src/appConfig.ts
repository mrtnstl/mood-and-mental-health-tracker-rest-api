const mode = process.env.MODE;

export default {
    sinkLogsToConsole: mode === "dev" ? true : false
}
