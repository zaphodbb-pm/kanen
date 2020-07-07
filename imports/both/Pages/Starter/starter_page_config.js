/**
 * Configuration for Starter page components.
 *
 * @memberof Pages:Starter
 * @function starter_page_config
 * @locus Client
 * @augments starter_page
 *
 * @returns {Object}
 */

import {components} from '/imports/both/systemGlobals'
import grid from './starter_grid.svelte'

export const pageConfig =  {

    components: {

        gridMode: {
            field: "gridMode",
            fieldType: "switch",
            optional: true,

            css: "is-fullwidth",
            attributes: {},
            params: {},
            defaultValue: false,
        },
    },

    form: {
        coll:       "starter",          // target collection to send submit to
        showHdr:    true,               // show card header and title if true
        bgTitle:    components.BG_CARD_INFO, // colour header text and background

        hasGroups:  true,               // allows fields to be grouped onto the same row
        hasTabs:    true,               // has tabbed fields in form
        hasStepper: false,              // use stepper layout for tab fields (needs hasTabs set to true)
        hasPreview: false,              // support auxiliary preview button
        hasOverlay: false,              // support for form overlaying the list during edit operation
        clone:      true,               // allow user to clone current document in edit
    },

    list: {
        coll:       "starter",          // collection name to list
        showHdr:    true,               // show card header and title if true
        bgTitle:    components.BG_CARD_TEAL, // sets card title background and text color

        hasRows:    true,               // show row length selection box
        hasSearch:  true,               // show search box
        hasFilters: true,               // show search filters for specific fields
        hasPager:   true,               // show pager component, pages = (number of items) / (rows per page)
        hasOverlay: false,              // support for form overlaying the list during edit operation

        display:    "list",             // show results as a "list" (default) or as a "grid" of cards
        displayGrid: grid,              // grid card display component

        target:     "/home",            // launch page for a click table item
    }
};
