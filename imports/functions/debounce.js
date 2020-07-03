/**
 * Returns a function, that, as long as it continues to be invoked, will not be triggered.
 *
 * @memberof Functions
 * @function debounce
 * @locus Client
 *
 * @param {Function} func - function to wrap
 * @param {Number} wait - timeout in ms (default "100")
 * @param {Boolean} immediate - whether to execute at the beginning (default "false")
 *
 * @see {@link http://unscriptable.com/2009/03/20/debouncing-javascript-methods/|debounce}
 *
 * @notes
 * The function will be called after it stops being called for N milliseconds.
 * If `immediate` is passed, trigger the function on the leading edge, instead of the trailing.
 * The function also has a property 'clear' that is a function which will clear the timer to prevent
 * previously scheduled executions.
 *
 */

export function debounce(func, wait, immediate) {

    let timeout, args, context, timestamp, result;
    if (wait === null) {
        wait = 100;
    }

    function later() {
        let last = Date.now() - timestamp;

        if (last < wait && last >= 0) {
            timeout = setTimeout(later, wait - last);
        } else {
            timeout = null;
            if (!immediate) {
                result = func.apply(context, args);
                context = args = null;
            }
        }
    }

    let debounced = function () {
        context = this;
        args = arguments;
        timestamp = Date.now();
        let callNow = immediate && !timeout;
        if (!timeout) timeout = setTimeout(later, wait);
        if (callNow) {
            result = func.apply(context, args);
            context = args = null;
        }

        return result;
    };

    debounced.clear = function () {
        if (timeout) {
            clearTimeout(timeout);
            timeout = null;
        }
    };

    debounced.flush = function () {
        if (timeout) {
            result = func.apply(context, args);
            context = args = null;

            clearTimeout(timeout);
            timeout = null;
        }
    };

    return debounced;
}
