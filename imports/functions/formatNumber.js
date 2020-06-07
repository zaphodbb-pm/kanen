/**
 * Take a string of digits and convert into a formatted number adjusted by a scaling factor
 *
 * @memberof Functions
 * @function formatNumber
 * @locus Anywhere
 *
 * @param  {Number} num
 * @param {Number} f - scale factor; can be float
 *
 * @return {String} - formatted number scaled by f
 */

import {numString} from "./numString";

export function formatNumber(num, f) {
    let factor = f === undefined ? 1 : f;
    let number = Math.abs(num);

    if (number < 1) {
        number = (parseFloat(num) * factor).toFixed(3)
    }
    if (number >= 1 && number < 10) {
        number = (parseFloat(num) * factor).toFixed(2)
    }
    if (number >= 10 && number < 1000) {
        number = (parseFloat(num) * factor).toFixed(0)
    }
    if (number > 1000) {
        number = numString(Math.round(number))
    }
    return number;
}
