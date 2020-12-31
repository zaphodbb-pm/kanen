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
import MainPage from '/imports/both/PageStructure/MainPage.svelte'

import {nav, link, icon, roles} from './cards_nav'
import Page from './cards_loader.svelte';
//import Page from './cards.svelte';


let lang = getLang("en");

export default {
    name: link,                             // link that router will use
    layout: MainPage,
    component: Page,
    //redirectTo: 'company',
    //onlyIf: { guard: userIsAdmin, redirect: '/login' },

    icon: icon,                             // Navbar icon to show
    label: i18n(nav, "", lang),          // Navbar text to show
    roles: roles,

    group: 1,                               // for side navigation; group routes into a block
    isNavMobile: true,                      // (optional) show link in mobile nav block at bottom or top
};
