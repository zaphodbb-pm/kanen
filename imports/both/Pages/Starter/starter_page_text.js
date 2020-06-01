/**
 * @summary Labels for Starter page.
 *
 * @memberof Pages:Starter
 * @function starter_text
 * @locus Client
 * @augments starter_page
 *
 * @returns {Object}
 */

export default {
    navLabel: {en: "Starter Page"},

    //** page header; set to null to not display header or a specific item
    header:   {
        title:  {en: "Starter List & Form Page"},
        lead:   {en: "List and Form Components to Enter Data into Database"},
        body:   {en: ""},
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

            classDays: {
                label: "Class Days",
                filter:  [
                    {_id: "_id.none", name: "All Days"},
                    {_id: "_id.mon", name: "Mon"},
                    {_id: "_id.tue", name: "Tue"},
                    {_id: "_id.wed", name: "Wed"},
                    {_id: "_id.thu", name: "Thu"},
                    {_id: "_id.fri", name: "Fri"},
                    {_id: "_id.sat", name: "Sat"},
                    {_id: "_id.sun", name: "Sun"},
                ]
            },

            _id: {
                label: "Del",
            }
        }
    },

    form: {
        en: {

            labels: {
                hdr:        "Edit Document Form",
                txt:        "",
                clone:      true,
                cloneBtn:   "Clone Item",
                createBtn:  "Create New Doc",
                editBtn:    "Save Content Edit",
                backBtn:    "Back to List",
                previewBtn: "Preview",

                invalidInput:  {
                    prefix: "Can't submit: ",
                    suffix1: " item needs entered value.",
                    suffixn: " items need entered values."
                }
            },

            formTabs: ["Basic", "Complex", "Advanced", "Modules"],

            //** Form field text ********************************************
            name: {
                label: "Text (Name)",
                helpText: "String input type",
            },

            startNumber: {
                label: "Number Input",
                helpText: "Float with min / max and step size. ",
            },

            startInteger: {
                label: "Integer Input",
                helpText: "Integer defined by step size = 1. ",
            },

            startEmail: {
                label: "Email Input",
                helpText: "Checks for valid email before saving.",
            },

            startSwitch: {
                label: "Boolean Switch",
                tag: "Cancel Weekends",
                helpText: "Fancy check box for single item on or off.",
            },

            startTextArea: {
                label: "Text Area",
                helpText: "Expandable text area.",
            },

            startCheckbox: {
                label: "Checkbox",
                helpText: "Check box for single item on or off.",
                selects: [
                    {_id: "light", name: "a little rusty"},
                    {_id: "moderate", name: "a regular"},
                    {_id: "active", name: "ready for anything"},
                ]
            },

            startRadios: {
                label: "Radios",
                selects: [{_id: "yes", name: "Yes"}, {_id: "no", name: "No"}, {_id: "maybe", name: "Maybe"}]
            },

            startColours: {
                label: "Colours",
            },

            startTimePicker: {
                label: "Time Picker",
                helpText: "Select time value from buttons.",
                tag: {
                    save: "Save",
                    clear: "Clear",
                    close: "Close",

                    hours: "Hours",
                    minutes: "Minutes",
                    hr12: "AM / PM"
                }
            },

            startDateTime: {
                label: "Date Picker (with optional time)",
                helpText: "Can select date or time input type",
            },

            startStaticSelect: {
                label: "Static Select",
                helpText: "Select from a fixed list",
                tag: {_id: "all", name: "All Options", colour: "#000000"},
                selects: [
                    {_id: "sun", name: "Sunday", colour: "#000000"},
                    {_id: "mon", name: "Monday", colour: "#6666ff"},
                    {_id: "tue", name: "Tuesday", colour: "#bb22bb"},
                    {_id: "wed", name: "Wednesday", colour: "#33aa33"},
                    {_id: "thu", name: "Thursday", colour: "#ff8822"},
                    {_id: "fri", name: "Friday", colour: "#aaaaaa"},
                    {_id: "sat", name: "Saturday", colour: "#ff0000"},
                ]
            },

            startDynamicSelect: {
                label: "Dynamic Select",
                helpText: "Uses a collection name to find a list of selection options.",
                tag: {_id: "all", name: "All Options"},
            },

            startStaticTypeahead: {
                label: "Static Typeahead",
                helpText: "Uses a static list to search through for characters typed into input box.",
                selects: [
                    {_id: "sun", name: "Sunday"},
                    {_id: "mon", name: "Monday"},
                    {_id: "tue", name: "Tuesday"},
                    {_id: "wed", name: "Wednesday"},
                    {_id: "thu", name: "Thursday"},
                    {_id: "fri", name: "Friday"},
                    {_id: "sat", name: "Saturday"},
                ]
            },

            startDynamicTypeahead: {
                label: "Dynamic Typeahead",
                helpText: "Uses a collection to get a list of values that can then be searched through for " +
                        "characters typed into input box.",
            },

            hr1: {
                label: "",
                tag: "Form Spacer"
            },

            startApiKey: {
                label: "API Key",
                helpText: "Generate api key to allow user programs to access select collections via REST.",
                fieldText: "Generate new api key"
            },

            startFile: {
                label: "Get File",
                helpText: "Standard file browser that loads a string representation of the file data.  " +
                        "The file size is limited to 250KB.",
            },

            startImage: {
                label: "Get Image",
                helpText: "Standard file browser that loads a string representation of the file data.  " +
                        "The file size is limited to 250KB.",
            },


            startEditor: {
                label: "Editor",
                helpText: "Classic text editor on textarea",
                tag: "Be creative, add your content..."
            },

            startList: {
                label: "List of Items",
                helpText: "This is a combination box that contains rows of columns of input fields and returns an " +
                    "array of arrays of objects",
            },



            startRows: {
                label: "Row of Inputs",
                helpText: "This is a combination box that contains rows of columns of input fields and returns an " +
                        "array of arrays of objects",
            },

            startFieldset: {
                label: "Fieldset of Inputs",
                helpText: "This is a fieldset that contains a variety of input fields and returns an object of values",
            },

            startKanban: {
                label: "Kanban Plan",
                helpText: "",
                selects: [
                    {_id: "todo", name: "To Do"},
                    {_id: "doing", name: "Doing"},
                    {_id: "done", name: "Done"},
                    {_id: "waiting", name: "Waiting"},
                ]
            }
        }
    }
};
