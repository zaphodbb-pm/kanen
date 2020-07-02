/**
 * Labels for Template page.
 *
 * @memberof Pages:Template
 * @function template_text
 * @locus Client
 * @augments template
 *
 * @returns {Object} - header: {title, lead, body}
 * @returns {Object} - page: {page, components, list, form}
 */

//** page header; set to null to not display header or a specific item
export const header = {
    en: {
        title:  "Template Page",
        lead:   "Stock Starter Page Template",
        body:   "Add, subtract or change items to meet your needs.",
    }
};


export const page = {
    page: {
        en: {
            route: "currentRoute",
            parms: "params",
            config: "Config File"
        }
    },

    components: {

        box: {
            en: {
                msg: "The <em>time</em> has come to <u>speak</u> of many things ..."
            }
        },

        widget: {
            en: {
                title: "Title"
            }
        }
    },

    //** example for list / form components
    list: {
        en: {
            name: "Name"
        }
    },

    form: {
        en: {
            name: "Name"
        }
    }
};
