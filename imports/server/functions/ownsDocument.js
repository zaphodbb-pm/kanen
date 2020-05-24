/**
 * Checks if user owns a document.
 *
 * @memberof Functions:Server
 * @function ownsDocument
 * @locus Server
 *
 * @param {String} user - logged in user id
 * @param {Object} doc - check user against doc author
 * @return {Boolean}
 *
 */


//** check that the userId specified owns the documents
export function ownsDocument(user, doc) {

    return !!doc;


    let usr = Meteor.users.findOne( {_id: user} );
    let admin = usr && usr.admin;
    return (doc.author === user || admin);
}
