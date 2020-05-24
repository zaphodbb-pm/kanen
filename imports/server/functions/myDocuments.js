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


    return {};



    let roles = rolesIn ? rolesIn : [];
    if(!_.isArray(roles) ){ roles = roles.read; }
    let key = roles.includes("author") ? "author" : null;

    //* if collection allows anyone to see the doc, then return doc
    if (roles.includes("all")) {
        return obj;
    }

    //* ensure that not-logged-in users can not get at docs.
    if (!user) {
        return null;
    }

    //* for logged in users, get their profile information
    let mine = Meteor.user();

    //* system level administrators get to see all documents!
    if (mine && mine.admin) {
        return obj;
    }

    //* otherwise do a deeper access check
    if (mine && mine.role) {

        //** ensure that this user has the correct role for these doc types
        if (!roles.includes(mine.role._id)) {
            return null;
        }

        //** "administrator" and "sweatcrew" roles are special cases and gets full access
        if ( ["administrator", "sweatcrew"].includes(mine.role._id) ) {
            return obj;
        }

        //** modify query to include only my documents
        let addQuery = {};
        if(key){ addQuery[key] = user; }

        //** check if multi-tenancy is active and filter based on tenantId
        if (Meteor.settings.multi_tenancy) {
            addQuery.tenantId = mine && mine.tenantId ? mine.tenantId : "general";
        }

        //** modify query to include include documents from my group members
        let groupMaster = !!(mine.groupMaster);

        if (groupMaster && mine.groups && mine.groups !== "") {

            let groups = mine.groups;
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

        return  _.extend(obj, addQuery);
    }
}
