/**
 * Client side constants to set up the environment.
 * This file provides a single entry point to provide consistency across all pages, components and elements.
 *
 * @memberof Setup:Client
 * @function systemGlobals
 * @locus Client
 *
 * @returns {Object} layout - controls layout options
 * @returns {Object} documents - mongodb document limits
 * @returns {Object} colors - hex colour values
 * @returns {Object} colorArrays - hex colour array values
 * @returns {Object} components - bulma css values for cards etc.
 * @returns {Object} elements - bulma css values for key buttons.
 * @returns {Object} theme - bulma css values for theming items
 */


export const layout = {
    TOP_NAV: false,
    SECONDARY_LOGO: false,
    SHORTCUTS: true
}

export const documents = {
    LIMIT_MAX_SMALL: 200,                           // smaller limit for document retrieval
    MAX_IMAGE_SIZE: 500 * 1024,                     // max size in bytes for an input file
    LIMIT_AUTOCOMPLETE: 25,                         // limit length for autocomplete returned list
    VALID_UNTIL: 30 * 24 * 3600 * 1000,             // notification valid date range (default 30 days)
};

export const colors = {
    DEFAULT:    "#BBBBBB",
    NORMAL:     "#21C058",
    WARN:       "#FFD52E",
    DANGER:     "#E6002E",
    SUCCESS:    "#23d160",
    LINK:       "#CC5C00",
    INFO:       "#A3005F",

    PURPLE:     "#605CA8",
    GREEN:      "#41B068",
    MAGENTA:    "#C140C1",
    VIOLET:     "#673AB7",
    BLUE:       "#0073B7",
};

export const colorArrays = {
    widget: [colors.NORMAL, colors.WARN, colors.DANGER],
    widgetReverse: [colors.DANGER, colors.WARN, colors.NORMAL]
};

export const components = {
    //** sets card title background and text color for list and form and other cards
    BG_TOC: "has-bg-purple text-1dot2rem has-text-weight-semibold",
    BG_CARD_PLAIN: "text-1dot2rem has-text-weight-semibold",
    BG_CARD: "has-bg-maroon text-1dot2rem has-text-weight-semibold",
    BG_CARD_TEAL: "has-bg-teal text-1dot2rem has-text-weight-semibold",
    BG_CARD_PURPLE: "has-bg-purple text-1dot2rem has-text-weight-semibold",
    BG_CARD_INFO: "has-background-info text-1dot2rem has-text-weight-semibold has-text-white",
};


export const elements = {
    //** sets common button theme
    BG_BUTTON: "is-primary has-text-weight-semibold",
    BG_BUTTON_ALT: "is-warning has-text-weight-semibold",
    BG_BUTTON_CLONE: "is-warning has-text-weight-semibold",

    //** sets list colours
    EDIT_COLOR: "#fcf8e3",
};

//* sets css tags to match theme values
export const theme = {
    THEME_PRIMARY:  "is-primary",
    THEME_INFO:     "is-info",
    THEME_LINK:     "is-link",
    THEME_SUCCESS:  "is-success",
    THEME_WARNING:  "is-warning",
    THEME_DANGER:   "is-danger",
    THEME_DEFAULT:  "is-dark",
};
