/**
 * Labels for Learn page.
 *
 * @memberof Pages:Learn
 * @function learn_text
 * @locus Client
 * @augments learn
 *
 * @returns {Object}
 */

//** page header; set to null to not display header or a specific item
export const header = {
    title:  {en: "Learn Page"},
    lead:   {en: "Set of learn pages"},
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
        en: {
            getLang: {
                label: "Select Content Language",
                helpText: "Content can be tagged for different languages.",
                selects: [
                    {_id: "all", name: "All Languages"},
                    {_id: "en",  name: "English"},
                    {_id: "fr",  name: "Francais"},
                    {_id: "es",  name: "Espaniol"},
                ]
            },
        }
    },
};
