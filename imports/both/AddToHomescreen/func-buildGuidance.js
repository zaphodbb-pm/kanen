/**
 * @summary Returns a browser name.
 *
 * @memberof PWA
 * @function buildGuidance
 * @locus Client
 *
 * @param {Object} prompts
 *
 * @return {Array} - urls
 *
 */


export function buildGuidance( prompts ) {
    let guideanceTagetURLs = [];
    for ( let key in prompts ) {
        if ( prompts.hasOwnProperty( key ) ) {
            let target = prompts[ key ].targetUrl;
            if ( target ) {
                guideanceTagetURLs.push( target );
            }
        }
    }

    return guideanceTagetURLs;
}
