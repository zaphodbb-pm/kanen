/**
 * @summary Route config information for Home page.
 *
 * @memberof Pages:Home
 * @function home_route
 * @locus Client
 * @augments home
 *
 * @returns {Object}
 */


import {getLang} from '/imports/functions/getLang'
import {i18n} from '/imports/functions/i18n'
import MainPage from '/imports/both/PageStructure/MainPage.svelte'

import {nav, link, icon, roles} from './home_nav'
import Page from './home_loader.svelte'
//import Page from './home.svelte'

let lang = getLang("en");


export default {
    name: link,                             // link that router will use
    layout: MainPage,
    component: Page,
    //redirectTo: 'company',
    //onlyIf: { guard: userIsAdmin, redirect: '/login' },

    icon: icon,                             // Navbar icon to show
    label: i18n(nav, "", lang),         // Navbar text to show
    roles: roles,                           // roles that have access to this page

    group: 0,                               // for side navigation; group routes into a block
    isNavMobile: false,                     // (optional) show link in mobile nav block at bottom or top
};
