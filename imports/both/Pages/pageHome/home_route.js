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


import {getLang} from '/imports/functions/func-getLang'
import {i18n} from '/imports/functions/func-i18n'
import MainPage from '/imports/both/pageStructure/MainPage.svelte'
import Page from './home.svelte'
import PageText from './home_text'

let lang = getLang("en");

export default {
    name: "/home",                             // link that router will use
    layout: MainPage,
    component: Page,
    //redirectTo: 'company',
    //onlyIf: { guard: userIsAdmin, redirect: '/login' },

    icon: "iconHome",                       // navbar icon to show
    label: i18n(PageText, "navLabel", lang),    // navbar text to show

    roles: ["all"],                         // roles that can see this link in navbar and be routed to

    group: 0,                               // for side navigation; group routes into a block
    isNavMobile: false,                     // (optional) show link in mobile nav block at bottom or top
};
