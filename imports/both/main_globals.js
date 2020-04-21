/**
 * Client side constants to set up the environment.  Icons are drawn from the library in the file /imports/client/startup/buildIconLibrary
 *
 * @memberof Structure:Both
 * @function client-main_globals
 * @locus Client
 *
 * @return {Object} kanen
 *
 * @example
 * Namespaced kanen object holds:
 * kanen = {
 *      config: {},         // system configuration object for decorations
 *      constants: {},      // general system wide constants
 *      i18n: {},           // holds all of the text strings in various languages
 *      lists: {},          // collection of control objects for lists
 *      forms: {},          // collection of control objects for forms
 *      links: {},          // collection of control objects for navigation links
 *      routes: {},         // configuration info for router
 *      queries: {},        // server side use only; holds defined collection queries for Grapher
 *      simpleSchemas: [],  // schema subset for use by Simple Schema for setting data into collection
 *      widgets: {},        // collection of widget object
 *      iot: {},            // holds objects specific to iot capabilities
 *      formats: {}         // common object format for various modules
 *      icons: {},          // decorative icons used in application; uses <i></i> tag
 *
 */

//** global variables and constants
sysConfig = {};                                 // global system parameters
documentation = [];                             // global special documentation object

// define pseudo variables for jsdocs use
Structure = {};
Pages = {};


// unique namespaced global configuration object for this package
kanen = {
    constants: {
        LIMIT_MAX_SMALL: 200,                           // smaller limit for doc retrieval
        MAX_IMAGE_SIZE: 500 * 1024,                     // max size in bytes for an input file
        LIMIT_AUTOCOMPLETE: 25,                         // limit length for autocomplete returned list
        RATING_MAX: 5,                                  // maximum rating value
        VALID_UNTIL: 30 * 24 * 3600 * 1000,             // notification valid date range (default 30 days)

        // Dashboard colours
        BG_DEFAULT: "#BBB",
        BG_NORMAL: "#21C058",
        BG_WARN: "#FFD52E",
        BG_DANGER: "#E6002E",
        BG_SUCCESS: "#23d160",

        BG_INFO: "#05eeff",
        BG_PURPLE: "#605ca8",

        BG_CURRENCY: "#41b068",
        BG_MAGENTA: "#c140c1",
        BG_TEMP: "#673ab7",
        BG_HUM: "#0073b7",

        BG_SWEATCREW: "#6B0BFF",
        BG_CREWS: "#cc99ff",
        BG_FRIENDS: "#bbff88",



        // sets card title background and text color for list and form and other cards
        BG_TOC: "has-bg-purple text-1dot2rem has-text-weight-semibold",
        BG_CARD_PLAIN: "text-1dot2rem has-text-weight-semibold",
        BG_CARD: "has-bg-maroon text-1dot2rem has-text-weight-semibold",
        BG_CARD_ALT: "has-bg-teal text-1dot2rem has-text-weight-semibold",
        BG_CARD_ALT2: "has-bg-purple text-1dot2rem has-text-weight-semibold",

        // sets common button theme
        BG_BUTTON: "is-primary has-text-weight-semibold",
        BG_BUTTON_ALT: "is-warning has-text-weight-semibold",
        BG_BUTTON_CLONE: "is-warning has-text-weight-semibold",

        // sets list colours
        EDIT_COLOR: "#fcf8e3",


    },

    colours: {
        // sets css tags to match theme values
        THEME_PRIMARY:  "is-primary",
        THEME_INFO:     "is-info",
        THEME_LINK:     "is-link",
        THEME_SUCCESS:  "is-success",
        THEME_WARNING:  "is-warning",
        THEME_DANGER:   "is-danger",
        THEME_DEFAULT:  "is-dark",

        NOTIFY: {
            invite:     "has-background-success has-text-white",
            post:       "has-background-info has-text-black-ter",
            friend:     "has-background-primary has-text-white",
            comment:    "has-background-warning has-text-black-ter",
            reminder:   "has-background-danger has-text-white",
        }

    },

    i18n: {},                                           // holds all of the text strings in various languages

    lists: {},                                          // collection of control objects for lists

    forms: {},                                          // collection of control objects for forms

    links: {},                                          // collection of control objects for navigation links

    linksMobile: {},                                    // control objects for mobile device nav links

    routes: {},                                         // configuration info for router

    queries: {},                                        // server side use only; holds defined collection queries for Grapher

    schemaRoles: [],                                    // defines roles for the server side sending of data


    formats: {                                          // common object format for various modules

        flowPayload: {
            title: "Title",                             // String: (optional) representation of what the message contains
            description: "description",                 // String: (optional) brief explanation of contained data
            publish: "flowPub",                         // String: (optional) Session name of reactive comm channel to watch
            subscribe: "flowSub",                       // String: (optional) Session name of reactive comm channel to send output to

            payload: {                                  // Object: incoming or outgoing flow-message format from subscribe reactive variable
                time: (new Date()).getTime(),           // Number: milliseconds since epoch
                values: [75],                           // array of values to show
                maxValues: [120],                       // array of max values allows for conversion to % progress
                data: {},                               // Object: (optional) container for very large datasets
            },
        }
    },

    //* By abstracting the icons from the code body, we maintain the data driven model.
    //* Any icon set that uses <i></i> html tags can be used in place of the default Fontawesome package.
    //* Note also that css decorations can be applied here as well.
    //* Uppercase names are used as the usual standard for global constants
    icons: {

        NOTIFICATION: "/svg/bell.svg",                    // Messaging widget in Navbar



        /*

        //** nav bar icons
        PROFILE: "fas fa-user",                         // User Profile page
        SIGN_IN: "fas fa-sign-in-alt",                  // Not signed in user
        SIGN_UP: "far fa-user-circle",                  // Not signed in user
        NOTIFICATION: "far fa-bell",                    // Messaging widget in Navbar
        POSTS: "far fa-clipboard",                      // Messaging widget in Navbar
        INTEREST: "far fa-bookmark",                    // Interests / Bookmark in Navbar
        HIGHLIGHT: "fas fa-highlighter",                // Notifications -> Highlight item
        CREDIT: "fas fa-coins",                         // Credit widget in Navbar
        INTERCOM: "far fa-comments",                    // Intercom widget for support chat

        //** System / Admin pages
        HOME: "fas fa-home",                            // Home page
        SYSTEM: "fas fa-cogs",                          // Admin | System Info
        ADMIN: "fas fa-wrench",                         // Admin | System page

        //** list and form icons
        DELETE: "far fa-trash-alt has-text-danger",     // for pager tables, this is the delete icon
        DELETE_NORMAL: "far fa-trash-alt",              // for pager tables, this is the delete icon
        EDIT: "fas fa-pencil-alt",                      // edit document
        EDIT_DONE: "fas fa-check",                      // edit document finished
        ROWS: "fas fa-clipboard-list fa-fw",            // rows / page for list table
        ROW_ADD: "fas fa-plus-circle",                  // add a row in a form component
        DRAG: "fas fa-grip-vertical",                   // add a row in a form component
        SEARCH: "fas fa-search fa-fw",                  // standard search icon
        SEARCH_HELP: "fas fa-info-circle",              // info | help icon for search bar
        FILTERS: "fas fa-filter fa-fw",                 // filter button
        DOC: "far fa-file-alt",                         // for pager tables, this is the file icon
        VIEW: "fas fa-eye has-text-primary",            // for pager tables, this is the view/preview icon
        HELP: "fas fa-info-circle text-1dot6rem",       // info | help icon
        INFO: "fas fa-info-circle",                     // info | help icon
        APIKEY: "fas fa-magic",                         // apiKey field support
        FILE_BROWSE: "fas fa-folder-open",              // file input: button in input field
        FILE_DEL: "fas fa-minus-square",                // file input: delete file data
        FILE_FILE: "far fa-file-alt",                   // file input: placeholder image for non-image files
        STATUS: "fas fa-circle",                        // select status colour indicator
        CROP: "fas fa-crop-alt",                        // crop icon on file input
        CROPSAVE: "fas fa-file-upload",                 // crop icon on file input

        //** widget icons
        FLIPPER: "fas fa-cog",                          // used by all widgets to flip component to show flow payload
        USER: "fas fa-user",                            // user activity event
        USERS: "fas fa-users",                          // members
        CLOCK: "far fa-clock",                          // time icon for time ago values
        MORE: "fas fa-arrow-alt-circle-right",          // more link for info big box
        FILE_UP: "fas fa-upload",                       // file upload icon
        GEARS: "fas fa-cog",                            // Settings widget in navbar
        CANCEL: "fas fa-times-circle",                  // cancel button
        SAVE: "fas fa-file-export",                     // save info button
        WARNING: "fas fa-exclamation-triangle",         // general warning symbol
        CHECK: "fas fa-check-circle",                   // general approved or check symbol
        DANGER: "fas fa-hand-paper fa-flip-horizontal", // general danger symbol
        NOTICE: "fas fa-flag-checkered",                // general notice symbol
        NOTACTIVE: "fas fa-eye-slash",                  // not active indicator
        WELLNESS: "fas fa-walking",                     // activities
        SMS: "fas fa-sms",                              // send sms text

        //** brand icons
        GOOGLE: "fab fa-google",                        // Google
        LINKEDIN: "fab fa-linkedin-in",                 // Linked In
        SLACK: "fab fa-slack",                          // Linked In
        TWITTER: "fab fa-twitter",                      // Twitter
        FACEBOOK: "fab fa-facebook",                    // Facebook
        STRIPE: "fab fa-stripe",                        // Stripe
        PAYPAL: "fab fa-paypal",                        // Paypal

        //** event / kanban icons
        EV_VIEW: "fa-fw far fa-eye",                    // event / kanban, view details
        EV_ASSIGNED: "fa-fw fas fa-user-tag",           // event / kanban, assigned to user
        EV_REMIND: "fa-fw far fa-bell",                 // event / kanban, reminder
        EV_DESC: "fa-fw far fa-newspaper",              // event / kanban, card description
        EV_LINK: "fa-fw fas fa-link",                   // event / kanban, url link
        EV_IMAGE: "fa-fw far fa-file-image",            // event / kanban, image file
        EV_FILE: "fa-fw far fa-file-alt",               // event / kanban, text file
        EV_COMMENT: "fa-fw far fa-comment",             // event / kanban, comment area
        EV_DUE: "fa-fw fas fa-calendar-day",            // event / kanban, due date
        EV_DAYS: "fa-fw fas fa-ruler",                  // event / kanban, days to complete
        EV_TASKS: "fa-fw fas fa-tasks",                 // event / kanban, tasks


        //** SweatCrew pages
        SUPPORT: "far fa-life-ring",                    //SweatCrew - support page
        LEARN: "fas fa-chalkboard-teacher",             //SweatCrew -  Learn Page
        EXPLORE: "far fa-compass",                      //SweatCrew -  Marketplace Page
        ADD_EVENT: "far fa-calendar-plus",              //SweatCrew -  Marketplace Page - add event

        COMPANY: "fas fa-briefcase",                     //SweatCrew - companies page
        DASHBOARD: "fas fa-tachometer-alt",             //SweatCrew - Dashboard page
        USER_ADD: "fas fa-user-plus",                   //SweatCrew - Add / manage users

        PROVIDER: "fas fa-walking",                     //SweatCrew - service providers page
        PREVIEW: "fas fa-external-link-alt",            //SweatCrew - service providers Preview page
        ORDERS: "fas fa-tags",                          //SweatCrew - orders page
        PAYMENT: "far fa-credit-card",                  //SweatCrew  - payments admin page / credit card
        RECEIPTS: "fas fa-receipt",                     //SweatCrew - receipts page
        SPENDING: "fas fa-file-invoice-dollar",         //SweatCrew - spending report page

        FREQ: "fas fa-braille",                         //SweatCrew - frequency widget
        CREW_EVENT: "far fa-calendar",                  //SweatCrew -  crew widget
        CREWS: "fas fa-users-cog",                      //SweatCrew -  Crew / Team Page
        CREW: "fas fa-user-cog",                        //SweatCrew -  My Crew Page
        FRIENDS: "fas fa-user-friends",                 //SweatCrew -  Friends Page
        ENGAGE: "fas fa-star-of-life",                  //SweatCrew -  Engagements Page
        COMMENT: "far fa-comment-dots",                 //SweatCrew -  post page - add a comment
        LIKE: "fas fa-heart",                           //SweatCrew -  post page - like a post
        EVENTS: "far fa-calendar-plus",                 //SweatCrew -  Events page


        //** not used
        MARKER: "fas fa-map-marker-alt",                // classic google map marker
        SPINNER: "fas fa-spinner",                      // waiting icon
        STORAGE: "fas fa-database",                     // data storage
        SETTINGS: "fas fa-wrench",                      // user settings

        CONTENT: "far fa-newspaper",                    //SweatCrew - Content page
        SWEATCREW: "far fa-grin-beam-sweat",            //SweatCrew page
        MARKET: "fas fa-shopping-basket",               //SweatCrew -  Marketplace Page
        TEAM: "fas fa-users-cog",                       //SweatCrew -  Team Work Page
        PRODUCTS: "fas fa-bullhorn",                    //SweatCrew -  offers page
        SESSIONS: "fas fa-calendar-check",              //SweatCrew - sessions / schedule page
        PERFORMANCE: "fas fa-chart-line",               //SweatCrew - user dashboard
        APIS: "fas fa-sync-alt",                        //SweatCrew - api setup page
        TIMELINE: "fas fa-history",                     //SweatCrew -  Timeline Page

         */
    }
};
