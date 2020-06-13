/**
 * Route config information for MyProfile page.
 *
 * @memberof Pages:MyProfile
 * @function myProfile_route
 * @locus Client
 * @augments myProfile
 *
 * @returns {Object}
 *
 * @notes
 *      1.  Remember to register this page at /imports/both/routes
 */


import {getLang} from '/imports/functions/getLang'
import {i18n} from '/imports/functions/i18n'
import {nav} from './myProfile_text_nav'
import MainPage from '/imports/both/pageStructure/MainPage.svelte'

import Page from './myProfile_loader.svelte'
//import Page from './changePassword.svelte'


let lang = getLang("en");

export default {
    name: "/myProfile",                      // link that router will use
    layout: MainPage,
    component: Page,
    //redirectTo: 'company',
    //onlyIf: { guard: userIsAdmin, redirect: '/login' },

    icon: "iconMyProfile",                   // Navbar icon to show
    label: i18n(nav, "", lang),    // Navbar text to show

    roles: {                                // roles that can see this link in Navbar and be routed to
        read: ["basic", "standard", "pro", "siteAdmin"],
        write: ["basic", "standard", "pro", "siteAdmin"]
    },

    group: 0,                               // for side navigation; group routes into a block
    isNavMobile: false,                     // (optional) show link in mobile nav block at bottom or top
};
