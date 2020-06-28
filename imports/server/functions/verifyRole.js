/**
 * Checks if user has a certain role.
 *
 * @memberof Functions:Server
 * @function verifyRole
 * @locus Server
 *
 * @param {Object} user - logged in user id
 * @param {Object|Array} rolesIn - check against user role
 *
 * @return {Boolean}
 *
 */

export function verifyRole(user, rolesIn) {
    let check = false;

    //** verify that user has required role in order to store a document
    if(user){
        //*** get roles information
        let roles = rolesIn ? rolesIn : [];
        if( !Array.isArray(roles) ){ roles = roles.write; }

        switch(true){
            case !!user.admin:
                check = true;
                break;

            case !!(user.role && user.role._id):
                check = roles.includes(user.role._id);
                break;
        }
    }

    return check;
}
