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
