/**
 * @summary Text for complex fieldset rows on the Starter page.
 *
 * @memberof Pages:Starter
 * @function companies_form_text_rows
 * @locus Client
 * @augments starter_form
 *
 * @returns {Object} formText
 *
 * @notes
 *    Field types set:
 *      td0 = input field - name of spending account
 *      td1 = input field - number: allotment ($/year)
 *      td2 = input field - number: percent matching
 *      td3 = switch - amortize
 *      td4 = static select - not used
 *      td5 = dynamic typeahead -  not used
 */





export default {

    field1: {
        field: "field1",
        fieldType: "input",

        attributes: {type: "text"},
        params: {},
        optional: true,
        defaultValue: "",
    },


    field2: {
        field: "field2",
        fieldType: "input",

        attributes: {type: "number", min: 0, step: 1},
        params: {},
        optional: true,
        defaultValue: 0,
    },

    field3: {
        field: "field3",
        fieldType: "select",
        optional: true,

        attributes: {},
        params: {type: "staticSelect"},
        defaultValue: {_id: "all", name: "All Options"},
    },

    field4: {
        field: "field4",
        fieldType: "switch",

        attributes: {},
        params: {isCheck: true},
        optional: true,
        defaultValue: true,
    }
};





/*
export default [
        {
            field: "td0",
            fieldType: "input",

            attributes: {type: "text"},
            params: {},
            optional: true,
            defaultValue: "",
        },

        {
            field: "td1",
            fieldType: "input",

            attributes: {type: "number", min: 0, step: 1},
            params: {},
            optional: true,
            defaultValue: "",
        },

        {
            field: "td2",
            fieldType: "input",

            attributes: {type: "number", min: 0, max: 100, step: 1},
            params: {},
            optional: true,
            defaultValue: "",
        },

        {
            field: "td3",
            fieldType: "switch",

            attributes: {},
            params: {},
            optional: true,
            defaultValue: "",
        }
    ];
*/
