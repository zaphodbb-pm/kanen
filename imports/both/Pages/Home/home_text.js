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
    title:  {en: "MSB-Starter - A Seedling Starter Package"},
    lead:   {en: ""},
    body:   {en: ""},
};


export const page = {

    page: {
        en: {
            intro: "<p>The <b>MSB-Starter Package</b> is built on the most current technologies as of 2020 using the latest releases of Meteor, MongoDb, Svelte and Bulma.  " +
                "It is also an opinionated view of the work that needs to get done.  </p>" +
                "<p>This package is clearly not for everyone nor does it try to accommodate the latest new ideas.  " +
                "This package is meant for business people / product managers that need to get outcomes quickly with applications " +
                "that can scale during the initial growth phase of a company.</p>",

            quote: "“It can scarcely be denied that the supreme goal of all theory is to make the irreducible basic elements as simple " +
                "and as few as possible without having to surrender the adequate representation of a single datum of experience. <br/> <br />" +
                "<em>actual quote by Albert Einstein often rewritten as:</em> <br /> <br />" +
                "“Everything should be as simple as it can be, but not simpler” ",

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

                    "Each page is self contained. Can be removed or added by editing route table.",
                    "Leverages Svelte-loadable to minimize initial app load.",
                    "Uses Svelte stores for state management.",
                    "Uses Svelte context for text and other static information.",
                    "All text is abstracted on a per page basis to allow for internationalization and easy maintenance.",
                    "Includes System Config file for dynamic application control and debug reporting.",
                    "Includes a mini-wiki to provide user learning resources.",

                    "Built-in form builder with 16 configurable field types. Supports tabbed sections and horizontal grouped fields.",
                    "Built-in document lister with filter plugins and compound search. Supports table or grid layouts.",
                    "Supports built-in user roles and groups for access control.",

                    "Includes a variety of widgets / components for content display or dashboard indicators.",
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
            }
        }
    },

    components: {
        list: {
            name: {en: "Name"}
        },

        form: {
            name: {en: "Name"}
        },

        widget: {
            title: {en: "Title"}
        }
    }
};
