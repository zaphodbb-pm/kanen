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


//* set language preference

/*
import {writable} from 'svelte/store'
import {getLang} from './func-getLang'
export let lang = writable( getLang("en") );

 */
import {readable} from 'svelte/store'
import {getLang} from './func-getLang'

export const lang = readable( getLang("en") );
