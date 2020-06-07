/**
 * Round number to specified number of digits; if digits is '0', return an integer.
 *
 * @memberof Functions
 * @function toDecimals
 * @locus Anywhere
 *
 * @param  {Number} number
 * @param  {Number} digits
 *
 * @return {Number} float number to specified number of digits
 */

export function toDecimals(number, digits) {
    number = number ? number : 0;

    if (!digits || digits === 0) {
        return Math.round(number);
    } else {
        return parseFloat(number.toFixed(Math.abs(digits)));
    }
}

