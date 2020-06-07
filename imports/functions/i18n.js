/**
 * @summary Gets an object and finds text string based on user language preference.
 *
 * @memberof Functions
 * @function i18n
 * @locus Client
 *
 * @param {Object} allText - imported text object
 * @param {String} field - field in the main imported text object
 * @param {Writable<String>} lang - two letter language code
 *
 * @returns {String} - language translated text
 *
 */

export function i18n(allText, field, lang) {
    let out = "";
    let language = lang && typeof lang === "string" && lang.length === 2 ? lang : "en";

    if (allText && typeof allText === 'object') {
        if(field && typeof field === 'string'){
            out = allText[field] && allText[field][language] ? allText[field][language] : "";
            out = out ? out : "";
        }else{
            out = allText[language] ? allText[language] : "";
        }
    }

    return out;
}
