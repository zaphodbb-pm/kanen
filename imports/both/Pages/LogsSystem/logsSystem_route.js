/**
 * Route config information for LogsSystem page.
 *
 * @memberof Pages:LogsSystem
 * @function logsSystem_route
 * @locus Client
 * @augments logsSystem
 *
 * @returns {Object}
 *
 * @notes
 *      1.  Remember to register this page at /imports/both/routes
 */


import {getLang} from '/imports/functions/getLang'
import {i18n} from '/imports/functions/i18n'
import {nav} from './logsSystem_text_nav'
import MainPage from '/imports/both/pageStructure/MainPage.svelte'

import Page from './logsSystem_loader.svelte'
//import Page from './logsSystem.svelte'


let lang = getLang("en");

export default {
    name: "/logsSystem",                    // link that router will use
    layout: MainPage,
    component: Page,
    //redirectTo: 'company',
    //onlyIf: { guard: userIsAdmin, redirect: '/login' },

    icon: "iconSysLogs",                    // Navbar icon to show
    label: i18n(nav, "", lang),         // Navbar text to show

    roles: {                                // roles that can see this link in Navbar and be routed to
        read: ["siteAdmin"],
        write: ["siteAdmin"]
    },

    group: 3,                               // for side navigation; group routes into a block
    isNavMobile: false,                     // (optional) show link in mobile nav block at bottom or top
};
