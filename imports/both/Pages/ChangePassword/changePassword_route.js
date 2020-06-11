/**
 * Route config information for ChangePassword page.
 *
 * @memberof Pages:ChangePassword
 * @function changePassword_route
 * @locus Client
 * @augments changePassword
 *
 * @returns {Object}
 *
 * @notes
 *      1.  Remember to register this page at /imports/both/routes
 */


import {getLang} from '/imports/functions/getLang'
import {i18n} from '/imports/functions/i18n'
import {nav} from './changePassword_text_nav'
import MainPage from '/imports/both/pageStructure/MainPage.svelte'

import Page from './changePassword_loader.svelte'
//import Page from './changePassword.svelte'


let lang = getLang("en");

export default {
    name: "/changePassword",                // link that router will use
    layout: MainPage,
    component: Page,
    //redirectTo: 'company',
    //onlyIf: { guard: userIsAdmin, redirect: '/changePassword' },

    icon: "iconChangePwd",                   // Navbar icon to show
    label: i18n(nav, "", lang),         // Navbar text to show

    roles: ["all"],                         // roles that can see this link in Navbar and be routed to

    group: 2,                               // for side navigation; group routes into a block
    isNavMobile: false,                     // (optional) show link in mobile nav block at bottom or top
};
