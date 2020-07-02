/**
 * @summary Text for Documentation Page.
 *
 * @memberof Pages:Documentation
 * @function documentation_text
 * @locus Client
 * @augments documentation
 *
 * @returns {Object}
 */


//** page header; set to null to not display header or a specific item
export const header = {
    en: {
        title:  "Software Documentation",
        lead:   "List of all software pages, routines and components.",
        body:   null //"",
    }
};


export const page = {

    page: {
        howToUse: {
            en: '"Build Jsdoc" button scans /imports and /client directories for .svelte files and extracts the Jsdoc portion ' +
                'and builds the &lt;filename&gt;.jsdoc file that can be picked up by Jsdoc. <br /><br /> ' +
                'Second step is to run jsdoc to build all of the appropriate files.<br /><br />' +
                '"Get Documentation" forces the server to find the raw Jsdoc file and format for display.'
        }
    },

    components: {

        btnJsdoc: {
            en: "Build Jsdoc"
        },

        btnGetDocs: {
            en: "Get Documentation"
        },

        documentation: {
            en: {
                notSupported: "Documentation is not supported for this environment.",

                setup: "<p>We use automated JSDoc generation for Meteor projects in the form of the standard " +
                    "<a href='http://usejsdoc.org/'>jsdoc</a>.  Vue components are handled by the add-on " +
                    "<a href='https://github.com/Kocal/jsdoc-vuejs'>jsdoc-vuejs</a>.  " +
                    "See the link for set up and running the program over your code files.  " +
                    "From the parent to your code directory, run jsdoc as: " +
                    "<pre>jsdoc ./ -r -c jsdoc-conf.json -X > ./private/raw-documentation.json</pre>" +

                    "<p>This puts the raw documentation into the private folder.  Remove the file <strong>documentation.json</strong>.  " +
                    "This forces Meteor server to run a formatting routine that converts the raw content into a formatted file for display.</p>",

                consider: "How to use this <i>documentation</i> section"
            }
        },
    }
};

