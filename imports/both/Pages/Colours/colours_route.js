/**
 * @summary Route config information for Colours Page.
 *
 * @memberof Pages:Colours
 * @function colours_route
 * @locus Client
 * @augments colours
 *
 * @returns {Object}
 */


import {getLang} from '/imports/functions/getLang'
import {i18n} from '/imports/functions/i18n'
import {nav} from './colours_text_nav'
import MainPage from '/imports/both/pageStructure/MainPage.svelte'

import Page from './colours_loader.svelte'
//import Page from './colours.svelte'


let lang = getLang("en");

export default {
    name: "/colours",                       // link that router will use
    layout: MainPage,
    component: Page,
    //redirectTo: 'company',
    //onlyIf: { guard: userIsAdmin, redirect: '/login' },

    icon: "iconColours",                    // Navbar icon to show
    label: i18n(nav, "", lang),         // Navbar text to show

    roles: {                                // roles that can see this link in Navbar and be routed to
        read: ["all"],
        write: ["none"]
    },

    group: 1,                               // for side navigation; group routes into a block
    isNavMobile: true,                      // (optional) show link in mobile nav block at bottom or top
};
