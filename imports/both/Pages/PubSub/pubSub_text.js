/**
 * Labels for PubSub page.
 *
 * @memberof Pages:PubSub
 * @function pubSub_text
 * @locus Client
 * @augments pubSub
 *
 * @returns {Object}
 */

//** page header; set to null to not display header or a specific item
export const header = {
    title:  {en: "PubSub Page"},
    lead:   {en: "Real Time Database Access"},
    body:   {en: ""},
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
