/**
 * @summary Text for file browse input field.
 *
 * @memberof Components_Form
 * @function vue-fileBrowse_text
 * @locus Client
 * @isTemplate true
 * @augments vue-fileBrowse
 *
 * @returns {Object} kanen.i18n.comp_fileBrowse
 *
 */
kanen.i18n.vue_fileBrowse = {

    file_too_long: {
        en: "Can't load files larger than " + Math.round(kanen.constants.MAX_IMAGE_SIZE / 1024) + "KB.  <br/>Size = ",
    },

    file_wrong_type: {
        en: "File type is not supported.  <br/>Type = "
    },
};