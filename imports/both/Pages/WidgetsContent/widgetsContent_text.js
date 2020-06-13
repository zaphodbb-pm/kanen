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

//** page header; set to null to not display header or a specific item
export const header = {
    title:  {en: "Tab Widgets"},
    lead:   {en: "A variety of tabbed content widgets"},
    body:   {en: ""},
};


export const page = {

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
        }
    }
};
