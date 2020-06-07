/**
 * Control the output of debug messages to the browser console.
 *
 * @memberof Functions
 * @function debugConsole
 * @locus Anywhere
 *
 * @param {String} level - see below
 * @param {String} name - label to help identify / tag the console message
 * @param {Array} vrbl - list of in program variable to report on
 * @param {Array} label - labels to prefix variables for identification
 * @param {String} debugOptions - a string of options that have been turned by system
 * @return nothing - outputs message to console
 *
 * @example
 *    level = (String): one of "o", "e", "f", "m", "r", "s", "v"
 *              "o" = Blaze onRendered, onCreated or onDestroyed sections.
 *              "e" = Blaze events sections.
 *              "f" = functions.
 *              "m" = collection methods.
 *              "r" = reactive variable settings.
 *              "s" = system messages.
 *              "v" = Vue components.
 *              "w" = Vue component method functions.
 *
 *              Note that "oefmrsv" will send messages from all sections.
 *              Any combination of switches can be used to select the appropriate amount of messages.
 *              Also, an empty string "" will stop all messages.
 *
 */

export function debugConsole(level, name, vrbl, label, debugOptions) {
    if(!debugOptions || !Array.isArray(vrbl) ){ return null; }


    //** if the debug level is set in SysConfigs.debugLevel, then output message
    if( debugOptions.includes(level)  ){
        vrbl.forEach( (v, idx) => {
            let labelOut = label && label[idx] ? label[idx] : "out";
            let out = JSON.parse( JSON.stringify(v) );
            console.log(`debug ${name}: ${labelOut}= `, out);
        });
    }
}
