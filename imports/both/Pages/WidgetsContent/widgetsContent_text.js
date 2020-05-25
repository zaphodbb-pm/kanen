/**
 * @summary Labels for WidgetsContent.
 *
 * @memberof Pages:WidgetsContent
 * @function widgetsContent_text
 * @locus Client
 * @augments widgetsContent
 *
 * @returns {Object}
 */

export default {
    navLabel: {en: "Content"},

    header:   {
        title:  {en: "Content Widgets"},
        lead:   {en: "A variety of content management widgets"},
        body:   {en: ""},
    },


    page: {},

    components: {

        tabbed: {
            en: [
                {
                    icon: "iconMusic",
                    label: "Music",
                    text: "The <b>quick</b> brown fox jumped over the <em>lazy</em> black dog.",
                    dbContent: null  //dbContent: { coll: "", name: ""}
                },

                {
                    icon: "iconFilm",
                    label: "Films",
                    text: "some second tab text",
                    dbContent: null
                },

                {
                    icon: "iconImage",
                    label: "Pictures",
                    text: "Some pithy content talking about pictures.",
                    dbContent: null
                },

                {
                    icon: "iconDoc",
                    label: "Docs",
                    text: "<p>Third tab has extra long text.  This is formed into sentences and maybe also paragraphs.</p></br>" +
                        "<p> Note that this area also supports html codes because we know the source is reliable.</p>",
                    dbContent: null
                },
            ]
        },

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
