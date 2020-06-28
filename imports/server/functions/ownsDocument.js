/**
 * Checks if user owns a document.
 *
 * @memberof Functions:Server
 * @function ownsDocument
 * @locus Server
 *
 * @param {Object} user - logged in user info
 * @param {Object} doc - check user against doc author
 *
 * @return {Boolean}
 *
 */


//** check that the user specified owns the documents
export function ownsDocument(user, doc) {
    let out = false;

    if(user){
        out = !!(user.admin || user._id === doc.author);
    }

    return out;
}
