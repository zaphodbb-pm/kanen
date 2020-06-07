/**
 * Add commas to big numbers and returns a string
 *
 * @memberof Functions
 * @function numString
 * @locus Anywhere
 *
 * @param {Number} num
 * @returns {String} - large number with thousands comma
 */

export function numString(num) {
    if (num && !isNaN(num) && (typeof num === "number")) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    } else {
        return "0";
    }

}
