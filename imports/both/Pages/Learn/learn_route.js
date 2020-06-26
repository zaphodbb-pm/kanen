/**
 * Route config information for Learn page.
 *
 * @memberof Pages:Learn
 * @function learn_route
 * @locus Client
 * @augments learn
 *
 * @returns {Object}
 *
 * @notes
 *      1.  Remember to register this page at /imports/both/routes
 */


import {getLang} from '/imports/functions/getLang'
import {i18n} from '/imports/functions/i18n'
import MainPage from '/imports/both/pageStructure/MainPage.svelte'

import {nav, link, icon, roles}  from './learn_nav'
import Page from './learn_loader.svelte'
//import Page from './learn.svelte'


let lang = getLang("en");

export default {
    name: link,                             // link that router will use
    layout: MainPage,
    component: Page,
    //redirectTo: 'company',
    //onlyIf: { guard: userIsAdmin, redirect: '/login' },

    icon: icon,                             // Navbar icon to show
    label: i18n(nav, "", lang),         // Navbar text to show
    roles: roles,

    group: 0,                               // for side navigation; group routes into a block
    isNavMobile: false,                     // (optional) show link in mobile nav block at bottom or top
};
