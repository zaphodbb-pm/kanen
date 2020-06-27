/**
 * Provides the MongoDb projection objects for various read requests.
 *
 * @memberof Pages:Users
 * @function users_access_control
 * @locus Server
 *
 * @returns {Object} - access control parameters
 *
 * @example
 *  default object:
 *      coll:           {String} collection name
 *      roles:          {Object} {read: [list of roles], write: [list of roles]}
 *
 *      listShort:      {Object} projections for a reduced list of fields for a simple table
 *      listMedium:     {Object} projections for a reduced list of fields for a component
 *      listLong:       {Object} projections for a reduced list of fields for a component
 *      listFull:       {Object} projections for a full list of fields for a major module
 *
 *      schemaShort:    {Object} projections for a reduced set of fields for a simple component
 *      schemaMedium:   {Object} projections for a reduced set of fields for a component
 *      schemaLong:     {Object} projections for a reduced set of fields for a component
 *      schemaFull:     {Object} projections for a full set of fields for a form
 *
 *      selects:        {Object} projections for a select input field
 *
 * @notes
 *  1. Register this access control at '/imports/server/setupACL.js'
 */

import schema from './users_form_schema';
import list from './users_list'
import {roles} from'./users_nav'

import {fieldAddons} from '/imports/server/fieldAddons'
import {buildAllFields} from '/imports/functions/buildAllFields'

export default {
    users: {
        coll: "users",
        roles: roles,

        listShort: null,
        listMedium: null,
        listLong: null,
        listList: buildAllFields(list.fields, {}),

        schemaShort: null,
        schemaMedium: null,
        schemaLong: null,
        schemaForm: buildAllFields(schema, fieldAddons),

        selects: {
            _id: 1,
            name: 1
        }
    }
}
