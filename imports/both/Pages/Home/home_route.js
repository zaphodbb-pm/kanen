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
import {nav} from './home_text_nav'
import MainPage from '/imports/both/pageStructure/MainPage.svelte'

import Page from './home_loader.svelte'
//import Page from './home.svelte'

let lang = getLang("en");


export default {
    name: "/home",                             // link that router will use
    layout: MainPage,
    component: Page,
    //redirectTo: 'company',
    //onlyIf: { guard: userIsAdmin, redirect: '/login' },

    icon: "iconHome",                       // Navbar icon to show
    label: i18n(nav, "", lang),         // Navbar text to show

    roles: ["all"],                         // roles that can see this link in Navbar and be routed to

    group: 0,                               // for side navigation; group routes into a block
    isNavMobile: false,                     // (optional) show link in mobile nav block at bottom or top
};
