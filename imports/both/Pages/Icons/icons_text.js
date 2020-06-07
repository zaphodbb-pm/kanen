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


//** page header; set to null to not display header or a specific item
export const header = {
    title:  {en: "Icons Page"},
    lead:   {en: "Shows the system wide key and Line-Awesome file name."},
    body:   {en: "Sizes are 1rem, 1.2rem, 1.5rem and 2.25rem. <br />" +
            "Icon colours are: default text, 'has-text-info', 'has-text-link', 'has-text-primary'."
    }
};


export const page = {

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
