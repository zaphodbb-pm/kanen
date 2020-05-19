/**
 * @summary Text for Documentation Page.
 *
 * @memberof Pages:pageDocumentation
 * @function documentation_text
 * @locus Client
 * @augments documentation
 *
 * @returns {Object}
 */

export default {
    navLabel: {en: "Jsdoc"},

    //** page header; set to null to not display header or a specific item
    header:   {
        title:  {en: "Software Documentation"},
        lead:   {en: "List of all software pages, routines and components."},
        body:   null //{en: ""},
    },

    page: {},

    components: {

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

