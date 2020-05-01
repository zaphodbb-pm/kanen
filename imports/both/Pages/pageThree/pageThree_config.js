/**
 * @summary Configuration for PageThree components.
 *
 * @memberof Pages:PageThree
 * @function pageThree_text
 * @locus Client
 * @augments pageThree
 *
 * @returns {Object}
 */

export default {

    components: {},

    widgets: {

        infobox: {
             title: "Big Box 2",            // main title for widget
             description: "Big Box",        // more detail
             prefix: "$",                   // prefix added to incoming value for display
             suffix: "Em",                  // suffix added to incoming value for display
             progress: "prog text",                  // if string has length, then show progress bar, else hide
             decimals: 1,                   // set number of decimal points to show

             //  widget css related decoration
             icon: "iconPost",              // widget's icon if needed
             height: 6,                     // widget height in "rem"

             //  colour controls at selected trigger points
             //  background colors for reactive response to values; if String, colour is fixed
             bgColours: [
                 "#21C058",
                 "#FFD52E",
                 "#E6002E",

                    //kanen.constants.BG_HUM,
                    //kanen.constants.BG_WARN,
                    //kanen.constants.BG_DANGER
                ],
             bgNormal: [0, .66],             // percent range of values for normal operation
             bgWarning: [.66, .80],          // percent range of values for warning operation
        }
    }
};
