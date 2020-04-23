/**
 * Main entry point for client code.
 * All common routines are imported here.
 *
 *
 * @memberof Structure:Client
 * @function main
 * @isTemplate true
 * @locus Client*
 *
 * @notes
 *      1. Meteor_extensions.js and themeFiles.scss are eagerly loaded at startup.
 *
 */


//* get our common support modules

//* get main namespace for this system and constants
import '/imports/both/main_globals'

// get all collections
//import '/imports/both/collections'

// get top level structural parts
//import './main.html'
//import '/imports/client/startup/main_comm_channels'
//import '/imports/client/startup/main_imports'


//* load svelte framework
import App from '../imports/client/structure/App.svelte'

const app = new App({
    target: document.getElementById("svelte-app-top"),
});
