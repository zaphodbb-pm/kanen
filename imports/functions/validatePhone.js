/**
 * Validate a user entered phone number.
 *
 * @memberof Functions
 * @function validatePhone
 * @locus Anywhere
 *
 * @param {String} phone - string of phone number to check
 *
 * @returns {Object} - {test: pass / fail, filter: telephone number with extraneous chars removed}
 *
 */


export function validatePhone(phone){
    //* clean input string
    if(phone){
        let tel = phone.toLowerCase().replace(/[^\+\d\s\-\.\(\)\#\x\ext]+/g, "");

        //* test string for valid phone numbner
        let re = /^(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:\(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*\)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)?([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?$/;

        return {
            test: re.test(tel),
            filter: tel
        }
    }else{
        return "";
    }
}
