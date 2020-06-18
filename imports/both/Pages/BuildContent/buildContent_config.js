/**
 * Configuration for BuildContent page components.
 *
 * @memberof Pages:BuildContent
 * @function buildContent_page_config
 * @locus Client
 * @augments buildContent_page
 *
 * @returns {Object}
 */

import {components} from '/imports/client/setup/systemGlobals'

export default {

    form: {
        coll:       "learn",          // target collection to send submit to
        showHdr:    true,               // show card header and title if true
        bgTitle:    components.BG_CARD_INFO, // colour header text and background

        hasGroups:  false,              // allows fields to be grouped onto the same row
        hasTabs:    false,              // has tabbed fields in form
        hasStepper: false,              // use stepper layout for tab fields (needs hasTabs set to true)
        hasPreview: false,              // support auxiliary preview button
        hasOverlay: false,              // support for form overlaying the list during edit operation
        clone:      true,               // allow user to clone current document in edit
    },

    list: {
        coll:       "learn",          // collection name to list
        showHdr:    true,               // show card header and title if true
        bgTitle:    components.BG_CARD_TEAL, // sets card title background and text color

        hasRows:    true,               // show row length selection box
        hasSearch:  true,               // show search box
        hasFilters: true,               // show search filters for specific fields
        hasPager:   true,               // show pager component, pages = (number of items) / (rows per page)
        hasOverlay: false,              // support for form overlaying the list during edit operation

        display:    "list",             // show results as a "list" (default) or as a "grid" of cards

        target:     "/home",            // launch page for a click table item
    }
};
