/**
 * @summary Route config information for PageThree.
 *
 * @memberof Pages:PageThree
 * @function pageThree_route
 * @locus Client
 * @augments PageThree
 *
 * @returns {Object}
 */


import {getLang} from '/imports/functions/func-getLang'
import {i18n} from '/imports/functions/func-i18n'
import MainPage from '/imports/client/structure/MainPage.svelte'
import Page from './pageThree.svelte'
import PageText from './pageThree_text'

let lang = getLang("en");
let base = "/page-three";                   // convenience variable

export default {
    name: base,                             // link that router will use
    layout: MainPage,
    component: Page,
    //redirectTo: 'company',
    //onlyIf: { guard: userIsAdmin, redirect: '/login' },

    icon: "iconWidget",                      // navbar icon to show
    label: i18n(PageText, "navLabel", lang),    // navbar text to show

    roles: ["all"],                         // roles that can see this link in navbar and be routed to

    group: 0,                               // for side navigation; group routes into a block
    isNavMobile: false,                     // (optional) show link in mobile nav block at bottom or top
};
