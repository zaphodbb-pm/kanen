/**
 * @summary Route config information for Colours Page.
 *
 * @memberof Pages:Colours
 * @function colours_route
 * @locus Client
 * @augments colours
 *
 * @returns {Object}
 */


import {getLang} from '/imports/functions/getLang'
import {i18n} from '/imports/functions/i18n'
import MainPage from '/imports/both/pageStructure/MainPage.svelte'
import Page from './colours.svelte'
import PageText from './colours_text'

let lang = getLang("en");

export default {
    name: "/colours",                             // link that router will use
    layout: MainPage,
    component: Page,
    //redirectTo: 'company',
    //onlyIf: { guard: userIsAdmin, redirect: '/login' },

    icon: "iconColours",                       // Navbar icon to show
    label: i18n(PageText, "navLabel", lang),    // Navbar text to show

    roles: ["all"],                         // roles that can see this link in Navbar and be routed to

    group: 1,                               // for side navigation; group routes into a block
    isNavMobile: true,                     // (optional) show link in mobile nav block at bottom or top
};
