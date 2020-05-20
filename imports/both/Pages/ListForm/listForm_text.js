/**
 * @summary Labels for ListForm page.
 *
 * @memberof Pages:ListForm
 * @function listForm_text
 * @locus Client
 * @augments listForm
 *
 * @returns {Object}
 */

export default {
    navLabel: {en: "ListForm"},

    //** page header; set to null to not display header or a specific item
    header:   {
        title:  {en: "ListForm Page"},
        lead:   {en: "List and Form Components to Enter Data into Database"},
        body:   {en: ""},
    },

    page: {},

    list: {
        en: {

            labels: {
                hdr: "Page Content",
            },

            name: {
                label: "Name",
            },

            updatedAt: {
                label: "Updated At",
            },

            del: {
                label: "Del",
            }
        }
    },

    form: {
        en: {

            labels: {
                hdr:        "Page Content",
                txt:        "",
                clone:      true,
                cloneBtn:   "Clone Item",
                createBtn:  "Create New Doc",
                editBtn:    "Save Content Edit",
                backBtn:    "Back to List",
                previewBtn: "Preview"
            },

            formTabs: ["One", "Two"],
            //formTabs: [],

            //** Parameters ********************************************
            name: {
                label:      "Doc Name",
                helpText:   "Enter name",
            },

            crewCategory: {
                label:      "Crew Category",
                helpText:   "Choose a crew that this content enhances.",
                selects:    ["One", "Two", "Three"],
            },

            contentLang: {
                label:      "Language",
                helpText:   "Set the language tag for this content so that it can be found when a user sets their language preference.",
                selects:    ["English", "French"]
            },

            parentPage: {
                label:      "Parent Page",
                helpText:   "The parent to which this page is a sub-page.  Sets the content tree hierarchy.",
            },

            contentWeight: {
                label:      "Weight",
                helpText:   "The weight factor provides a way to sort the content pages at the same level.  " +
                    "The lighter the content, the higher up on the list it will be (ascending sorting).  " +
                    "Content at the same weight will be sorted alphabetically.",
            },

            contentLead: {
                label:      "Content Lead",
                helpText:   "Content lead text to support title (optional).",
            },

            contentSummary: {
                label:      "Content Summary",
                helpText:   "Provide a synopsis of the content body (optional).",
            },

            contentPage: {
                label:      "Content",
                helpText:   "Uses the wysiwyg editor to create a rich content page.",
            }
        }
    },

    components: {

        list: {
            title: {en: "List"}
        },







        widget: {
            title: {en: "Widget"}
        }
    }
};
