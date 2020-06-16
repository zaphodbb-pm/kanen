/**
 * @summary Labels for LogsUsers page.
 *
 * @memberof Pages:LogsUsers
 * @function logsUsers_text
 * @locus Client
 * @augments logsUsers_page
 *
 * @returns {Object}
 */

//** page header; set to null to not display header or a specific item
export const header = {
    title:  {en: "LogsUsers Page"},
    lead:   {en: "Adjust certain system parameters on the fly."},
    body:   {en: ""},
};


export const page = {

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
