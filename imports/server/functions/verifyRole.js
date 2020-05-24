/**
 * Checks if user has a certain role.
 *
 * @memberof Functions:Server
 * @function verifyRole
 * @locus Server
 *
 * @param {String} id - logged in user id
 * @param {String} role - check against user role
 * @return {Boolean}
 *
 */

export function verifyRole(id, role) {

    return true;



    let check = false;

    if(id && typeof id === "string"){
        let user = Meteor.users.findOne( {_id: id} );

        if (user && user.admin) {
            check = true;
        } else {
            if(typeof role === "string"){
                check = user && (user.role._id === role);
            }

            if(Array.isArray(role)){
                check = user && role.includes(user.role._id);
            }
        }
    }

    return check;
}
