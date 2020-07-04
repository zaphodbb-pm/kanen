/**
 * @summary Formats a string of digits into a North American formatted phone number.
 *
 * @memberof Functions
 * @function formatPhoneNumber
 * @locus Client
 *
 * @param {String} str - phone digits
 *
 * @return {string} (613) 234-1234
 *
 */

export function formatPhoneNumber(str) {
    let cleaned = ('' + str).replace(/\D/g, '');                // Filter only numbers from the input
    let match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);  // Check if the input is of correct
    let out = "";

    if (match) {
        let intlCode = (match[1] ? '+1 ' : '');                  //Remove matched extension code and change to format for any country code.
        out = [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('');
    }

    return out;
}
