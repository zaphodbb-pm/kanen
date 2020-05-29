/**
 * Build numbers as fractions; num needs conversion and fraction is 8ths, 4trs, halfs.
 *
 * @memberof Functions
 * @function fractionalNumber
 * @locus Client
 *
 * @param  {Number} num
 * @param  {String} scale - 'imperial' or 'metric'
 *
 * @return {string} imperial number fraction converted to fractional amount
 */

export function fractionalNumber(num, scale) {
    if (scale === "imperial") {
        let fraction = 8;                               // initialize fraction denominator
        let main = Math.floor(num);                     // figure out how many integer digits are in number
        let r = Math.round((num - main) * 8);           // figure how many eighths are in remainder

        if (!(r % 2)) {                                 // if not odd, then continue to figure what the fraction size is
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

    return num.toFixed(1);                  // for metric case, make number nice
}
