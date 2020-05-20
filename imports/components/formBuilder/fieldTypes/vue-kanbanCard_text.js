/**
 * @summary Text for Kanban Card input field.
 *
 * @memberof Components_Form
 * @function vue-kanbanCard_text
 * @locus Client
 * @isTemplate true
 * @augments vue-kanban
 *
 * @returns {Object} kanen.i18n.comp_fileBrowse
 *
 */
export default {

    en: {
        labels: {
            view: "Detailed View",
            assigned: "Card assigned to user",
            remind: "Set reminder day",
            desc: "Description",
            link: "URL link",
            image: "Has image file attached",
            file: "Has text file attached",
            comment: "Comments",
            due: "Due date",
            days: "Days to completion",
            tasks: "task / check list",
        },

        cardModal: {
            modalHdr: "Kanban Card Detail",
            modalSave: "Save Edits",
            modalCancel: "Exit Detail",
            modalEdit: "Edit Card"
        }
    }
};
