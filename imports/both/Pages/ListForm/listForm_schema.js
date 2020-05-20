/**
 * Schema definition object for Content collection.
 *
 * @memberof Pages:ListForm
 * @function listForm_schema
 * @locus Client
 * @augments listForm
 *
 * @returns {Object}
 *
 * @example
 * Form items
 *
 *          name =          String: name of this document
 *          crewCategory =  Object: crew category to attach event to
 *          contentLang =   String: static select box; two letter language code
 *          parentPage =    Object: dynamic select box; name and id number of parent page to attach to
 *          contentWeight = Number: sets page position relative to other pages
 *          contentLead =   String: lead text
 *          contentSummary= String: summary text
 *          contentPage=    String: JSON.stringify version of the html + css content
 *
 * @notes
 *  1.  Update server side grapher query fields object
 */


export default [

    //** first tabbed set of fields
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
        field: "contentWeight",
        fieldType: "input",
        tab: 0,
        attributes: {type: "number", min: 1, max: 25, step: 1},
        params: {},
        optional: true,
        defaultValue: 0,
    },


    /*
    {
        field: "crewCategory",
        fieldType: "select",
        tab: 0,
        attributes: {},
        params: {type: "staticSelect", filter: {sort: {name: 1}}},
        defaultValue: {_id: "", name: ""},
        optional: false,
    },

    {
        field: "contentLang",
        fieldType: "select",
        tab: 0,
        attributes: {},
        params: {type: "staticSelect"},
        optional: true,
        defaultValue: {_id: "", name: ""},
    },

    {
        field: "parentPage",
        fieldType: "select",
        tab: 0,
        attributes: {},
        params: {
            type: "dynamicSelect",
            coll: "content",
            filter: {sort: {name: 1}, fields: {name: 1}},
            prepend: {_id: "root", name: "_rootPage"} // for buildContent; add a root choice for table of contents building
        },
        optional: true,
        defaultValue: {_id: "", name: ""},
    },

    {
        field: "contentWeight",
        fieldType: "input",
        tab: 0,
        attributes: {type: "number", min: 1, max: 25, step: 1},
        params: {},
        optional: true,
        defaultValue: 0,
    },

    {
        field: "contentLead",
        fieldType: "textarea",
        tab: 0,
        attributes: {maxlength: 300, rows: 2},
        params: {},
        optional: true,
        defaultValue: "",
    },

    {
        field: "contentSummary",
        fieldType: "textarea",
        tab: 0,
        attributes: {maxlength: 1000, rows: 3},
        params: {},
        optional: true,
        defaultValue: "",
    },

    {
        field: "contentPage",
        fieldType: "editor",
        tab: 0,
        attributes: {maxlength: 50000},
        params: {},
        optional: true,
        defaultValue: "",
    },

     */
];
