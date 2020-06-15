/**
 * Flattens a two level deep array.
 *
 * @memberof Functions
 * @function flattenArray
 * @locus Anywhere
 *
 * @param {Array} arr -array of arrays to flatten into single level
 *
 * @returns {Object}
 *
 */


export function flatten(arr) {
    let flat1 = [].concat.apply([], arr);
    let flat2 = [].concat.apply([], flat1);

    return flat2;
}
