/**
 * Finds a user's language preference
 *
 * @memberof Structure:Client
 * @function systemStores
 * @locus Client
 *
 * @param {Object} sysConfig - server derived: get certain system parameters for client side configuration
 * @param {Boolean} showWidget - sysConfig derived: show extra components for dev, debug work
 * @param {String} sysDebug - sysConfig derived: string list of items that will log messages to the console
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

//* set system parameters
export let sysConfig = writable( null );
export let showWidget = writable( false );
export let sysDebug = writable( "" );

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


//* build communication channels
export let messages = writable( [] );       // general messages to display
