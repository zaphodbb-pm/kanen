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


//** page header; set to null to not display header or a specific item
export const header = null;


/*
export const header = {
    en: {
        title:  "Home Page",
        lead:   "Welcome to Kanen - the seedling starter package",
        body:   "Introduction to Kanen.",
    }
};
 */



export const page = {

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
        }
    }
};
