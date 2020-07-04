/**
 * Configuration for LogsSystem page components.
 *
 * @memberof Pages:LogsSystem
 * @function logsSystem_config
 * @locus Client
 * @augments logsSystem
 *
 * @returns {Object}
 */

import {components} from '/imports/both/systemGlobals'

export const pageConfig =  {

    list: {
        coll:       "logsSystem",      // collection name to list
        showHdr:    true,               // show card header and title if true
        bgTitle:    components.BG_CARD_TEAL, // sets card title background and text color

        hasRows:    true,              // show row length selection box
        hasSearch:  true,              // show search box
        hasFilters: true,              // show search filters for specific fields
        hasPager:   true,              // show pager component, pages = (number of items) / (rows per page)
        hasOverlay: false,              // support for form overlaying the list during edit operation

        display:    "list",             // show results as a "list" (default) or as a "grid" of cards

        target:     "/home",            // launch page for a click table item
    }
};
