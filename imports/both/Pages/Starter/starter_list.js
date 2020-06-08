/**
 * Configuration list block for Starter page listing.
 *
 * @memberof Pages:Starter
 * @function starter_list
 * @locus Client
 * @augments starter_page
 *
 * @returns {Object} - default = {sort: object, fields: array}
 *
 * @example
 * Typical object structure for listing table
 *      _id =               String: id for the document in that table row
 *      name =              String: item name
 *      startStaticSelect = Object: option from selector
 *      startDateTime =     String: YYYY-mm-dd format
 *
 *      //updatedAt =         String: unix timestamp converted to time ago format
 *
 */



export default {
    sort: {"sortName": 1, "name": 1},

    fields: [
        {
            field:  "name",
            key:    "name",
            type:   "edit",
            label:  "tbd",
            sort:   1,
            search: true,
        },

        {
            field:  "startStaticSelect",
            key:    "startStaticSelect.name",
            type:   "select",
            label:  "tbd",
            sort:   1,
            search: true,
            filter: {_id: "none", name: "None"}
        },

        {
            field:  "startDateTime",
            key:    "startDateTime",
            type:   "date",
            label:  "tbd",
            sort:   1,
            search: true,
            filter: {
                dateFormat: "d-m-Y",
                mode: "range"
            }
        },

        {
            field:  "geoLocation",
            key:    "geoLocation",
            type:   "address",
            label:  "tbd",
            sort:   false,
            search: true,
            filter: {_id: "none", name: "World Wide"}
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
