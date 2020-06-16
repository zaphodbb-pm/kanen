/**
 * Configuration list block for LogsUsers page listing.
 *
 * @memberof Pages:LogsUsers
 * @function logsUsers_list
 * @locus Client
 * @augments logsUsers_page
 *
 * @returns {Object} - default = {sort: object, fields: array}
 *
 * @example
 * Typical object structure for listing table
 *      tag =               String: item name with tag applied
 *      author =            String: user id
 *      username =          String: system Meteor username
 *      tenantId =          String: user's company / merchant id
 *      connection =        Object: Meteor's user connection info {id, ipAddr, userAgent, logTime}
 *
 *      updatedAt =         String: unix timestamp converted to time ago format
 *      _id =               String: "del" flag for showing trash can
 *
 */



export default {
    sort: {"updatedAt": -1},

    fields: [
        {
            field: "tag",
            key: "tag",
            type: "tag",
            label: "tbd",
            sort: 1,
            search: true,
        },

        {
            field:  "username",
            key:    "username",
            type:   "text",
            label:  "tbd",
            sort:   1,
            search: true,
        },

        {
            field:  "tenantId",
            key:    "tenantId",
            type:   "text",
            label:  "tbd",
            sort:   1,
            search: true,
        },

        {
            field: "email",
            key: "email",
            type: "text",
            label: "tbd",
            sort: true,
            search: true,
        },

        {
            field: "connection",
            key: "connection",
            type: "object",
            label: "tbd",
            sort: false,
            search: false,
        },

        {
            field: "updatedAt",
            key: "updatedAt",
            type: "timeStamp",
            label: "tbd",
            sort: 1,
            search: true,
            filter: {
                mode: "range"
            }
        },

        {
            field: "_id",
            key: "_id",
            type: "del",
            label: "tbd",
            sort: false,
            search: false,
        }
    ]
}
