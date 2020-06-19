/**
 * @summary Creates file names with date and time stamp.
 *
 * @memberof Functions
 * @function fileName
 * @locus Client
 *
 * @param {String} name - becomes prefix fragment of file name
 * @param {String} ext - file extension to add
 * @return {string} - 'name_14May2018-14:50:21.ext' as a formatted and date stamped file name
 *
 */

export function fileName(name, ext) {
    let now = new Date();
    let stamp = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}-${now.getHours()}_${now.getMinutes()}`;
    return name + "_" + stamp + "." + ext;
}
