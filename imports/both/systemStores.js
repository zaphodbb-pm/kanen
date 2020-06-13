/**
 * Finds a user's language preference
 *
 * @memberof Structure:Client
 * @function getLang
 * @locus Client
 *
 * @param {String} lang - browser derived: user language preference as a two letter code
 *
 * @param {Object} userPosition - browser derived: lat / lng co-ordinates
 * @param {Object} userLoggedIn - client derived: store variable gets returned Meteor.user() object at login
 * @param {Object} userExtras - server derived: logged in user gets their extra account information
 *
 * @param {Array} showRoutes - user filtered list of routes to show
 * @param {String} lastRoute - last viewed page before new page selected
 *
 * @returns {String} lang - two letter language code
 *
 */

import {writable} from 'svelte/store'
//import {readable} from 'svelte/store'

//* set language preference
import {getLang} from '../functions/getLang'
export let lang = writable( getLang("en") );

//* set user stores
export let userPosition = writable( {} );
export let userExtras = writable( {} );
export let userLoggedIn = writable( null);

//* set extra route information
export let showRoutes = writable( [] );
export let lastRoute = writable( [] );
