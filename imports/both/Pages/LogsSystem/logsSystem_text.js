/**
 * @summary Labels for LogsSystem page.
 *
 * @memberof Pages:LogsSystem
 * @function logsSystem_text
 * @locus Client
 * @augments logsSystem_page
 *
 * @returns {Object}
 */

//** page header; set to null to not display header or a specific item
export const header = {
    title:  {en: "LogsSystem Page"},
    lead:   {en: "Adjust certain system parameters on the fly."},
    body:   {en: ""},
};


export const page = {

    element: {
        en: {
            label: "Delete a range of records from system logs.",

            selects: [
                {_id: "none", name: "None"},
                {_id: "days_1", name: "From Yesterday"},
                {_id: "days_7", name: "From Last Week"},
                {_id: "days_30", name: "From Last Month"},
                {_id: "days_90", name: "From last Quarter"},
                {_id: "days_365", name: "From Last Year"},
                {_id: "all", name: "All Times"},
            ]
        }
    },

    list: {
        en: {
            labels: {
                hdr: "List of System Logs",
                addNew: ""
            },

            tag: {
                label: "Tag",
            },

            timeStamp: {
                label: "Time Stamp",
                filter: {
                    placeholder: "Date Range",
                }
            },

            data: {
                label: "Data",
            },

            _id: {
                label: "Del",
            }
        }
    }
};
