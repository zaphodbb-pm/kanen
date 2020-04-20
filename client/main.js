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
 *
 */


//** get our common support modules
import {Meteor} from 'meteor/meteor'

//* get main namespace for this system and constants
//import '/imports/both/main_globals'

// get all collections
//import '/imports/both/collections'

// get top level structural parts
import './main.html'
//import '/imports/client/startup/main_comm_channels'
//import '/imports/client/startup/main_imports'

// load the page router after required resources are available
//import '/imports/both/routes'
//import {methodReturn} from "../imports/client/functions/func-methodReturn";

// get top level structural parts
import './main.html'
import App from '../imports/client/startup/App.svelte'


const app = new App({
    target: document.getElementById("root"),
    data: {
        name: "Svelte"
    }
});
