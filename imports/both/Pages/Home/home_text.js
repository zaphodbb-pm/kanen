/**
 * @summary Labels for Home page.
 *
 * @memberof Pages:Home
 * @function home_text
 * @locus Client
 * @augments home
 *
 * @returns {Object} - {header, page}
 */



//** page header; set to null to not display header or a specific item
export const header = {
    title:  {en: "Kanen - A Seedling Starter Package"},
    lead:   {en: ""},
    body:   {en: ""},
};


export const page = {

    page: {
        en: {
            intro: "<p><b>Kanen</b> is built on the most current technologies as of 2020 using the latest releases of Meteor, MongoDb, Svelte and Bulma.  " +
                "It is also an opinionated view of the work that needs to get done.  </p>" +
                "<p>This package is clearly not for everyone nor does it try to accommodate the latest new ideas.  " +
                "This package is meant for business people / product managers that need to get outcomes quickly with applications " +
                "that can scale during the initial growth phase of a company.</p>",

            quote: "“It can scarcely be denied that the supreme goal of all theory is to make the irreducible basic elements as simple " +
                "and as few as possible without having to surrender the adequate representation of a single datum of experience. <br/> <br />" +
                "<em>actual quote by Albert Einstein often rewritten as:</em> <br /> <br />" +
                "“Everything should be as simple as it can be, but not simpler” ",

            defTitle: "What's in a name?",

            definition:
                    "<p><b>Kanen</b> comes from the Mohawk language and means 'seed'.  " +
                    "The Mohawk people are indigenous to the St. Lawrence River Valley from Quebec to upstate New York.  " +
                    "The seed ceremony is very important in the Mohawk culture as it represents a renewal in spring " +
                    "and prepares for growing food and nourishing the community.  </p>" +
                    "<p>We believe that <b>Kanen</b> reflects what we are trying to accomplish with this package.</p>",

            philosophy: {
                title: "Philosophy",

                body: [
                    "Adherence to Standards",
                    "Configuration rather than programming",
                    "Appropriate componentization for easier maintenance",
                    "Keep it light weight, remove anything that is not needed",
                    "Make it fast to load and execute."
                ]
            },

            features: {
                title: "Features",

                body: [
                    "Minimal Meteor add-on packages to reduce bundle size.",
                    "Uses Meteor methods for database read / store for greater speed.",
                    "Leverages MongoDb Change Streams for real time tracking.",
                    "",
                    "Each page is self contained. Can be removed or added by editing route table.",
                    "Leverages Svelte-loadable to minimize initial app load.",
                    "Uses Svelte stores for state management.",
                    "Uses Svelte context for text and other static information.",
                    "All text is abstracted on a per page basis to allow for internationalization and easy maintenance.",
                    "",
                    "Includes a variety of widgets / components for content display or dashboard indicators.",
                    "Includes a mini-wiki to provide user learning resources.",
                    "Built-in form builder with 16 configurable field types. Supports tabbed sections and horizontal grouped fields.",
                    "Built-in document lister with filter plugins and compound search. Supports table or grid layouts.",
                    "",
                    "Supports built-in user roles and groups for access control.",
                    "Includes System Config file for dynamic application control and debug reporting.",
                    "Logs system and user activity.",
                ]
            },

            packages: {
                title: "Main Packages",

                body: [
                    "Meteor 1.10.2",
                    "MongoDB 4.2.5",
                    "Bulma 0.9.0 imported as separate files to allow for customization",
                    "Svelte 3.21",
                    "Svelte-router-spa",
                    "Svelte-loadable to reduce initial bundle size.",
                    "Uses selected Lineawesome svg icons to minimize bundle size",
                    "Supports Fontawesome 5 formatted svg files."
                ]
            },

            explore: "Explore Pages",
        }
    },

    components: {

        tabbed: {
            en: [
                {
                    icon: "iconGeneral",
                    label: "General",
                    dbContent: null,  //dbContent: { coll: "", name: ""}
                    lead: "Pages that are generally accessible by unlogged in users.",
                    text: [
                        "<a href='/home'>Home</a> - this page.",

                        "<a href='/template'>Template</a> - very basic page to be copied and modified to its intended use.",

                        "<a href='/icons'>Icons</a> - list of all Lineawesome icons used in this application.  " +
                        "Includes examples of various sizes and system colours.",

                        "<a href='/colours'>Colours</a> - display of all system colour constants.",

                        "<a href='/learn'>Learn</a> - mini-wiki that provides content to help a client to use your application.",
                    ]
                },

                {
                    icon: "iconComponents",
                    label: "Components",
                    dbContent: null,
                    lead: "Special purpose pages that typically are only available to valid and logged in users.",
                    text: [
                        "<a href='/cards'>Cards</a> - basic examples of card component.",

                        "<a href='/content-widgets'>Tab Widgets</a> - example of tabbed and accordion components.",

                        "<a href='/widgets'>Widgets</a> - a variety of dashboard like display widgets.",

                        "<a href='/listForm'>Starter ListForm</a> - list display and form builder example. " +
                        "Form includes all of the various field types and configurations.",

                        "<a href='/login'>Login</a> - for a user that wants to login with an email / password or " +
                        "any third party service.",
                    ]

                },

                {
                    icon: "iconUsers",
                    label: "User",
                    dbContent: null,
                    lead: "User pages for only logged in or logging in users.",

                    text: [
                        "<a href='/my-profile'>My Profile</a> - only seen by a logged in user.  " +
                        "Allows for the addition of extra user information into a 'profile' field.",

                        "<a href='/changePassword'>Change Password</a> - only available to a logged in user. " +
                        "Typical change password form",

                        "<a href='/pubSub'>Pub Sub</a> - example of connecting to MongoDB and using <em>Change Streams</em> " +
                        "to reactively respond to chnages in a collection.",
                    ]
                },

                {
                    icon: "iconControlContent",
                    label: "Content Control",
                    dbContent: null,
                    lead: "Pages only available to system admin for general maintenance.",
                    text: [
                        "<a href='/buildContent'>Build Content</a> - list / form to enter content into the mini-wiki.  " +
                        "This privilege is reserved for system admins only.",

                        "<a href='/documentation'>Jsdoc</a> - Jsdoc style documentation for all of the executable files in this application.  " +
                        "This is for development purposes to aid a programmer in building more functionality.",

                        "<a href='/logsSystem'>System Logs</a> - a variety of dashboard like display widgets.",

                        "<a href='/logsUsers'>User Logs</a> - a variety of dashboard like display widgets.",
                    ]
                },

                {
                    icon: "iconAdminOnly",
                    label: "Admin Only",
                    dbContent: null,
                    lead: "Pages only available to system super admin role.",
                    text: [
                        "<a href='/users'>Users</a> - list and form to set up user information and role / group access.",

                        "<a href='/sysConfig'>System Config</a> - list and form to control certain system wide configuration options.",

                        "<a href='/exportImport'>Export Import</a> - administration to send a JSON formatted collection file to a user " +
                        "computer.  User can also upload a JSON file to a collection.",
                    ]
                },
            ]
        }
    }
};
