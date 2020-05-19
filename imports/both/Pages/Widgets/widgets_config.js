/**
 * @summary Configuration for Widgets components.
 *
 * @memberof Pages:Widgets
 * @function widgets_text
 * @locus Client
 * @augments widgets
 *
 * @returns {Object}
 */


import {colors, colorArrays} from '/imports/client/setup/systemGlobals'

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

        infobox2: {
            decimals: 1,                    // set number of decimal points to show
            icon: "iconConfig",             // widget's icon if needed
            height: 6,                      // widget height in "rem"
            bgColours: colors.VIOLET,       // background colors for reactive response to values; if String, colour is fixed
            bgNormal: [],                   // percent range of values for normal operation
            bgWarning: [],                  // percent range of values for warning operation
        },

        squarebox: {
            height: 8,                      // widget height in "rem"
            bgColours: colors.MAGENTA,      // background colors for reactive response to values; if String, colour is fixed
        },

        biginfo: {
            decimals: 1,                    // set number of decimal points to show
            icon: "iconPost",               // widget's icon if needed
            height: 8,                     // widget height in "rem"
            bgColours: colorArrays.widget,  // background colors for reactive response to values; if String, colour is fixed
            bgNormal: [0, .66],             // percent range of values for normal operation
            bgWarning: [.66, .80],          // percent range of values for warning operation
        },

        progressBars: {
            suffix: "%",                    // suffix added to incoming value for display
            orient: "horz",                 // "horz" shows bars horizontally; "vert" shows vertically
            barSize: "1rem",                // progress bar height ot width
            bgColours: colorArrays.widget,  // background colors for reactive response to values; if String, colour is fixed
            bgNormal: [],                   // percent range of values for normal operation
            bgWarning: [],                  // percent range of values for warning operation
        },

        progressBars2: {
            suffix: "%",                    // suffix added to incoming value for display
            orient: "vert",                 // "horz" shows bars horizontally; "vert" shows vertically
            height: 10,                     // widget height in "rem" for vertical bars
            barSize: "1rem",                // progress bar height ot width
            bgColours: colorArrays.widget,  // background colors for reactive response to values; if String, colour is fixed
            bgNormal: [],                   // percent range of values for normal operation
            bgWarning: [],                  // percent range of values for warning operation
        },

        gauge1: {
            suffix: "%",                    // suffix added to incoming value for display
            style: "pie",                   // "ring" or "pie"
            height: 8,                     // widget height in "rem"
            bgColours: colorArrays.widgetReverse,  // background colors for reactive response to values; if String, colour is fixed
            bgNormal: [0, .25],             // percent range of values for normal operation
            bgWarning: [.25, .60],          // percent range of values for warning operation
        },

        gauge2: {
            suffix: "%",                    // suffix added to incoming value for display
            style: "ring",                  // "ring" or "pie"
            height: 8,                      // widget height in "rem"
            bgColours: colorArrays.widgetReverse,  // background colors for reactive response to values; if String, colour is fixed
            bgNormal: [0, .25],             // percent range of values for normal operation
            bgWarning: [.25, .60],          // percent range of values for warning operation
        },
    }
};
