/**
 * @summary Schema definition object for BuildContent collection.
 *
 * @memberof Pages:BuildContent
 * @function buildContent_form_schema
 * @locus Anywhere
 * @augments buildContent_page
 *
 * @returns {Array} - array of field configuration objects
 *
 * @example
 * Schema items
 *          name =              String: name of this document
 *          contentLang =       String: static select box; two letter language code
 *          parentPage =        Object: dynamic select box; name and id number of parent page to attach to
 *          contentWeight =     Number: sets page position relative to other pages
 *          contentLead =       String: lead text
 *          contentSummary=     String: summary text
 *          contentPage=        String: JSON.stringify version of the html + css content

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
 *                  coll: "buildContent",
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


export default [

    {
        // control and decoration for fields in a form
        field: "name",
        fieldType: "input",
        optional: false,

        tab: 0,
        attributes: {type: "text", maxlength: 64},
        params: {},
        defaultValue: "",
    },

    {
        field: "contentLang",
        fieldType: "select",
        optional: true,

        tab: 0,
        attributes: {},
        css: "is-fullwidth",
        params: {type: "staticSelect"},
        defaultValue: {_id: "", name: ""},
    },

    {
        field: "parentPage",
        fieldType: "select",
        optional: true,

        tab: 0,
        attributes: {},
        css: "is-fullwidth",
        params: {
            type: "dynamicSelect",
            coll: "learn",
            filter: {sort: {name: 1}, fields: {name: 1}},
            prepend: {_id: "root", name: "_rootPage"}       // for buildContent; add a root choice for table of contents building
        },
        defaultValue: {_id: "root", name: "_rootPage"},
    },

    {
        field: "contentWeight",
        fieldType: "input",
        optional: true,

        tab: 0,
        attributes: {type: "number", min: 1, max: 25, step: 1},
        params: {},
        defaultValue: 0,
    },

    {
        field: "contentLead",
        fieldType: "textarea",
        optional: true,

        tab: 0,
        attributes: {maxlength: 300, rows: 2},
        params: {},
        defaultValue: "",
    },

    {
        field: "contentSummary",
        fieldType: "textarea",
        optional: true,

        tab: 0,
        attributes: {maxlength: 1000, rows: 3},
        params: {},
        defaultValue: "",
    },

    {
        field: "contentPage",
        fieldType: "editor",
        optional: true,

        tab: 0,
        attributes: {maxlength: 50000},
        params: {},
        defaultValue: "",
    }
];
