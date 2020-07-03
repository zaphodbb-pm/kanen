/**
 * @summary Text for complex fieldset rows on the Starter page.
 *
 * @memberof Pages:Starter
 * @function starter_form_text_rows
 * @locus Client
 * @augments starter_form
 *
 * @returns {Object} formText
 *
 * @notes
 *    Field types set:
 *      field1 = input field text
 *      field2 = input field number
 *      field3 = input field select
 *      field4 = switch
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
