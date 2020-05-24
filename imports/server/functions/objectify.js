/**
 * Builds object from key/value pair.
 *
 * @memberof Functions:Server
 * @function objectify
 * @locus Server
 *
 * @param {String} field - name of object key
 * @param {String|Number|Object|Array} val
 * @return {Object} - {key: val}
 *
 */


export function objectify(field, val) {
    let object = {};
    object[field] = val;
    if(val === 0) {object[field] = {$exists: true};}
    return object;
}
