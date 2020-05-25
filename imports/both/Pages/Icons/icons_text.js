/**
 * @summary Labels for Icons page.
 *
 * @memberof Pages:Icons
 * @function icons_text
 * @locus Client
 * @augments icons
 *
 * @returns {Object}
 */

export default {
    navLabel: {en: "icons"},

    //** page header; set to null to not display header or a specific item
    header:   {
        title:  {en: "Icons Page"},
        lead:   {en: "Shows the system wide key and Line-Awesome file name.  Sizes are 1rem, 1.2rem, 1.5rem and 2.25rem."},
        body:   {en: ""},
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
