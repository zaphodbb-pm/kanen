/**
 * Helper to build a projection object from a schema or list object.
 *
 * @memberof Functions
 * @function buildAllFields
 * @locus Anywhere
 *
 * @param {Array} schema - form schema array of field objects from a page
 * @param {Object} options - additional field projection to add to base schema
 *
 * @return {Object} - projection object for all fields for a collection
 *
 */


export function buildAllFields(schema, options) {
    let out = null;

    if ( schema && Array.isArray(schema) ) {

        let af = {};
        schema.forEach(function (s) {
            if (s.fieldType !== "hr" && s.field !== "_id") {
                af[s.field] = 1;
            }
        });

        out = Object.assign(af, options);
    }

    return out;
}
