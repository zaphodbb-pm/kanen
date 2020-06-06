/**
 * Main entry point for client code.
 * All common routines are imported here.
 *
 * @memberof Structure:Client
 * @function main
 * @locus Client*
 *
 * @notes
 *      1. Meteor_extensions.js and themeFiles.scss are eagerly loaded at startup.
 *
 */


//* load svelte framework
import App from '../imports/both/pageStructure/App.svelte'

const app = new App({
    target: document.getElementById("svelte-app-top"),
});
