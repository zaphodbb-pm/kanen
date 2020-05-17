/**
 * @summary Labels for Cards.
 *
 * @memberof Pages:Cards
 * @function cards_text
 * @locus Client
 * @augments cards
 *
 * @returns {Object}
 */

export default {
    navLabel: {en: "Cards"},

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
