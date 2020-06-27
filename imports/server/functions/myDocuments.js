/**
 * When finding docs, restrict to user documents from collection also include documents from user's group members.
 * Optional tenentId filtered.
 *
 * @memberof Functions:Server
 * @function myDocuments
 * @locus Server
 *
 * @param {Object} obj - MongoDb query object
 * @param {String} user - current logged in user id
 * @param {Array} rolesIn - list of roles that can access docs
 *
 * @return {Object} - modified MongoDb query object
 *
 */


export function myDocuments(obj, user, rolesIn) {

    //* ensure that not-logged-in users can not get at docs.
    if (!user) {
        return null;
    }

    //* get roles information
    let out = null;
    let roles = rolesIn ? rolesIn : [];
    if( !Array.isArray(roles) ){ roles = roles.read; }

    //* check user access
    switch(true){
        case roles.includes("all"):
        case user.admin:
        case user.role && (user.role._id === "administrator"):
            out = obj;
            break;

        case user.role && roles.includes(user.role._id):
            //** modify query to include only my documents
            let addQuery = {};
            let key = roles.includes("author") ? "author" : null;
            if(key){ addQuery[key] = user.author; }

            //** check if multi-tenancy is active and filter based on tenantId
            if (Meteor.settings.multi_tenancy) {
                addQuery.tenantId = user && user.tenantId ? user.tenantId : "general";
            }

            //** check if groups are active and modify query to include members docs
            addQuery = checkGroups(user, key, addQuery);

            out = Object.assign(obj, addQuery);
            break;

        default:
            out = null;
    }

    return out;
}



function checkGroups(user, key, addIt){
    let addQuery = addIt;

    //** modify query to include documents from my group members
    let groupMaster = !!(user.groupMaster);

    if (groupMaster && user.groups && user.groups !== "") {

        let groups = user.groups;
        groups = groups.replace(/\s/g,'').split(",");       // remove all whites spaces and then create item array

        groups = groups.map( function(item){                // add regex strings to match on
            return new RegExp(item, "i");
        });

        let members = Meteor.users.find({groups: {$in: groups}}, {fields: {_id: 1}}).fetch();
        members = members.map( function(item){
            return item._id;
        });

        //*** extend the main query object with the id's of all group members
        addQuery[key] = {$in: members};
    }

    return addQuery;
}
