/**
 * Configuration for Learn components (optional).
 *
 * @memberof Pages:Learn
 * @function learn_config
 * @locus Client
 * @augments learn
 *
 * @returns {Object}
 */

export const pageConfig =  {

    components: {
        getLang: {
            field: "getLang",
            fieldType: "select",
            optional: true,

            css: "is-fullwidth",
            attributes: {},
            params: {type: "staticSelect"},
            defaultValue: {_id: "all", name: "All Options"},
        },

        readMode: {
            field: "readMode",
            fieldType: "switch",
            optional: true,

            css: "is-fullwidth",
            attributes: {},
            params: {},
            defaultValue: true,
        },
    }
};
