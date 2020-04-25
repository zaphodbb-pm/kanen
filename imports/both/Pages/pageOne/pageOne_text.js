/**
 * @summary Labels for PageOne.
 *
 * @memberof Pages:PageOne
 * @function pageOne_text
 * @locus Client
 * @augments pageOne
 *
 * @returns {Object}
 */

export default {
    navLabel: {en: "Page One"},

    header:   {
        title:  {en: "Manage Users"},
        lead:   {en: "Use this page to access and manage the registered users"},
        body:   {en: "Supporting text for header"},
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
