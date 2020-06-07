/**
 * @summary Labels for Colours page.
 *
 * @memberof Pages:Colours
 * @function colours_text
 * @locus Client
 * @augments colours
 *
 * @returns {Object}
 */


//** page header; set to null to not display header or a specific item
export const header = {
    title:  {en: "Colours Page"},
    lead:   {en: "Shows the system wide colour constants."},
    body:   {en: "Import the colour setting objects into the Svelte component as: </br></br>" +
            "<pre>import { colors, components, theme } from '/imports/client/setup/systemGlobals'</pre></br>" +
            "add the values to a component's class or style as colors.PURPLE, components.BG_CARD or theme.THEME_INFO."

    },
};


export const page = {

    page: {
        swatches: {en: "Colour Swatches"},
        boxes: {en: "Box / Component Themes"},
        themes: {en: "Element themes"}
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
