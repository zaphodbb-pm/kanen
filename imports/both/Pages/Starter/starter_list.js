/**
 * Configuration list block for Starter page listing.
 *
 * @memberof Pages:Starter
 * @function starter_list
 * @locus Client
 * @augments starter_page
 *
 * @returns {Object} fields
 *
 * @example
 * Typical object structure for listing table
 *      _id =               String: id for the document in that table row
 *      name =              String: item name
 *      updatedAt =         String: unix timestamp converted to time ago format
 *
 */


import {getLang} from '/imports/functions/getLang'
import {i18n} from '/imports/functions/i18n'
import listText from './starter_page_text'

let text = i18n(listText, "list", getLang());

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
            field:  "updatedAt",
            key:    "updatedAt",
            type:   "text",
            label:  "tbd",
            sort:   1,
            search: true,
        },

        {
            field:  "classDays",
            key: "classDays",
            type: "byDayOfWeek",
            label: "",
            filter: "",
            sort: false,
            search: false,
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
