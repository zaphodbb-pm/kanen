/**
 * @summary Labels for PageThree.
 *
 * @memberof Pages:PageThree
 * @function pageThree_text
 * @locus Client
 * @augments pageThree
 *
 * @returns {Object}
 */

export default {
    navLabel: {en: "Widgets"},

    header:   {
        title:  {en: "Widgets"},
        lead:   {en: "A variety of widgets and their config objects."},
        body:   null //{en: "Supporting text for header"},
    },

    page: {
        col1:{en: "Infobox"},
        col2:{en: "Progress Bars"},
        col3:{en: "Gauges"}
    },

    components: {
        infobox: {
            en: {
                title: "Box Title",
                barText: "Progress Bar Text",
                prefix: "$",
                suffix: "-suffix"
            }
        },

        expander1: {
            en: {
                icon: "iconPayload",
                logo: "",
                title: "Payload",
                subTitle: "JSON object format"
            }
        },

        expander2: {
            en: {
                icon: "iconConfig",
                logo: "",
                title: "Config",
                subTitle: "JSON object format"
            }
        },

        progExample: {
            en: {
                labels: ["One", "Two", "Three"]
            }
        },

        gaugeRing: {
            en: {
                title: "Gauge1",                  // main title for widget
                description: "Circular Ring",     // more detail
            }
        },

        gaugePie: {
            en: {
                title: "Gauge2",                // main title for widget
                description: "Circular Pie",    // more detail
            }
        },

        list: {
            name: {en: "Name"}
        },

        form: {
            name: {en: "Name"}
        },
    }
};
