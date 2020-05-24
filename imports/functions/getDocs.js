/**
 * @summary Abstracts the database get of documents.
 *
 * @memberof Functions
 * @function getDocs
 * @locus Client
 *
 * @param {String} coll - name of collection to get data from
 * @param {String} type - type of operation to perform: 'list', 'allFields', 'oneList', 'oneAllFields', 'select', 'content', 'count'
 * @param {Object} search - standard MongoDB query object
 * @param {Object} options - standard MongoDB option add-on
 * @param {String} publish - (optional) session name to send data to
 *
 * @return {Array|Object}
 *
 * @notes
 *   1.  By abstracting the data getting layer, we can adjust for changes to any other database or framework.
 *
 */



export async function getDocs(coll, type, search, options) {
    let out = [];

    //let method = type === "combo" ? "getCollDataCombo" : "getCollData";

    try {
        //out = await Meteor.callPromise(method, coll, type, search, options);

        out = [];

        return out;

    } catch (error) {
        console.warn("getDocs", coll, search, options, publish, error);
        return [];
    }
}
