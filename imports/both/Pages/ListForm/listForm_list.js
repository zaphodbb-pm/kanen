/**
 * Configuration list block for ListForm listing table page.
 *
 * @memberof Pages:ListForm
 * @function listForm_list
 * @locus Client
 * @augments listForm
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
import listText from './listForm_text'

let text = i18n(listText, "list", getLang());

export default {
    sort: {"sortName": 1, "name": 1},

    fields: [
        {
            field:  "name",
            key:    "name",
            type:   "edit",
            label: text.name.label,
            sort:   1,
            search: true,
        },

        {
            field:  "updatedAt",
            key:    "updatedAt",
            type:   "text",
            label:  text.updatedAt.label,
            sort:   1,
            search: true,
        },

        {
            field:  "_id",
            key:    "_id",
            type:   "del",
            label:  text.del.label,
            sort:   false,
            search: false,
        },
    ]
}
