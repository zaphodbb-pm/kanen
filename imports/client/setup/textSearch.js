/**
 * @summary System wide search bar language strings.
 *
 * @memberof Structure:Client
 * @function textSearch
 * @locus Client
 *
 * @returns {Object} label, helpText
 *
 */

export default{
    label: {
        en: "Search",
    },

    helpText: {
        en: "You can use simple text search across all fields. " +
            "Compound 'and' searches are supported by separating terms with '+'. " +
            "Compound 'or' searches can be done by separating terms with ';'." +
            "You can also use '!' as a not operator to find items that do not contain a term.  " +
            "The operator precedence is NOT '!' then AND '+' then OR ';'. <br/><br/>" +
            "Example: age+!male;sport+run will find all records with the string 'age' and not 'male' " +
            "or all records with the string 'sport' and 'run'.  " +
            "This returns two sets of records with the defined term searches.",
    }
}
