/**
 * Route config information for Template page.
 *
 * @memberof Pages:Template
 * @function template_route
 * @locus Client
 * @augments template
 *
 * @returns {Object} - {name, layout, component, icon, label, roles, group, isNavMobile}
 *
 * @notes
 *      1.  Remember to register this page at /imports/both/routes
 */


import {getLang} from '/imports/functions/getLang'
import {i18n} from '/imports/functions/i18n'
import MainPage from '/imports/both/pageStructure/MainPage.svelte'

import {nav, link, icon, roles} from './template_nav'
import Page from './template_loader.svelte'
//import Page from './template.svelte'


let lang = getLang("en");

export default {
    name: link,                             // link that router will use
    layout: MainPage,
    component: Page,
    //redirectTo: 'company',
    //onlyIf: { guard: userIsAdmin, redirect: '/login' },

    icon: icon,                             // Navbar icon to show
    label: i18n(nav, "", lang),         // Navbar text to show
    roles: roles,                           // roles that can see this link in Navbar and be routed to

    group: 0,                               // for side navigation; group routes into a block
    isNavMobile: false,                     // (optional) show link in mobile nav block at bottom or top
};
