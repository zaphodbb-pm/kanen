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
import Page from './widgets_loader.svelte'
import PageText from './widgets_text'

let lang = getLang("en");

export default {
    name: "/widgets",                       // link that router will use
    layout: MainPage,
    component: Page,
    //redirectTo: 'company',
    //onlyIf: { guard: userIsAdmin, redirect: '/login' },

    icon: "iconWidget",                      // Navbar icon to show
    label: i18n(PageText, "navLabel", lang),    // Navbar text to show

    roles: ["all"],                         // roles that can see this link in Navbar and be routed to

    group: 1,                               // for side navigation; group routes into a block
    isNavMobile: false,                     // (optional) show link in mobile nav block at bottom or top
};
