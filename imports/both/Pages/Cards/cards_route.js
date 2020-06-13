/**
 * @summary Route config information for Cards.
 *
 * @memberof Pages:Cards
 * @function cards_route
 * @locus Client
 * @augments cards
 *
 * @returns {Object}
 */


import {getLang} from '/imports/functions/getLang'
import {i18n} from '/imports/functions/i18n'
import {nav} from './cards_text_nav'
import MainPage from '/imports/both/pageStructure/MainPage.svelte'

import Page from './cards_loader.svelte';
//import Page from './cards.svelte';


let lang = getLang("en");

export default {
    name: "/cards",                         // link that router will use
    layout: MainPage,
    component: Page,
    //redirectTo: 'company',
    //onlyIf: { guard: userIsAdmin, redirect: '/login' },

    icon: "iconCard",                       // Navbar icon to show
    label: i18n(nav, "", lang),          // Navbar text to show

    roles: {                                // roles that can see this link in Navbar and be routed to
        read: ["all"],
        write: ["none"]
    },

    group: 0,                               // for side navigation; group routes into a block
    isNavMobile: true,                      // (optional) show link in mobile nav block at bottom or top
};
