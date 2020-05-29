/**
 * Calculates white or black text colour for a given RGB background colour.
 *
 * @memberof Functions
 * @function textColour
 * @locus Client
 *
 * @param {String} rgb - typically "rgb(128, 100, 64)"
 *
 * @return {string} "#000000" or "#FFFFFF"
 *
 */

export function textColour(rgb) {

    let vals = rgb.replace("rgb(", "").replace(")", "");
    vals = vals.split(",");

    //** get best contrast colour for text
    let yiq = Math.round((parseInt(vals[0]) * 299 + parseInt(vals[1]) * 587 + parseInt(vals[1]) * 114) / 1000);
    return (yiq >= 128) ? "#000000" : "#FFFFFF";
}
