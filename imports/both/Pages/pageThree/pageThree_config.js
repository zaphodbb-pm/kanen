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


import {colorArrays} from '/imports/client/setup/systemGlobals'

export default {

    components: {},

    widgets: {

        infobox: {
            decimals: 1,                    // set number of decimal points to show
            icon: "iconPost",               // widget's icon if needed
            height: 6,                      // widget height in "rem"
            bgColours: colorArrays.widget,  // background colors for reactive response to values; if String, colour is fixed
            bgNormal: [0, .66],             // percent range of values for normal operation
            bgWarning: [.66, .80],          // percent range of values for warning operation
        },

        progressBars: {
            //* widget css related decoration
            suffix: "%",                    // suffix added to incoming value for display
            orient: "horz",                 // "horz" shows bars horizontally; "vert" shows vertically
            barSize: "1rem",               // progress bar height ot width
            bgColours: colorArrays.widget,  // background colors for reactive response to values; if String, colour is fixed
            bgNormal: [],                   // percent range of values for normal operation
            bgWarning: [],                  // percent range of values for warning operation
        },

        gauge1: {
            //* widget css related decoration
            suffix: "%",                    // suffix added to incoming value for display
            style: "pie",                   // "ring" or "pie"
            height: 8,                     // widget height in "rem"
            bgColours: colorArrays.widgetReverse,  // background colors for reactive response to values; if String, colour is fixed
            bgNormal: [0, .25],             // percent range of values for normal operation
            bgWarning: [.25, .60],          // percent range of values for warning operation
        },

        gauge2: {
            //* widget css related decoration
            suffix: "%",                    // suffix added to incoming value for display
            style: "ring",                  // "ring" or "pie"
            height: 8,                     // widget height in "rem"
            bgColours: colorArrays.widgetReverse,  // background colors for reactive response to values; if String, colour is fixed
            bgNormal: [0, .25],             // percent range of values for normal operation
            bgWarning: [.25, .60],          // percent range of values for warning operation
        }
    }
};
