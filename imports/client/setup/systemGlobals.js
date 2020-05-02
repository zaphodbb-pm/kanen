/**
 * Client side constants to set up the environment.
 * This file provides a single entry point to provide consistency across all pages, components and elements.
 *
 * @memberof Setup:Client
 * @function systemGlobals
 * @locus Client
 *
 * @returns {Object} documents - mongodb document limits
 * @returns {Object} colors - hex colour values
 * @returns {Object} colorArrays - hex colour array values
 * @returns {Object} components - bulma css values for cards etc.
 * @returns {Object} theme - bulma css values for theming items
 */


export let documents = {
    LIMIT_MAX_SMALL: 200,                           // smaller limit for doc retrieval
    MAX_IMAGE_SIZE: 500 * 1024,                     // max size in bytes for an input file
    LIMIT_AUTOCOMPLETE: 25,                         // limit length for autocomplete returned list
    VALID_UNTIL: 30 * 24 * 3600 * 1000,             // notification valid date range (default 30 days)
};

export let colors = {
    DEFAULT:    "#BBB",
    NORMAL:     "#21C058",
    WARN:       "#FFD52E",
    DANGER:     "#E6002E",
    SUCCESS:    "#23d160",
    INFO:       "#05eeff",

    PURPLE:     "#605ca8",
    GREEN:      "#41b068",
    MAGENTA:    "#c140c1",
    VIOLET:     "#673ab7",
    BLUE:       "#0073b7",
};

export let colorArrays = {
    widget: [colors.NORMAL, colors.WARN, colors.DANGER],
    widgetReverse: [colors.DANGER, colors.WARN, colors.NORMAL]
};

export let components = {
    //** sets card title background and text color for list and form and other cards
    BG_TOC: "has-bg-purple text-1dot2rem has-text-weight-semibold",
    BG_CARD_PLAIN: "text-1dot2rem has-text-weight-semibold",
    BG_CARD: "has-bg-maroon text-1dot2rem has-text-weight-semibold",
    BG_CARD_ALT: "has-bg-teal text-1dot2rem has-text-weight-semibold",
    BG_CARD_ALT2: "has-bg-purple text-1dot2rem has-text-weight-semibold",

    //** sets common button theme
    BG_BUTTON: "is-primary has-text-weight-semibold",
    BG_BUTTON_ALT: "is-warning has-text-weight-semibold",
    BG_BUTTON_CLONE: "is-warning has-text-weight-semibold",

    //** sets list colours
    EDIT_COLOR: "#fcf8e3",
};

//* sets css tags to match theme values
export let theme = {
    THEME_PRIMARY:  "is-primary",
    THEME_INFO:     "is-info",
    THEME_LINK:     "is-link",
    THEME_SUCCESS:  "is-success",
    THEME_WARNING:  "is-warning",
    THEME_DANGER:   "is-danger",
    THEME_DEFAULT:  "is-dark",
};
