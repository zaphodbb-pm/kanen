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
    en: {
        title:  "Learn Page",
        lead:   "Set of learn pages",
        body:   "",
    }
};


export const page = {

    components: {
        en: {
            toc: {
                title: "Table of Contents"
            }
        }
    },

    form: {
        en: {
            getLang: {
                label: "Select Content Language",
                helpText: "Content can be tagged for different languages.",
                tag: {_id: "all", name: "Select Language"},
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
