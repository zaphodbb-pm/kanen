/**
 * @summary Route config information for Cards.
 *
 * @memberof Pages:Cards
 * @function cards_route
 * @locus Client
 * @augments cards
 *
 * @returns {Object}
 */


import {getLang} from '/imports/functions/getLang'
import {i18n} from '/imports/functions/i18n'
import MainPage from '/imports/both/pageStructure/MainPage.svelte'
import Page from './cards.svelte'
import PageText from './cards_text'

let lang = getLang("en");

export default {
    name: "/cards",                         // link that router will use
    layout: MainPage,
    component: Page,
    //redirectTo: 'company',
    //onlyIf: { guard: userIsAdmin, redirect: '/login' },

    icon: "iconCard",                       // Navbar icon to show
    label: i18n(PageText, "navLabel", lang),    // Navbar text to show

    roles: ["all"],                         // roles that can see this link in Navbar and be routed to

    group: 0,                               // for side navigation; group routes into a block
    isNavMobile: true,                      // (optional) show link in mobile nav block at bottom or top
};
