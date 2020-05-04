/**
 * @summary Route config information for PageOne.
 *
 * @memberof Pages:PageOne
 * @function pageOne_route
 * @locus Client
 * @augments icons
 *
 * @returns {Object}
 */


import {getLang} from '/imports/functions/func-getLang'
import {i18n} from '/imports/functions/func-i18n'
import MainPage from '/imports/client/structure/MainPage.svelte'
import Page from './icons.svelte'
import PageText from './icons_text'

let lang = getLang("en");

export default {
    name: "/icons",                             // link that router will use
    layout: MainPage,
    component: Page,
    //redirectTo: 'company',
    //onlyIf: { guard: userIsAdmin, redirect: '/login' },

    icon: "iconIcons",                       // navbar icon to show
    label: i18n(PageText, "navLabel", lang),    // navbar text to show

    roles: ["all"],                         // roles that can see this link in navbar and be routed to

    group: 1,                               // for side navigation; group routes into a block
    isNavMobile: true,                     // (optional) show link in mobile nav block at bottom or top
};
