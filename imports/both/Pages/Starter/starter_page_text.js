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

//** page header; set to null to not display header or a specific item
export const header = {
    title:  {en: "Starter List & Form Page"},
    lead:   {en: "List and Form Components to Enter Data into Database"},
    body:   {en: ""},
};


export const page = {

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
                helpText: "Checks for valid email before saving.  This field is 'watched' by startPhone at right.",
            },

            startPhone: {
                label: "Telephone Input",
                helpText: "Supports '+' country code, 7 or 10 digit numbers, brackets and extension as 'x', 'ext'.",
            },

            startTextArea: {
                label: "Text Area",
                helpText: "Expandable text area.",
            },

            address: {
                label: "Address",
                helpText: "This address will generate a geolocation object on submit.",
            },


            startSwitch: {
                label: "Boolean Switch",
                tag: "Cancel Weekends",
                helpText: "Fancy check box for single item on or off.",
            },

            startCheckItem: {
                label: "Check Item",
                tag: "Make Active",
                helpText: "Alternative to a switch item.",
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
                helpText: "Classic text editor on textarea.",
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

                rowText: {
                    field1: {label: "Test"},
                    field2: {label: "Number One"},
                    field3: {
                        label: "Select Two",
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

                    field4: {label: "", tag: "Active"},
                }
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

            startStaticSelect: {
                label: "Select",

                filter: [
                    {_id: "all", name: "All", colour: "#000000"},
                    {_id: "sun", name: "Sunday", colour: "#000000"},
                    {_id: "mon", name: "Monday", colour: "#6666ff"},
                    {_id: "tue", name: "Tuesday", colour: "#bb22bb"},
                    {_id: "wed", name: "Wednesday", colour: "#33aa33"},
                    {_id: "thu", name: "Thursday", colour: "#ff8822"},
                    {_id: "fri", name: "Friday", colour: "#aaaaaa"},
                    {_id: "sat", name: "Saturday", colour: "#ff0000"},
                ]
            },

            startDateTime: {
                label: "Date",
                filter: {
                    placeholder: "Date Range",

                    //** if this filter type has relativeDates set,
                    //** then build a start date from now using days derived from _id value;
                    //** else use absolute date range

                    /*
                    relativeDates: [
                        {_id: "none", name: "All Times"},
                        {_id: "days_p_1", name: "Today"},
                        {_id: "days_p_7", name: "Past Week"},
                        {_id: "days_p_30", name: "Past Month"},
                        {_id: "days_p_90", name: "Past Quarter"},
                        {_id: "days_f_1", name: "Tomorrow"},
                        {_id: "days_f_7", name: "This Week"},
                        {_id: "days_f_30", name: "This Month"},
                        {_id: "days_f_90", name: "This Quarter"}
                    ]

                     */
                },
            },

            geoLocation: {
                label: "Geo",
                filter: [
                    {_id: "none", name: "World Wide"},
                    {_id: "nearby", name: "Nearby"},
                    {_id: "citywide", name: "City Wide"},
                    {_id: "inregion", name: "In Region"}
                ],
            },

            _id: {
                label: "Del",
            }
        }
    },
};
