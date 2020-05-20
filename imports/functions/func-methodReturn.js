/**
 * @summary Handles info returned from a method call.
 *
 * @memberof Functions
 * @function methodReturn
 * @locus Client
 *
 * @param {String|Object} err - error code or message from method
 * @param {String|Object|Array|Number} res - result data from method call
 * @param {String} label - method name
 * @return {String|Object|Array|Number}
 *
 */

import {debugConsole} from './func-debugConsole'


//** deals with return values from a server method call
export function methodReturn(err, res, label) {
    if (err) {
        debugConsole("s", `method_${label}`, [ err ], [ "Error" ] );
    }
    if (res) {
        debugConsole("s", `method_${label}`, [ res ], [ "Return" ] );
    }
}

