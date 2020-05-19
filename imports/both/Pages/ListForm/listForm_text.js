/**
 * @summary Labels for ListForm page.
 *
 * @memberof Pages:ListForm
 * @function listForm_text
 * @locus Client
 * @augments listForm
 *
 * @returns {Object}
 */

export default {
    navLabel: {en: "ListForm"},

    //** page header; set to null to not display header or a specific item
    header:   {
        title:  {en: "ListForm Page"},
        lead:   {en: "List and Form Components to Enter Data into Database"},
        body:   {en: ""},
    },

    page: {},

    components: {

        list: {
            title: {en: "List"}
        },

        form: {
            title: {en: "Form"}
        },

        widget: {
            title: {en: "Widget"}
        }
    }
};
