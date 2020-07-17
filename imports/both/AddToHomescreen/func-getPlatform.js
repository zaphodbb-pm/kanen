/**
 * @summary Returns a browser name.
 *
 * @memberof PWA
 * @function getPlatform
 * @locus Client
 *
 * @param {Object} platform - browser types
 * @param {Boolean} native - pwa is native to browser
 * @param {String} debug - use browser type from options
 *
 * @return {string} - browser type
 *
 */


export function getPlatform( platform, debug, native,  ) {
    if (debug && typeof debug === "string" ) {
        return debug;
    }

    if ( platform.isChromium && ( native === undefined ) ) {
        return "native";
    } else if ( platform.isFireFox ) {
        return "firefox";
    } else if ( platform.isiPad ) {
        return "ipad";
    } else if ( platform.isiPhone ) {
        return "iphone";
    } else if ( platform.isOpera ) {
        return "opera";
    } else if ( platform.isSamsung ) {
        return "samsung";
    } else if ( platform.isEdge ) {
        return "edge";
    } else if ( platform.isChromium ) {
        return "chromium";
    } else {
        return "";
    }
}
