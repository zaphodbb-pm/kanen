/**
 * Labels for ExportImport page.
 *
 * @memberof Pages:ExportImport
 * @function exportImport_text
 * @locus Client
 * @augments exportImport
 *
 * @returns {Object}
 */

//** page header; set to null to not display header or a specific item
export const header = {
    title:  {en: "Export / Import Page"},
    lead:   {en: "Admin controls exporting CSV files."},
    body:   {en: ""},
};


export const page = {
    page: {},

    components: {

        box: {
            en: "The <em>time</em> has come to <u>speak</u> of many things ..."
        },

        widget: {
            title: {en: "Title"}
        }
    },

    list: {
        name: {en: "Name"}
    },

    form: {
        name: {en: "Name"}
    },


    config: {
        en: {
            //* card constants
            bg: kanen.constants.BG_CARD,
            btn: kanen.constants.BG_BUTTON,

            //* card general labels
            title: "Export / Import Documents to a Collection",
            btnSend: "Export",
            btnReceive: "Import",

            msgFind: "Finding document ...",
            msgBuild: "Building ... ",
            msgDone: "Process finished",
            msgError: "Select collection or / and input file. ",
            msgExportFail: "No content found to export.",
            msgImportFail: "Server was unable to process import records.",

            //* card field specific labels
            labelTarget: "Select Collection",
            labelInputFile: "Upload JSON File",

            targets: [
                {_id: 'none', name: "Select One ..."},
                {_id: 'learn', name: "Learn"},
                {_id: 'starter', name: "Starter"},
                {_id: 'notifications', name: "Notifications"},


                {_id: 'sysConfigs', name: "System Config"},
                {_id: 'logsSystem', name: "System Logs"},
                {_id: 'LogsUsers', name: "User Logs"},
                {_id: 'users', name: "Users"},
            ]

        }
    }



};
