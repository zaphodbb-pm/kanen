/**
 * @summary Labels for SysConfig page.
 *
 * @memberof Pages:SysConfig
 * @function sysConfig_text
 * @locus Client
 * @augments sysConfig_page
 *
 * @returns {Object}
 */

//** page header; set to null to not display header or a specific item
export const header = {
    en: {
        title:  "SysConfig Page",
        lead:   "Adjust certain system parameters on the fly.",
        body:   "",
    }
};


export const page = {

    form: {
        en: {
            labels: {
                hdr:        "System Parameters",
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

            formTabs: ["Parameters", "Debug"],

            //** General Parameters ********************************************
            name: {
                label:      "Doc Name",
                helpText: "Collection contains only one document: Parameters.  " +
                    "This document contains global values for this system.",
            },

            postMaster: {
                label:      "Post Master",
                helpText: "This should be a valid email address to be used as the 'from' part " +
                    "of the systm generated email address.",
            },

            escalate: {
                label: "Escalation",
                helpText: "List of email addresses, comma separated, to send warning and danger " +
                    "emails to.  This forms part of the monitoringh escalation process. ",
            },

            logInterval: {
                label: "Log Interval",
                helpText: "Set time (in milliseconds) to sample sensor and then report log.  Default is 2000",
            },

            maxLogRecords: {
                label:      "Max Log Records",
                helpText: "Set this to limit the maximum number of records to export for logs.",
            },

            maxUserRecords: {
                label:      "Max User Records",
                helpText: "Set this to limit the maximum number of records to export for " +
                    "user ad images, coupons and age/gen campaign content.",
            },

            logsDays: {
                label:      "Hold Logs (days)",
                helpText: "Set this to limit the maximum number of days that all logs will be held.  " +
                    "Logs older than this value can be archived, but they will also be removed from the database.",
            },

            heartbeat: {
                label:      "System Heartbeat",
                helpText: "Sites update their own heartbeat.  Server checks to see if a site failed to update" +
                    " its own heartbeat.  If a site skips a beat, the server will then declare a failed site.  " +
                    "Heartbeats are typically 60 seconds long, but can be shorter if faster notification is required.",
            },

            ordersSeq: {
                label: "Orders Sequence #",
                helpText: "",
            },

            receiptsSeq: {
                label: "Receipts Sequence #",
                helpText: "",
            },

            //** Debug Settings ********************************************
            logEventsOff: {
                label: "Stop Log Entries",
                helpText: "For development purposes, turn off the logging of events.",
            },

            debugLevel: {
                label:      "Debug Level",
                helpText: 'The debug level determines what messages will be sent to the console.<br/>  ' +
                    '"o" = onMount or onDestroy sections.<br/>  ' +
                    '"c" = components.<br/> ' +
                    '"e" = event handlers.<br/> ' +
                    '"f" = functions.<br/>  ' +
                    '"m" = collection methods.<br/>  ' +
                    '"p" = page messages.<br/> ' +
                    '"r" = reactive variable settings.<br/> ' +
                    '"s" = system messages.<br/>  ' +
                    'Note that "ocefmprs" will send messages from all sections.<br/><br/>  ' +
                    'Any combination of switches can be used to select the appropriate amount of messages.  ' +
                    'Also, an empty string "" will stop all messages.',
            },

            showWidgets: {
                label: "Show Debug Widgets",
                helpText: "For development purposes, show info widgets such as browser lat/lng info.",
            },
        }
    },

    list: {
        en: {
            labels: {
                hdr: "System Parameter File",
                addNew: ""
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
