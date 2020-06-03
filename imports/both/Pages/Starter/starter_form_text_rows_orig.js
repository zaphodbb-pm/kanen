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


    config: {

            td0: {
                label: "Test",
                helpText: "",

                attributes: {type: "text"},
                params: {},
                optional: true,
                defaultValue: "",
            },

            td1: {
                label: "Number One",
                helpText: "",

                attributes: {type: "number", min: 0, step: 1},
                params: {},
                optional: true,
                defaultValue: "",
            },

            td2: {
                label: "Number Two",
                helpText: "",

                attributes: {type: "number", min: 0, max: 100, step: 1},
                params: {},
                optional: true,
                defaultValue: "",
            },

            td3: {
                label: "Switch",
                helpText: "",

                attributes: {},
                params: {},
                optional: true,
                defaultValue: "",
            }

    },


    array: [
        {
            field: "td0",
            fieldType: "input",
            label: "Test",
            helpText: "",

            attributes: {type: "text"},
            params: {},
            optional: true,
            defaultValue: "",
        },

        {
            field: "td1",
            fieldType: "input",
            label: "Number One",
            helpText: "",

            attributes: {type: "number", min: 0, step: 1},
            params: {},
            optional: true,
            defaultValue: "",
        },

        {
            field: "td2",
            fieldType: "input",
            label: "Number Two",
            helpText: "",

            attributes: {type: "number", min: 0, max: 100, step: 1},
            params: {},
            optional: true,
            defaultValue: "",
        },

        {
            field: "td3",
            fieldType: "switch",
            label: "Switch",
            helpText: "",

            attributes: {},
            params: {},
            optional: true,
            defaultValue: "",
        }
    ]
};





