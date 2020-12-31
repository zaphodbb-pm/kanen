/**
 * Build system page routes.  Note that all pages need to be registered here.
 *
 * @memberof Structure
 * @function routes
 * @locus Client
 *
 * @returns {Array} - array of route objects
 *
 * @notes
 *  1. Route objects are located within the associated page directory under /imports/both/pages<pageName>
 *  2. The order of the page route objects in the returned array determines the page order
 *
 *  @example
 *      Typical route object
 *          name =          {String} link that router will use, ie "/home"
 *          layout =        {Object} MainPage layout Svelte object
 *          component =     {Object} Page Svelte specific component
 *          redirectTo =    {String} (optional) link to redirect page request to
 *          onlyIf =        {Object} (optional) { guard: userIsAdmin, redirect: '/login' }; block access if guard is false
 *
 *          icon =          {String} Navbar icon to show from global context (app page), ie. "iconLearn"
 *          label =         {String} Navbar text to show, ie. i18n(PageText, "navLabel", lang)
 *
 *          roles =         {Array} of objects: {read: array, write: array} - roles that can see this link in Navbar and be routed to, ie. ["all"]
 *
 *          group =         {Number} for side navigation; group routes into a block
 *          isNavMobile =   {Boolean} (optional) show link in mobile nav block at bottom or top
 *
 */




//* get page configuration information
import Home from '/imports/both/Pages/Home/home_route'
import Template from '/imports/both/Pages/Template/template_route'
import Icons from '/imports/both/Pages/Icons/icons_route'
import Colours from '/imports/both/Pages/Colours/colours_route'
import MiniWiki from '/imports/both/Pages/Learn/learn_route'

import Cards from '/imports/both/Pages/Cards/cards_route'
import Tabs from '/imports/both/Pages/WidgetsContent/widgetsContent_route'

import Widgets from '/imports/both/Pages/Widgets/widgets_route'
import Starter from '/imports/both/Pages/Starter/starter_page_route'
import Login from '/imports/both/Pages/Login/login_route'

import MyProfile from '/imports/both/Pages/MyProfile/myProfile_route'
import PubSub from '/imports/both/Pages/PubSub/pubSub_route'
import ChangePassword from '/imports/both/Pages/ChangePassword/changePassword_route'

import BuildContent from '/imports/both/Pages/BuildContent/buildContent_route'
import Documentation from '/imports/both/Pages/Documentation/documentation_route'
import LogsSystem from '/imports/both/Pages/LogsSystem/logsSystem_route'
import LogsUsers from '/imports/both/Pages/LogsUsers/logsUsers_route'

import Users from '/imports/both/Pages/Users/users_route'
import SysConfig from '/imports/both/Pages/SysConfig/sysConfig_route'
import ExportImport from '/imports/both/Pages/ExportImport/exportImport_route'



//* Load page route configurations into array for processing.
//* Note that array order determines the displayed nav link order.
const allRoutes = [

    Home,
    Template,
    Icons,
    Colours,
    MiniWiki,

    Cards,
    Tabs,
    Widgets,
    Starter,
    Login,

    MyProfile,
    PubSub,
    ChangePassword,

    BuildContent,
    Documentation,
    LogsSystem,
    LogsUsers,

    Users,
    SysConfig,
    ExportImport,


    //* not found or 404 page is redirected to home page
    {
        name: '404',
        path: '404',
        redirectTo: '/home',
        roles: {                                // roles that can see this link in Navbar and be routed to
            read: ["all"],
            write: ["none"]
        },
    }
];

export {allRoutes}
