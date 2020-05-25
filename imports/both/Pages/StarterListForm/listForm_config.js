/**
 * @summary Configuration for StarterListForm components.
 *
 * @memberof Pages:StarterListForm
 * @function listForm_text
 * @locus Client
 * @augments listForm
 *
 * @returns {Object}
 */

import {components} from '/imports/client/setup/systemGlobals'

export default {

    form: {
        coll:       "starter",          // target collection to send submit to
        showHdr:    true,               // show card header and title if true
        bgTitle:    components.BG_CARD_PURPLE, // colour header text and background

        hasOverlay: false,              // support for form overlaying the list during edit operation
        hasGroups:  false,              // signals if form as grouped input fields
        hasStepper: false,              // use stepper layout for tab fields
        hasTabs:    false,              // has tabbed fields in form
        hasPreview: false,              // support auxillary preview button
        clone:      true,               // allow user to clone current document in edit
    },

    list: {
        coll:       "starter",          // collection name to list
        showHdr:    true,               // show card header and title if true
        bgTitle:    components.BG_CARD_TEAL, // sets card title background and text color

        hasOverlay: false,              // support for form overlaying the list during edit operation
        hasRows:    true,               // show row length selection box
        hasSearch:  true,               // show search box
        hasPager:   true,               // show pager component, pages = (number of items) / (rows per page)

        hasFilters: true,               // show search filters for specific fields
        showFilters: true,              // show filters at page load; user can then toggle off
        display: "list",                // show results as a "list" (default) or asd a "grid" of cards
        displayGrid: './listGrid',      // dynamically loaded grid card display component
    }
};
