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
 *          startEmail =            String: email entry with validation
 *          startPhone =            String: tel entry with validation
 *          startPassword =         String: password entry with validation
 *          startTextArea =         String: text area characters
 *          hr1 =                   None: divider for fields in a tab
 *          startSwitch =           Boolean: checkbox as switch
 *          startCheckbox =         Array: list of selected checkboxes
 *          startRadios =           String: group of radio buttons set by select array
 *
 *          startDateTime =         String: date derived from pop up calendar
 *          startStaticSelect =     Object: static select option
 *          startDynamicSelect =    Object: select option list derived from a collection
 *          startStaticTypeahead =  Object: similar to select but for long lists
 *          startDynamicTypeahead = Object: similar to dynamic select but for long lists
 *          startGeoAddress =       Object: user entered address fragment is autocompleted by Google maps
 *
 *          startApiKey =           String: calculates a 32 symbol key
 *          startFile =             Object: encoded file data
 *          startImage =            Object: encoded image data
 *          startColours =          String: group of colour radio buttons set by select array
 *
 *          startList =             Array: of text strings
 *          startRows =             Array: of objects that define a row of inputs
 *          startEditor =           String: JSON stringified html input
 *
 * Config Object:
 *              field: "startDynamicSelect",        String: field name in database
 *              fieldType: "select",                String: see fieldWrapper notes
 *              optional: true,                     Boolean: if false, forces user entry to present in order to submit form
 *
 *              adjustLabel: true,                  Boolean: (optional) shifts label right to accommodate button add-on
 *              group: {                            Object: (optional) allows formTabFields to create horizontal group of fields
 *                  section: 0,
 *                  class: "is-two-thirds"
 *              },
 *              tab: 1,                             Number: (optional) displays field in selected form tab set by formTabFields
 *              attributes: {},                     Object: adds attributes to html tags such as 'input'
 *              params: {                           Object: (optional) extra config for complex components
 *                  type: "dynamicSelect",
 *                  coll: "starter",
 *                  filter: {fields: {name: 1}},
 *                  options: {sort: {name: 1}}
 *              },
 *              defaultValue: {_id: "", name: ""},  {Object|String|Number} submit adds values if no user entry
 *
 *              css: "is-fullwidth",                String: (optional) adds css to fieldWrapper
 *              listen: {src, key, value}           Object: {src: <fieldName>, key: watching object -> <keyName>, value: <trigger value>}
 *              role: ["admin]                      Array: list of user role strings that can see this field
 *
 *
 */

import fieldsetRows from "./starter_form_config_rows";


export default [

    //** first tab for basic fields
    {
        // control and decoration for fields in a form
        field: "name",
        fieldType: "input",
        optional: false,

        tab: 0,
        group: null,  //group: {section: 2, class: "is-one-quarter"},

        attributes: {type: "text", maxlength: 64},
        params: {},
        defaultValue: "",
    },

    {
        field: "startNumber",
        fieldType: "input",
        optional: true,

        tab: 0,
        group: {section: 0, class: "is-two-thirds"},

        attributes: {type: "number", min: 9.5, max: 100.5, step: 0.1},
        params: {},
        defaultValue: 11.0,
    },

    {
        field: "startInteger",
        fieldType: "input",
        optional: true,

        tab: 0,
        group: {section: 0, class: "is-one-third"},

        attributes: {type: "number", step: 1},
        params: {},
        defaultValue: 0,
    },

    {
        field: "startEmail",
        fieldType: "input",
        optional: true,
        group: {section: 1},
        tab: 0,

        attributes: {type: "email"},
        params: {},
        defaultValue: "",
    },

    {
        field: "startPhone",
        fieldType: "input",
        optional: true,
        group: {section: 1},
        tab: 0,

        //** src = field to watch;
        //** key = if watched field returns an object, then look at key:value
        //** value = value to trigger on;  allows select box to drive listeners
        listen: {src: "startEmail", key: null, value: ""},

        attributes: {type: "tel"},
        params: {},
        defaultValue: "",
    },

    {
        field: "startPassword",
        fieldType: "input",
        optional: true,
        tab: 0,

        attributes: {type: "password"},
        params: {},
        defaultValue: "",
    },

    {
        field: "startTextArea",
        fieldType: "textarea",
        optional: true,
        tab: 0,
        attributes: {maxlength: 5000, rows: 3},
        params: {},
        defaultValue: "",
    },

    {
        field: "hr1",
        fieldType: "hr",
        optional: true,
        tab: 0,
    },

    {
        field: "startSwitch",
        fieldType: "switch",
        optional: true,

        tab: 0,
        group: {section: 2, class: ""},
        attributes: {},
        params: {},
        defaultValue: false,
    },

    {
        field: "startCheckItem",
        fieldType: "switch",
        optional: true,

        tab: 0,
        group: {section: 2, class: ""},
        attributes: {},
        params: {isCheck: true},
        defaultValue: false,
    },

    {
        field: "startCheckbox",
        fieldType: "checkboxes",
        optional: true,

        tab: 0,
        attributes: {},
        params: {cols: 2, buttons: false},
        defaultValue: [],
    },

    {
        field: "startRadios",
        fieldType: "radios",
        optional: true,

        tab: 0,
        attributes: {},
        params: {cols: 3},
        defaultValue: {_id: "", name: ""},
    },




    //** second tabbed set of fields
    {
        field: "startStaticSelect",
        fieldType: "select",
        optional: true,

        css: "is-fullwidth",
        tab: 1,
        attributes: {},
        params: {type: "staticSelect", colours: true},
        defaultValue: {_id: "all", name: "All Options"},
    },

    {
        field: "startDynamicSelect",
        fieldType: "select",
        optional: true,

        css: "is-fullwidth",
        tab: 1,
        attributes: {},
        params: {
            type: "dynamicSelect",
            coll: "starter",
            filter: {fields: {name: 1}},
            options: {sort: {name: 1}}
        },
        defaultValue: {_id: "", name: ""},
    },

    {
        field: "startStaticTypeahead",
        fieldType: "typeahead",
        optional: true,

        tab: 1,
        attributes: {},
        params: {type: "staticSelect", rows: 10},
        defaultValue: {_id: "", name: ""},
    },

    {
        field: "startDynamicTypeahead",
        fieldType: "typeahead",
        optional: true,

        tab: 1,
        attributes: {},
        params: {
            type: "dynamicSelect",
            rows: 10,
            coll: "starter",
            filter: {fields: {_id: 1, name: 1}},
            options: {sort: {name: 1}}
        },
        defaultValue: {_id: "", name: ""},
    },

    {
        field: "startGeoAddress",
        fieldType: "address",
        optional: true,

        tab: 1,
        attributes: {maxlength: 128},
        params: {},
        defaultValue: {address: "", geoLocation: {type: {}, coordinates: []}},
    },

    {
        field: "startTimePicker",
        fieldType: "timePicker",
        optional: true,

        tab: 1,

        attributes: {},
        params: {
            hr12: true,
            timeStart: 6,
            timeEnd: 23,
            minuteIncrement: 15
        },
        defaultValue: "",
    },

    {
        field: "startDateTime",
        fieldType: "datePicker",
        tab: 1,
        attributes: {maxlength: 10},
        params: {dateFormat: 'Y-m-d', mode: 'single'},

        optional: true,
        defaultValue: "",
    },

    //* third tab set
    {
        field: "startApiKey",
        fieldType: "apiKey",
        optional: true,

        tab: 2,
        adjustLabel: true,

        attributes: {},
        params: {length: 24},
        defaultValue: "",
    },

    {
        field: "startFile",
        fieldType: "fileInput",
        optional: true,

        tab: 2,
        adjustLabel: true,

        attributes: {},
        params: {format: "text", type: ["json", "text.*"]},
        defaultValue: {name: "", src: ""},
    },

    {
        field: "startImage",
        fieldType: "fileInput",
        optional: true,

        tab: 2,
        adjustLabel: true,

        attributes: {},
        params: {
            format: "image",
            type: ["image.*"],

            //* include croppie setup
            croppie: {
                viewport: {width: 450, height: 150, type: 'square'},
            },
        },
        defaultValue: {name: "", src: ""},
    },

    {
        field: "startColours",
        fieldType: "colours",
        optional: true,

        tab: 2,
        attributes: {type: "text", maxlength: 64},
        params: {},
        defaultValue: "",
    },





    //** fourth tabbed set of fields
    {
        field: "startList",
        fieldType: "itemList",
        tab: 3,
        attributes: {maxlength: 5000, rows: 2},
        params: {
            key: "id",
            showCheck: true
        },

        optional: true,
        defaultValue: [{id: 1, text: '...'}],
    },

    {
        field: "startRows",
        fieldType: "rows",
        tab: 3,
        attributes: {},
        params: {
            key: "id",
            config: fieldsetRows,
        },

        optional: true,
        defaultValue: [],
    },

    {
        field: "startEditor",
        fieldType: "editor",
        tab: 3,
        attributes: {maxlength: 50000},
        params: {},

        optional: true,
        defaultValue: "",
    },
];
