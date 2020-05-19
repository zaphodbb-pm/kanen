/**
 * @summary Route config information for ListForm page.
 *
 * @memberof Pages:ListForm
 * @function listForm_route
 * @locus Client
 * @augments listForm
 *
 * @returns {Object}
 *
 * @notes
 *      1.  Remember to register this page at /imports/both/routes
 */


import {getLang} from '/imports/functions/func-getLang'
import {i18n} from '/imports/functions/func-i18n'
import MainPage from '/imports/both/pageStructure/MainPage.svelte'
import Page from './listForm.svelte'
import PageText from './listForm_text'

let lang = getLang("en");

export default {
    name: "/listForm",                      // link that router will use
    layout: MainPage,
    component: Page,
    //redirectTo: 'company',
    //onlyIf: { guard: userIsAdmin, redirect: '/login' },

    icon: "iconListForm",                   // navbar icon to show
    label: i18n(PageText, "navLabel", lang),    // navbar text to show

    roles: ["all"],                         // roles that can see this link in navbar and be routed to

    group: 0,                               // for side navigation; group routes into a block
    isNavMobile: false,                     // (optional) show link in mobile nav block at bottom or top
};
