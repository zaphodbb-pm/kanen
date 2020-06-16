/**
 * Writes a log to a collection.
 *
 * @memberof Functions:Server
 * @function writeLog
 * @locus Server
 *
 * @param {String} logName
 * @param {Object} data
 *
 * @return nothing - writes log to collection
 *
 */

export function writeLog(logName, data) {
    let status = null;

    let now = new Date();
    let dateParts = {
        year: now.getFullYear(),
        month: now.getMonth(),
        date: now.getDate(),
        day: now.getDay(),
        hour: now.getHours()
    };

    let doc = {
        tag: logName,
        createdAt: now,
        timeStamp: now.getTime(),
        date: dateParts,

        data: data
    };

    switch (true) {

        case logName === "LogsUser":
            status = {status: 200, msg: "Successful log write", log: logName};
            LogsUser.insert(doc);
            break;

        case  logName === "LogsSystem":
            status = {status: 200, msg: "Successful log write", log: logName};
            LogsSystem.insert(doc);
            break;

        case logName === "LogsSensor":
            status = {status: 200, msg: "Successful log write", log: logName};
            LogsSensor.insert(doc);
            break;

        default:
            status = {status: 400, msg: "Invalid collection to write to", log: logName};
            console.log("writeLog default", status, doc);
    }

    return status;
}
