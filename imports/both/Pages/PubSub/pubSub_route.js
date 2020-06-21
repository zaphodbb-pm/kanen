/**
 * Route config information for PubSub page.
 *
 * @memberof Pages:PubSub
 * @function pubSub_route
 * @locus Client
 * @augments pubSub
 *
 * @returns {Object}
 *
 * @notes
 *      1.  Remember to register this page at /imports/both/routes
 */


import {getLang} from '/imports/functions/getLang'
import {i18n} from '/imports/functions/i18n'
import {nav} from './pubSub_text_nav'
import MainPage from '/imports/both/pageStructure/MainPage.svelte'

import Page from './pubSub_loader.svelte'
//import Page from './pubSub.svelte'


let lang = getLang("en");

export default {
    name: "/pubSub",                      // link that router will use
    layout: MainPage,
    component: Page,
    //redirectTo: 'company',
    //onlyIf: { guard: userIsAdmin, redirect: '/login' },

    icon: "iconPubSub",                   // Navbar icon to show
    label: i18n(nav, "", lang),         // Navbar text to show

    roles: {                                // roles that can see this link in Navbar and be routed to
        read: ["all"],
        write: ["none"]
    },

    group: 1,                               // for side navigation; group routes into a block
    isNavMobile: false,                     // (optional) show link in mobile nav block at bottom or top
};
