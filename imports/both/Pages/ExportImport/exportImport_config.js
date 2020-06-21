/**
 * Configuration for ExportImport components (optional).
 *
 * @memberof Pages:ExportImport
 * @function exportImport_config
 * @locus Client
 * @augments exportImport
 *
 * @returns {Object}
 */

export default {

    components: {
        collections: {
            field: "collections",
            fieldType: "select",
            optional: true,

            css: "is-fullwidth",
            attributes: {},
            params: {type: "staticSelect"},
            defaultValue: {_id: "", name: ""},
        },

        fileInput: {
            field: "fileInput",
            fieldType: "fileInput",
            optional: true,
            adjustLabel: true,

            attributes: {},
            params: {format: "text", type: ["json"]},
            defaultValue: {name: "", src: ""},
        }
    },
};
