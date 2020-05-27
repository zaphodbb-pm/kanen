/**
 * @summary Text for complex fieldset on the Starter page.
 *
 * @memberof Pages:Starter
 * @function starter_form_text_fieldset
 * @locus Client
 * @augments starter_form
 *
 * @returns {Object} formText
 */


export default {

    config: {
        en: {

            comp0: {
                label: "Active",
                helpText: "",

                attributes: {},
                params: {},
                optional: true,
                defaultValue: false,
            },

            comp1: {
                label: "Mise Name",
                helpText: "",

                attributes: {type: "text", maxlength: 64},
                params: {},
                optional: true,
                defaultValue: "",
            },

            comp2: {
                label: "Mise Size",
                helpText: "",
                selects: [
                    {_id: "none", name: "Select One ..."},
                    {_id: "ramiken", name: "Ramiken"},
                    {_id: "cup", name: "Cup"},
                    {_id: "plate", name: "Plate"},
                    {_id: "small", name: "Small Bowl"},
                    {_id: "medium", name: "Medium Bowl"},
                    {_id: "large", name: "Large Bowl"},
                    {_id: "xl", name: "Extra Large Bowl"},
                ],

                attributes: {},
                params: {type: "staticSelect"},
                optional: true,
                defaultValue: {_id: "", name: ""},
            },

            comp3: {
                label: "Food Hold Time",
                helpText: "The maximum time that this prepared food can be safely stored before cooking.",
                selects: [
                    {_id: "none", name: "Select One ..."},
                    {_id: "min30", name: "30 Minutes"},
                    {_id: "min60", name: "60 Minutes"},
                    {_id: "hr2", name: "2 Hours"},
                    {_id: "hr4", name: "4 Hours"},
                    {_id: "hr8", name: "8 Hours"},
                    {_id: "hr24", name: "24 Hours"},
                ],

                attributes: {},
                params: {type: "staticSelect"},
                optional: true,
                defaultValue: {_id: "", name: ""},
            },

            td0: {
                label: "Qty",
                helpText: "",

                attributes: {type: "number", min: 0, step: 0.125},
                params: {},
                optional: true,
                defaultValue: 0,
            },

            td1: {
                label: "Units",
                helpText: "",

                selects: {
                    one: [
                        {_id: "tsp", name: "tsp"},
                        {_id: "Tbsp", name: "Tbsp"},
                        {_id: "fl_oz", name: "fl oz"},
                        {_id: "cup", name: "cup"},
                        {_id: "qt", name: "quart"},
                        {_id: "oz", name: "oz"},
                        {_id: "lb", name: "lb"},
                        {_id: "count", name: "count"},
                    ],

                    two: [
                        {_id: "tsp", name: "tsp-m"},
                        {_id: "Tbsp", name: "Tbsp-m"},
                        {_id: "gm", name: "gm"},
                        {_id: "kg", name: "Kg"},
                        {_id: "ml", name: "ml"},
                        {_id: "L", name: "L"},
                        {_id: "count", name: "count"},
                    ],
                }
            },

            td2: {
                label: "Ingredient",
                helpText: "",

                attributes: {},
                params: {
                    type: "dynamicSelect",      // or "dynamicSelectSearch"
                    coll: "nutrients",
                    rows: 10,

                    query: {
                        FdGrp_Desc: {
                            $nin: [
                                "Baby Foods",
                                "Soups, Sauces, and Gravies",
                                "Breakfast Cereals",
                                "Baked Products",
                                "Sweets",
                                "Fast Foods",
                                "Meals, Entrees, and Side Dishes",
                                "Snacks",
                                "American Indian/Alaska Native Foods",
                                "Restaurant Foods"
                            ]
                        }
                    },

                    filter: {fields: {Shrt_Desc: 1}},
                    options: {sort: {name: 1}},
                },

                optional: true,
                defaultValue: {_id: "", name: ""},
            },

            td3: {
                label: "Preparation",
                helpText: "",

                attributes: {maxlength: 2000, rows: 2},
                params: {},
                optional: true,
                defaultValue: "",
            },

        }
    }
};





