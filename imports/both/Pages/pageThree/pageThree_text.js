/**
 * @summary Labels for PageThree.
 *
 * @memberof Pages:PageThree
 * @function pageThree_text
 * @locus Client
 * @augments pageThree
 *
 * @returns {Object}
 */

export default {
    navLabel: {en: "Three"},

    header:   {
        title:  {en: "Page Three"},
        lead:   {en: "Use this page to access and manage page three"},
        body:   null //{en: "Supporting text for header"},
    },

    page: {},

    components: {
        list: {
            name: {en: "Name"}
        },

        form: {
            name: {en: "Name"}
        },

        widget: {
            title: {en: "Title"}
        }
    }
};
