/**
 * @summary Route config information for PageTwo.
 *
 * @memberof Pages:PageTwo
 * @function pageTwo_route
 * @locus Client
 * @augments pageTwo
 *
 * @returns {Object}
 */


import {getLang} from '/imports/functions/func-getLang'
import {i18n} from '/imports/functions/func-i18n'
import MainPage from '/imports/client/structure/MainPage.svelte'
import Page from './pageTwo.svelte'
import PageText from './pageTwo_text'

let lang = getLang("en");
let base = "/page-two";                     // convenience variable

export default {
    name: base,                             // link that router will use
    layout: MainPage,
    component: Page,
    //redirectTo: 'company',
    //onlyIf: { guard: userIsAdmin, redirect: '/login' },

    icon: "iconPost",                       // navbar icon to show
    label: i18n(PageText, "navLabel", lang),    // navbar text to show

    roles: ["all"],                         // roles that can see this link in navbar and be routed to

    group: 1,                               // for side navigation; group routes into a block
    isNavMobile: true,                      // (optional) show link in mobile nav block at bottom or top
};
