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
//import '/imports/both/main_globals'

// get all collections
//import '/imports/both/collections'


//* build system wide information
if (Meteor.user()) {
    navigator.geolocation.getCurrentPosition(function (position) {
        let out = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,

            accuracy: position.coords.accuracy,
            altitude: position.coords.altitude,
            altitudeAccuracy: position.coords.altitudeAccuracy,
            heading: position.coords.heading,
            speed: position.coords.speed,
        };

        Session.set("userPosition", out);
    });
}else{
    Session.set("userPosition", {});
}


//* load svelte framework
import App from '../imports/client/structure/App.svelte'

const app = new App({
    target: document.getElementById("svelte-app-top"),
});
