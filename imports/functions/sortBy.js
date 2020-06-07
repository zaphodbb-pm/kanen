/**
 * Sort an array of objects by key and direction.
 *
 * @memberof Functions
 * @function sorBy
 * @locus Anywhere
 *
 * @param {Array} inList - list of objects
 * @param {Array} key - key name
 * @param {Number} sortDir - -1: sort descending; else sort ascending
 *
 * @returns {Object}
 *
 */


import {deepClone} from "./deepClone";

export function sortBy( inList, key, sortDir ) {
    let list = deepClone(inList);
    let dir = sortDir && sortDir === -1 ? -1 : 1;

    list.sort((a, b) => (a[key] > b[key]) ? dir : -1 * dir)

    return list;
}
