/**
 * @summary Labels for PageTwo.
 *
 * @memberof Pages:PageTwo
 * @function pageTwo_text
 * @locus Client
 * @augments pageTwo
 *
 * @returns {Object}
 */

export default {
    navLabel: {en: "Page Two"},

    header: null,

    /*
    header:   {
        title:  {en: "Page Two"},
        lead:   {en: "Use this page to access and manage items two"},
        body:   {en: "Supporting text for header"},
    },

     */

    page: {},

    components: {
        cardOne: {
            title: null,
            image: "/default-merchant.jpg",
            footer: null
        },

        cardTwo: {
            title: {en: "Card Title"},
            image: null,
            footer: {en: ["Saver", "Ed", "Del"]}
        },

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
