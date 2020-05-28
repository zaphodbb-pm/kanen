/**
 * Deep clones an object or array.
 *
 * @memberof Functions
 * @function deepClone
 * @locus Client
 *
 * @param {Object|Array} inObject
 *
 * @returns {Object} - independent clone of input object
 *
 */


export function  deepClone(inObject){
    let outObject, value, key

    if (typeof inObject !== "object" || inObject === null) {
        return inObject // Return the value if inObject is not an object
    }

    // Create an array or object to hold the values
    outObject = Array.isArray(inObject) ? [] : {}

    for (key in inObject) {
        value = inObject[key]

        // Recursively (deep) copy for nested objects, including arrays
        outObject[key] = deepClone(value)
    }

    return outObject
}
