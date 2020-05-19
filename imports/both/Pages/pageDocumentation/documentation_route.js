/**
 * @summary Route config information for Documentation page.
 *
 * @memberof Pages:Documentation
 * @function documentation_route
 * @locus Client
 * @augments documentation
 *
 * @returns {Object}
 *
 * @notes
 *      1.  Remember to register this page at /imports/both/routes
 */


import {getLang} from '/imports/functions/func-getLang'
import {i18n} from '/imports/functions/func-i18n'
import MainPage from '/imports/both/pageStructure/MainPage.svelte'
import Page from './documentation.svelte'
import PageText from './documentation_text'

let lang = getLang("en");

export default {
    name: "/documentation",                 // link that router will use
    layout: MainPage,
    component: Page,
    //redirectTo: 'company',
    //onlyIf: { guard: userIsAdmin, redirect: '/login' },

    icon: "iconDocumentation",              // navbar icon to show
    label: i18n(PageText, "navLabel", lang),    // navbar text to show

    roles: ["all"],                         // roles that can see this link in navbar and be routed to

    group: 1,                               // for side navigation; group routes into a block
    isNavMobile: false,                     // (optional) show link in mobile nav block at bottom or top
};
