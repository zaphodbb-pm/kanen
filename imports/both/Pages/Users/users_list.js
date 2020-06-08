/**
 * Configuration list block for Users page listing.
 *
 * @memberof Pages:Users
 * @function users_list
 * @locus Client
 * @augments users
 *
 * @returns {Object} - default = {sort: object, fields: array}
 *
 * @example
 * Typical object structure for listing table
 *      _id =               String: id for the document in that table row
 *      username =          String: user name
 *      emails.address =    String: user primary email address
 *      tenantId =          String: user belongs to this group
 *      role =              String: user has this role
 *
 *      //updatedAt =       String: unix timestamp converted to time ago format
 *
 */



export default {
    sort: {"sortName": 1, "name": 1},

    fields: [
        {
            field:  "username",
            key:    "username",
            type:   "edit",
            label:  "tbd",
            sort:   1,
            search: true,
        },

        {
            field:  "emails",
            key: "emails.0.address",
            type:   "text",
            label: "tbd",
            sort:   1,
            search: true,
        },

        {
            field: "tenantId",
            key: "tenantId",
            type: "text",
            label: "tbd",
            sort: 1,
            search: true,
        },

        {
            field: "role",
            key:    "role.name",
            type:   "text",
            label: "tbd",
            sort:   1,
            search: true,
        },

        {
            field:  "_id",
            key:    "_id",
            type:   "del",
            label:  "tbd",
            sort:   false,
            search: false,
        },
    ]
}
