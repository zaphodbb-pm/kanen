/**
 * @summary Labels for BuildContent page.
 *
 * @memberof Pages:BuildContent
 * @function buildContent_text
 * @locus Client
 * @augments buildContent_page
 *
 * @returns {Object}
 */

//** page header; set to null to not display header or a specific item
export const header = {
    en: {
        title:  "BuildContent Page",
        lead:   "Add Wiki like content for display",
        body:   "",
    }
};


export const page = {

    form: {
        en: {
            labels: {
                hdr:        "Page Content",
                txt:        "",
                clone:      true,
                cloneBtn:   "Clone Item",
                createBtn:  "Create New Content Doc",
                editBtn:    "Save Content Edit",
                backBtn:    "Back to List",
                previewBtn: "Preview",

                invalidInput:  {
                    prefix: "Can't submit: ",
                    suffix1: " item needs entered value.",
                    suffixn: " items need entered values."
                }
            },

            formTabs: [],


            //** Parameters ********************************************
            name: {
                label:      "Doc Name",
                helpText:   "",
            },

            contentLang: {
                label:      "Language",
                helpText:   "Set the language tag for this content so that it can be found when a user sets their language preference.",
                selects: [
                    {_id: "all", name: "All Languages"},
                    {_id: "en",  name: "English"},
                    {_id: "fr",  name: "Francais"},
                    {_id: "es",  name: "Espaniol"},
                ]
            },

            parentPage: {
                label:      "Parent Page",
                helpText: "The parent to which this page is a sub-page.  Sets the content tree hierarchy.",
            },

            contentWeight: {
                label:      "Weight",
                helpText: "The weight factor provides a way to sort the content pages at the same level.  " +
                    "The lighter the content, the higher up on the list it will be (ascending sorting).  " +
                    "Content at the same weight will be sorted alphabetically.",
            },

            contentLead: {
                label: "Content Lead",
                helpText: "Content lead text to support title (optional).",
            },

            contentSummary: {
                label: "Content Summary",
                helpText: "Provide a synopsis of the content body (optional).",
            },

            contentPage: {
                label:      "Content",
                helpText: "Uses the wysiwyg editor to create a rich content page.",
            }
        }
    },

    list: {
        en: {
            labels: {
                hdr: "Document List",
                addNew: "Add New"
            },

            name: {
                label: "Name",
            },

            updatedAt: {
                label: "Updated At",
            },

            _id: {
                label: "Del",
            }
        }
    }
};
