/**
 * Server side setup of Access Control List for special collections.
 *
 * @memberof Structure:Server
 * @function specialACL
 * @locus Server
 *
 * @param {Object} - starter_access_control
 * @param {Object} - buildContent_access_control
 * @param {Object} - learn_access_control
 * @param {Object} - pubSub_access_control
 * @param {Object} - users_access_control
 * @param {Object} - logsSystem_access_control
 * @param {Object} - logsUsers_access_control
 *
 * @returns {Object} - accessControl
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
