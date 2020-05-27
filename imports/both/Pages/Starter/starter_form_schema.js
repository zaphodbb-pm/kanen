/**
 * @summary Schema definition object for Starter collection.
 *
 * @memberof Pages:Starter
 * @function starter_form_schema
 * @locus Anywhere
 * @augments starter_page
 *
 * @returns {Array} - array of field configuration objects
 *
 * @example
 * Schema items
 *          name =                  String: name of this document
 *          startNumber =           Number: float set by step attribute and includes min / max boundaries
 *          startInteger =          Number: integer set by step attribute
 *          startSwitch =           Boolean: checkbox as switch
 *          startTextArea =         String: text area characters
 *          startCheckbox =         Array: list of selected checkboxes
 *          startRadios =           String: group of radio buttons set by select array
 *
 *          startDateTime =         String: date derived from pop up calendar
 *          startStaticSelect =     Object: static select option
 *          startDynamicSelect =    Object: select option list derived from a collection
 *          startStaticTypeahead =  Object: similar to select but for long lists
 *          startDynamicTypeahead = Object: similar to dynamic select but for long lists
 *          startColours =          String: group of colour radio buttons set by select array
 *
 *          startEditor =           String: JSON stringified html input
 *          startApiKey =           String: calculates a 32 symbol key
 *          startFile =             Object: encoded file data
 *          startImage =            Object: encoded image data
 *
 *          startRows =             Array: of objects that define a row of inputs
 *          startList =             Array: of text strings
 *          startFieldset =         Array: of objects of input fields
 *          startKanban =           Array: of arrays of objects
 *
 */

import fieldsetConfig from './starter_form_text_fieldset'
import fieldsetRows from "./starter_form_text_rows";


export default [

    {
        // control and decoration for fields in a form
        field: "name",
        fieldType: "input",
        tab: 0,
        group: null,  //group: {section: 2, class: "is-one-quarter"},

        attributes: {type: "text", maxlength: 64},
        params: {},
        optional: false,
        defaultValue: "",
    },

    {
        field: "startNumber",
        fieldType: "input",
        tab: 0,
        group: {section: 0, class: "is-one-half"},

        attributes: {type: "number", min: 9.5, max: 100.5, step: 0.1},
        params: {},

        optional: true,
        defaultValue: 11.0,
    },

    {
        field: "startInteger",
        fieldType: "input",
        tab: 0,
        group: {section: 0, class: "is-one-half"},

        attributes: {type: "number", step: 1},
        params: {},

        optional: true,
        defaultValue: 0,
    },

    /*

    {
        field: "startSwitch",
        fieldType: "switch",
        tab: 0,
        attributes: {},
        params: {},

        optional: true,
        defaultValue: false,
    },

    {
        field: "startTextArea",
        fieldType: "textarea",
        tab: 0,
        attributes: {maxlength: 5000, rows: 3},
        params: {},

        optional: true,
        defaultValue: "",
    },

    {
        field: "startCheckbox",
        fieldType: "checkboxes",
        tab: 0,
        attributes: {},
        params: {cols: 1},

        optional: true,
        defaultValue: [],
    },

    {
        field: "startRadios",
        fieldType: "radios",
        tab: 0,
        attributes: {},
        params: {type: "radios", cols: 2},

        optional: true,
        defaultValue: "",
    },

    {
        field: "startColours",
        fieldType: "colours",
        tab: 0,
        attributes: {type: "text", maxlength: 64},
        params: {},

        optional: true,
        defaultValue: "",
    },


    //** second tabbed set of fields
    {
        field: "startDateTime",
        fieldType: "date",
        tab: 1,
        attributes: {maxlength: 10},
        params: {},

        optional: true,
        defaultValue: "",
    },

    {
        field: "startStaticSelect",
        fieldType: "select",
        tab: 1,
        attributes: {},
        params: {type: "staticSelect", colours: true},

        optional: true,
        defaultValue: {_id: "", name: "", colour: "#FFF"},
    },

    {
        field: "startStaticTypeahead",
        fieldType: "typeahead",
        tab: 1,
        attributes: {},
        params: {type: "staticSelect", rows: 10},

        optional: true,
        defaultValue: {_id: "", name: ""},
    },

    {
        field: "startDynamicSelect",
        fieldType: "select",
        tab: 1,
        attributes: {},
        params: {
            type: "dynamicSelect",
            coll: "circuits",
            filter: {fields: {name: 1}},
            options: {sort: {name: 1}}
        },

        optional: true,
        defaultValue: {_id: "", name: ""},
    },

    {
        field: "startDynamicTypeahead",
        fieldType: "typeahead",
        tab: 1,
        attributes: {},
        params: {
            type: "dynamicSelect",
            rows: 10,
            coll: "circuits",
            filter: {fields: {_id: 1, name: 1}},
            options: {sort: {name: 1}}
        },

        optional: true,
        defaultValue: {_id: "", name: ""},
    },

    //** third tabbed set of fields
    {
        field: "startEditor",
        fieldType: "editor",
        tab: 2,
        attributes: {maxlength: 50000},
        params: {},

        optional: true,
        defaultValue: "",
    },

    {
        field: "hr1",
        fieldType: "hr",
        tab: 2,
        optional: true,
    },

    {
        field: "startApiKey",
        fieldType: "apiKey",
        tab: 2,
        attributes: {},
        params: {length: 24},

        optional: true,
        defaultValue: "",
    },

    {
        field: "startFile",
        fieldType: "fileInput",
        tab: 2,
        attributes: {},
        params: {format: "text", type: ["json", "text.*"]},

        optional: true,
        defaultValue: {name: "", src: ""},
    },

    {
        field: "startImage",
        fieldType: "fileInput",
        tab: 2,
        attributes: {},
        params: {format: "image", type: ["image.*"]},

        optional: true,
        defaultValue: {name: "", src: ""},
    },

    {
        field: "startRows",
        fieldType: "rows",
        tab: 3,
        attributes: {},
        params: fieldsetRows.config,

        optional: true,
        defaultValue: [],
    },

    {
        field: "startList",
        fieldType: "itemList",
        tab: 3,
        attributes: {maxlength: 5000, rows: 2},
        params: {},

        optional: true,
        defaultValue: [],
    },

    {
        field: "startFieldset",
        fieldType: "fieldset",
        tab: 3,
        attributes: {},
        params: fieldsetConfig.config,

        optional: true,
        defaultValue: {},
    },

    {
        field: "startKanban",
        fieldType: "kanban",
        tab: 4,
        attributes: {columns: 7},
        params: {headers: ["To Do", "Doing", "Done", "Waiting"], hdr_id: ["todo", "doing", "done", "waiting"], rows: 1},

        optional: true,
        defaultValue: [[]],
    }

     */
];
