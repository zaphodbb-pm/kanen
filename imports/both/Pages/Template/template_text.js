/**
 * Labels for Template page.
 *
 * @memberof Pages:Template
 * @function template_text
 * @locus Client
 * @augments template
 *
 * @returns {Object}
 */

//** page header; set to null to not display header or a specific item
export const header = {
    title:  {en: "Template Page"},
    lead:   {en: "Stock Starter Page Template"},
    body:   {en: "Add, subtract or change items to meet your needs."},
};


export const page = {
    page: {},

    components: {

        box: {
            en: "The <em>time</em> has come to <u>speak</u> of many things ..."
        },

        widget: {
            title: {en: "Title"}
        }
    },

    list: {
        name: {en: "Name"}
    },

    form: {
        name: {en: "Name"}
    },
};
