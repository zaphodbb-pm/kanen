/**
 * Own version of a character selector in order to build a variable length api key.
 *
 * @memberof Functions
 * @function generateId
 * @locus Anywhere
 *
 * @param {Number} length - length / number of characters for api key
 *
 * @returns {String} - api key of requested length
 */

export function generateId( length ) {
    let choices = "abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let out = [];

    let arr = new Uint8Array(length || 24);
    window.crypto.getRandomValues(arr);

    arr.forEach(function (item) {
        let pos = Math.round(item / 255 * choices.length);
        out.push(choices.charAt(pos));
    });

    return out.join("");
}
