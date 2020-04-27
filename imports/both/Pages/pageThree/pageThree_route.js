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
let base = "/page-three";

export default {
    name: base,                             // link that router will use
    layout: MainPage,
    component: Page,
    //redirectTo: 'company',
    //onlyIf: { guard: userIsAdmin, redirect: '/login' },

    icon: "iconLearn",                      // navbar icon to show
    label: i18n(PageText, "navLabel", lang),    // navbar text to show

    roles: ["all"],                         // roles that can see this link in navbar and be routed to
    isParent: true,                         // for grouped links, this is the parent that holds the dropdown list
    subLnk: true,                           // flag to indicate that this link will be added to dropdown list
    parent: base,                           // if subLnk is true, provide the name of the parent nav item
    isNavMobile: true,                      // (optional) show link in mobile nav block at bottom or top
};
