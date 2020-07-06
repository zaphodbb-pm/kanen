/**
 * @summary Route config information for Widgets.
 *
 * @memberof Pages:Widgets
 * @function widgets_route
 * @locus Client
 * @augments widgets
 *
 * @returns {Object}
 */


import {getLang} from '/imports/functions/getLang'
import {i18n} from '/imports/functions/i18n'
import MainPage from '/imports/both/pageStructure/MainPage.svelte'

import {nav, link, icon, roles} from './widgets_nav'
import Page from './widgets_loader.svelte'
//import Page from './widgets.svelte'


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
    isNavMobile: true,                     // (optional) show link in mobile nav block at bottom or top
};
