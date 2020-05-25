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
        title:  {en: "Starter List & Form Page"},
        lead:   {en: "List and Form Components to Enter Data into Database"},
        body:   {en: ""},
    },

    list: {
        en: {

            labels: {
                hdr: "Content List",
                addNew: "Add New"
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
                hdr:        "Content Form",
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

            formTabs: ["Basic", "Complex", "Advanced", "Combi", "Modules"],

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

            startSwitch: {
                label: "Boolean Switch",
                helpText: "Fancy check box for single item on or off.",
            },

            startTextArea: {
                label: "Text Area",
                helpText: "Expandable text area.",
            },

            startCheckbox: {
                label: "Checkbox",
                helpText: "Check box for single item on or off.",
                selects: ["one", "two"]
            },

            startRadios: {
                label: "Radios",
                selects: ["Bicycle", "Scooter", "Automobile", "Truck"]
            },

            startColours: {
                label: "Colours",
            },

            startDateTime: {
                label: "Date / Time",
                helpText: "Can select date or time inout type",
            },

            startStaticSelect: {
                label: "Static Select",
                helpText: "Select from a fixed list",
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

            startEditor: {
                label: "Editor",
                helpText: "Classic text editor on textarea",
            },

            hr1: {
                label: "Form Spacer"
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

            startRows: {
                label: "Row of Inputs",
                helpText: "This is a combination box that contains rows of columns of input fields and returns an " +
                        "array of arrays of objects",
            },

            startList: {
                label: "List of Items",
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
