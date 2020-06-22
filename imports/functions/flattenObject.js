/**
 * @summary Flattens a deeply nested object.
 *
 * @memberof Functions
 * @function flattenObject
 * @locus Anywhere
 *
 * @param {Object} obj - deeply nested
 * @return {Object} - flattened to only one level
 *
 */


export function flattenObject(obj) {
    let flat = {};

    for (let i in obj) {

        if(obj[i] !== null && typeof obj[i] === 'object' && !Array.isArray(obj[i])){

            let flatObject = flattenObject(obj[i]);
            for (let x in flatObject) {
                flat[x] = flatObject[x];
            }

        } else {
            flat[i] = obj[i];
        }
    }

    return flat;
}

