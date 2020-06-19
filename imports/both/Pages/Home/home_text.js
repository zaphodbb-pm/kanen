/**
 * @summary Labels for Home page.
 *
 * @memberof Pages:Home
 * @function home_text
 * @locus Client
 * @augments home
 *
 * @returns {Object} - {header, page}
 */



//** page header; set to null to not display header or a specific item
export const header = {
    title:  {en: "Home Page"},
    lead:   {en: "Welcome to Kanen - the seedling starter package"},
    body:   {en: ""},
};


export const page = {

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
