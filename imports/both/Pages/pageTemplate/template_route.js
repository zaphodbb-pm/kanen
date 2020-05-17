/**
 * @summary Route config information for Template page.
 *
 * @memberof Pages:Template
 * @function template_route
 * @locus Client
 * @augments template
 *
 * @returns {Object}
 *
 * @notes
 *      1.  Remember to register this page at /imports/both/routes
 */


import {getLang} from '/imports/functions/func-getLang'
import {i18n} from '/imports/functions/func-i18n'
import MainPage from '/imports/both/pageStructure/MainPage.svelte'
import Page from './template.svelte'
import PageText from './template_text'

let lang = getLang("en");

export default {
    name: "/template",                             // link that router will use
    layout: MainPage,
    component: Page,
    //redirectTo: 'company',
    //onlyIf: { guard: userIsAdmin, redirect: '/login' },

    icon: "iconTemplate",                       // navbar icon to show
    label: i18n(PageText, "navLabel", lang),    // navbar text to show

    roles: ["all"],                         // roles that can see this link in navbar and be routed to

    group: 0,                               // for side navigation; group routes into a block
    isNavMobile: false,                     // (optional) show link in mobile nav block at bottom or top
};
