/**
 * @summary Labels for pageHome.
 *
 * @memberof Pages:pageHome
 * @function home_text
 * @locus Client
 * @augments home
 *
 * @returns {Object}
 */

export default {
    navLabel: {en: "Home"},

    //** page header; set to null to not display header or a specific item
    header:   {
        title:  {en: "Home Page"},
        lead:   {en: "Welcome to Kanen - the seedling starter package"},
        body:   {en: "Introduction to Kanen."},
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
