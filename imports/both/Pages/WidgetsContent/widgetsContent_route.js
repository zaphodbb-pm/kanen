/**
 * @summary Route config information for WidgetsContent.
 *
 * @memberof Pages:WidgetsContent
 * @function widgetsContent_route
 * @locus Client
 * @augments widgetsContent
 *
 * @returns {Object}
 */


import {getLang} from '/imports/functions/getLang'
import {i18n} from '/imports/functions/i18n'
import {nav} from './widgetsContent_text_nav'
import MainPage from '/imports/both/pageStructure/MainPage.svelte'

import Page from './widgetsContent_loader.svelte'
//import Page from './widgetsContent.svelte'


let lang = getLang("en");

export default {
    name: "/content-widgets",               // link that router will use
    layout: MainPage,
    component: Page,
    //redirectTo: 'company',
    //onlyIf: { guard: userIsAdmin, redirect: '/login' },

    icon: "iconContent",                    // Navbar icon to show
    label: i18n(nav, "", lang),         // Navbar text to show

    roles: {                                // roles that can see this link in Navbar and be routed to
        read: ["all"],
        write: ["none"]
    },

    group: 0,                               // for side navigation; group routes into a block
    isNavMobile: true,                      // (optional) show link in mobile nav block at bottom or top
};
