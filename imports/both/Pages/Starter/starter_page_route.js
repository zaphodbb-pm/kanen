/**
 * Route config information for Starter page.
 *
 * @memberof Pages:Starter
 * @function starter_page_route
 * @locus Client
 * @augments starter_page
 *
 * @returns {Object}
 *
 * @notes
 *      1.  Remember to register this page at /imports/both/routes
 */


import {getLang} from '/imports/functions/getLang'
import {i18n} from '/imports/functions/i18n'
import MainPage from '/imports/both/PageStructure/MainPage.svelte'

import {nav, link, icon, roles} from './starter_page_nav'
import Page from './starter_page_loader.svelte'
//import Page from './starter_page.svelte'


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

    group: 1,                               // for side navigation; group routes into a block
    isNavMobile: false,                     // (optional) show link in mobile nav block at bottom or top
};
