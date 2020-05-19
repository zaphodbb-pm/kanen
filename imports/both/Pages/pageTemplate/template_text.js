/**
 * @summary Labels for Template page.
 *
 * @memberof Pages:Template
 * @function template_text
 * @locus Client
 * @augments template
 *
 * @returns {Object}
 */

export default {
    navLabel: {en: "Template"},

    //** page header; set to null to not display header or a specific item
    header:   {
        title:  {en: "Template Page"},
        lead:   {en: "Stock Starter Page Template"},
        body:   {en: "Add, subtract or change items to meet your needs."},
    },

    page: {},

    components: {

        box: {
            en: "The <em>time</em> has come to <u>speak</u> of many things ..."
        },

        example1: {
            en: [
                {
                    icon: "",
                    label: "One",
                    text: "The <b>quick</b> brown fox jumped over the <em>lazy</em> black dog.",
                    dbContent: null  //dbContent: { coll: "", name: ""}
                },

                {
                    icon: "",
                    label: "Two",
                    text: "Hickory, dickory, dock <br/>" +
                        "The mouse ran up the clock <br/>" +
                        "The clock stuck 1:00 <br />" +
                        "The mouse fell like a rock <br/>" +
                        "'Twas an electric clock <br/>" +
                        "Hickory, dickory, dock!",
                    dbContent: null
                },

                {
                    icon: "",
                    label: "Three",
                    text: "Some pithy content talking about pictures.",
                    dbContent: null
                }
            ]
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
