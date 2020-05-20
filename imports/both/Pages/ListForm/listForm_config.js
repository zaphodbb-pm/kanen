/**
 * @summary Configuration for ListForm components.
 *
 * @memberof Pages:ListForm
 * @function listForm_text
 * @locus Client
 * @augments listForm
 *
 * @returns {Object}
 */

import {components} from '/imports/client/setup/systemGlobals'

export default {

    form: {
        coll: "starter",                // target collection to send submit to

        hasOverlay: false,              // support for form overlaying the list during edit operation
        hasGroups: false,               // signals if form as grouped input fields
        hasStepper: false,              // use stepper layout for tab fields
        hasTabs: false,                 // has tabbed fields in form
        hasPreview: false,               // support auxillary preview button
        clone: true,                    // allow user to clone current document in edit

        showHdr: true,                  // show card header and title if true
        bgTitle: components.BG_CARD,    // colour header text and background
    },

    list: {
        //** configure list collection mechanism
        coll: "starter",                // collection name to list

        hasOverlay: false,              // support for form overlaying the list during edit operation
        hasRows: true,                  // show row length selection box
        hasSearch: true,                // show search box
        hasPager: true,                 // show pager component, pages = (number of items) / (rows per page)
        hasFilters: true,               // show search filters for specific fields

        showHdr: true,                  // show card header and title if true
        bgTitle: components.BG_CARD,    // sets card title background and text color
    }
};
