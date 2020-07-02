/**
 * @summary Labels for LogsUsers page.
 *
 * @memberof Pages:LogsUsers
 * @function logsUsers_text
 * @locus Client
 * @augments logsUsers
 *
 * @returns {Object}
 */

//** page header; set to null to not display header or a specific item
export const header = {
    en: {
        title:  "LogsUsers Page",
        lead:   "Adjust certain system parameters on the fly.",
        body:   "",
    }
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
                hdr: "List of User Logs",
                addNew: ""
            },

            tag: {
                label: "Log Type",
            },

            author: {
                label: "Author",
            },

            username: {
                label: "User Name",
            },

            tenantId: {
                label: "Tenant Id",
            },

            email: {
                label: "Email",
            },

            connection: {
                label: "Connection",
            },

            updatedAt: {
                label: "Updated At",
                filter: {
                    placeholder: "Date Range",
                }
            },

            _id: {
                label: "Del",
            }
        }
    }
};
