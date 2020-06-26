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

export default {

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
    }
};
