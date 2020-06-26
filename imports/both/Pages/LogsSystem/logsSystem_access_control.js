/**
 * Provides the MongoDb projection objects for various read requests.
 *
 * @memberof Pages:LogsSystem
 * @function logsSystem_access_control
 * @locus Server
 *
 * @returns {Object} - access control parameters
 *
 */


import list from './logsSystem_list'
import {roles} from'./logsSystem_nav'

import {buildAllFields} from '/imports/functions/buildAllFields'

export default {
    logsSystem: {
        coll: "logsSystem",
        roles: roles,

        listShort: null,
        listMedium: null,
        listLong: null,
        listList: buildAllFields(list.fields, {}),

        schemaShort: null,
        schemaMedium: null,
        schemaLong: null,
        schemaForm: null,

        selects: null
    }
}
