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
            intro: "The <b>MSB-Starter Package</b> is built on the most current technologies as of 2020 using the latest releases of Meteor, MongoDb, Svelte and Bulma.  " +
                "It is also an opinionated view of the work that needs to get done.  " +
                "This package is clearly not for everyone nor does it try to accommodate the latest new ideas.  " +
                "This package is meant for business people / product managers that need to get outcomes quickly and " +
                "can scale during the initial growth phase of a company.",

            quote: "“It can scarcely be denied that the supreme goal of all theory is to make the irreducible basic elements as simple " +
                "and as few as possible without having to surrender the adequate representation of a single datum of experience. <br/> <br />" +
                "<em>actual quote by Albert Einstein often rewritten as:</em> <br /> <br />" +
                "“Everything should be as simple as it can be, but not simpler” ",

            philosophy: {
                title: "Philosophy",

                body: [
                    "Adherence to Standards",
                    "Keep it light weight",
                    "Componentization",
                    "Configuration rather than programming"
                ]
            },

            features: {
                title: "Features",

                body: [
                    "Meteor 1.10.2",
                    "MongoDb 4.2.5",
                    "Bulma ",
                    "Componentization",
                    "Configuration rather than programming"
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
