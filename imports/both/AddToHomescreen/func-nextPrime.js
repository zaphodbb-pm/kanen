/**
 * @summary Can be used to calculate the next prime number, a possible way to calculate when to next prompt.
 *
 * @memberof PWA
 * @function nextPrime
 * @locus Client
 *
 * @param {Number} value
 *
 * @return {Number} - next number
 *
 */

export function nextPrime( value ) {
    while ( true ) {
        let isPrime = true;

        if ( isNaN( value ) ) {
            value = 0;
        }

        //increment the number by 1 each time
        value += 1;

        let squaredNumber = Math.sqrt( value );

        //start at 2 and increment by 1 until it gets to the squared number
        for ( let i = 2; i <= squaredNumber; i++ ) {
            //how do I check all i's?
            if ( value % i === 0 ) {
                isPrime = false;
                break;
            }
        }

        if ( isPrime ) {
            return value;
        }
    }
}
