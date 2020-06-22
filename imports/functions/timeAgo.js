/**
 * Format time as 'ago' format from now; used by document listing table.
 *
 * @memberof Functions
 * @function timeAgo
 * @locus Anywhere
 *
 * @param {Object} time - Date object
 * @return {string} - relative time from now to 'time'
 *
 */

export function timeAgo(time) {

    time = time ? time : new Date(10000000);                    // make sure that time is defined
    time = time && time.constructor === Object ? time: new Date(time); // convert number to date object

    let now = new Date();
    let seconds =  (now.getTime() - time.getTime());            // milliseconds since last update
    seconds = Math.floor(seconds / 1000);                       // seconds since last update
    let intervalType;

    let interval = Math.floor(seconds / 31536000);              // figure "time ago" values
    if (interval >= 1) {
        intervalType = 'year';
    } else {
        interval = Math.floor(seconds / 2592000);
        if (interval >= 1) {
            intervalType = 'month';
        } else {
            interval = Math.floor(seconds / 86400);
            if (interval >= 1) {
                intervalType = 'day';
            } else {
                interval = Math.floor(seconds / 3600);
                if (interval >= 1) {
                    intervalType = "hour";
                } else {
                    interval = Math.floor(seconds / 60);
                    if (interval >= 1) {
                        intervalType = "minute";
                    } else {
                        interval = seconds;
                        intervalType = "second";
                    }
                }
            }
        }
    }

    if (interval > 1 || interval === 0) {
        intervalType += 's';
    }

    return `${interval} ${intervalType} ago`;
}
