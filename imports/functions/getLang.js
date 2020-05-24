/**
 * Finds a user's language preference
 *
 * @memberof Functions
 * @function getLang
 * @locus Client
 *
 * @returns {String} - two letter language code
 *
 */


export function getLang(choice){
    let lang = navigator.languages ? navigator.languages[0] : navigator.language;
    return lang ? lang.substr(0, 2) : (choice ? choice : "en");
}
