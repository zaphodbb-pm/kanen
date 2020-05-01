/**
 * @summary Add commas to big numbers and returns a string
 *
 * @memberof Functions
 * @function numString
 * @locus Client
 *
 * @param num {Number}
 * @returns {String} - large number with thousands comma
 */

export function numString(num) {
    if (num && _.isNumber(num) && !_.isNaN(num)) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    } else {
        return "0";
    }

}


/**
 * @summary Take a string of digits and convert into a formatted number adjusted by a scaling factor
 *
 * @memberof Functions
 * @function formatNumber
 * @locus Client
 *
 * @param num {Number}
 * @param f {Number} - scale factor; can be float
 * @return {String} - formatted number scaled by f
 */
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


/**
 * @summary Build numbers as fractions; num needs conversion and fraction is 8ths, 4trs, halfs.
 *
 * @memberof Functions
 * @function fractionalNumber
 * @locus Client
 *
 * @param num {Number}
 * @param scale {String} - 'imperial' or 'metric'
 * @return {string} imperial number fraction converted to fractional amount
 */

export function fractionalNumber(num, scale) {
    if (scale === "imperial") {
        let fraction = 8;                               // initialize fraction denominator
        let main = Math.floor(num);                     // figure out how many integer digits are in number
        let r = Math.round((num - main) * 8);           // figure how many eighths are in remainder

        if (!(r % 2)) {                                  // if not odd, then continue to figure what the fraction size is
            r = r / 2;
            fraction = 4;
            if (r === 2) {
                r = 1;
                fraction = 2;
            }
        }
        main = (main === 0) ? "" : main;                // don't display a zero integer
        r = (r === 0) ? "" : r + "/" + fraction;        // don't display a zero fraction
        return main + " " + r;
    }

    return num.toFixed(1);                              // for metric case, make number nice
}

/**
 * @summary Round number to specified number of digits; if digits is '0', return an integer.
 *
 * @memberof Functions
 * @function toDecimals
 * @locus Client
 *
 * @param number {Number}
 * @param digits {Number}
 * @return {Number} float number to specified number of digits
 */

export function toDecimals(number, digits) {
    number = number ? number : 0;

    if (digits === 0) {
        return Math.round(number);
    } else {
        return parseFloat(number.toFixed(Math.abs(digits)));
    }
}

