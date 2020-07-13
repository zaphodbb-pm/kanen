/**
 * Main entry point for client code.
 * All common routines are imported here.
 *
 * @memberof Structure:Client
 * @function main
 * @locus Client
 *
 * @notes
 *      1. Meteor_extensions.js and themeFiles.scss are eagerly loaded at startup.
 *
 */



import { Meteor } from 'meteor/meteor'
//* prepare to add PWA through service worker
Meteor.startup(() => {
    navigator.serviceWorker
        .register('/sw.js')
        .then(() => console.info('service worker registered'))
        .catch(error => {
            console.log('ServiceWorker registration failed: ', error)
        })
})


//* load Meteor specific files
import '/imports/both/collections'


//* load svelte framework
import App from '../imports/both/pageStructure/App.svelte'

const app = new App({
    target: document.getElementById("svelte-app-top"),
});
