/**
 * Server side setup of Access Control List for special collections.
 *
 * @memberof Structure:Server
 * @function specialACL
 * @locus Server
 *
 * @returns {Object} accessControl
 */


export const notifications_acl =  {
    notifications: {
        coll: "notifications",
        roles: {
            read: ["all"],
            write: ["none"]
        },

        schemaLong: {
            header: 1,
            title: 1,
            date: 1,
            location: 1,
            msg: 1,
            notifyId:  1,
            itemId: 1,
            timeAgo: 1,
            type: 1,
        }
    }
}
