/**
 * Finds a user's language preference
 *
 * @memberof Structure:Client
 * @function getLang
 * @locus Client
 *
 * @returns {String} lang - two letter language code
 *
 */

import {writable} from 'svelte/store'
//import {readable} from 'svelte/store'

//* set language preference
import {getLang} from '../../functions/func-getLang'
export let lang = writable( getLang("en") );
