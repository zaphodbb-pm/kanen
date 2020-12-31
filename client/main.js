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


//* load Meteor specific files
import '/imports/both/collections'


//* prepare to add PWA through service worker
import { Meteor } from 'meteor/meteor'

Meteor.startup(() => {

    if('serviceWorker' in navigator){
        if(!navigator.serviceWorker.controller){

            navigator.serviceWorker
                .register('/sw.js')
                .then(() => {
                    console.info('service worker registered');
                })
                .catch(error => {
                    console.log('ServiceWorker registration failed: ', error)
                })
        }
    }else{
        console.log("Service Worker is not supported in this browser");
    }
});


//* load svelte framework
import App from '/imports/both/PageStructure/App.svelte'

const app = new App({
    target: document.getElementById("svelte-app-top"),
});
