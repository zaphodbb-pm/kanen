/**
 * @summary Build system page routes.
 *
 * @memberof Structure
 * @function routes
 * @locus Client
 *
 * @returns {Array} - array of route objects
 *
 * @notes
 *  1. route objects are located within the associated page directory under /imports/both/pages
 *  2. the order of the page route objects in the returned array determines the page order
 *
 *  @example
 *      Typical route object
 *          name =          {String} link that router will use
 *          layout =        {Object} - MainPage layout
 *          component =     {Object} Page specific component
 *          redirectTo =    {String} (optional) link to redirect page rerquest to
 *          onlyIf =        {Object} (optional) { guard: userIsAdmin, redirect: '/login' }; block access if guard is false
 *
 *          icon =          {String} navbar icon to show from global context (app page), ie. "iconLearn"
 *          label =         {String} navbar text to show, ie. i18n(PageText, "navLabel", lang)
 *
 *          roles =         {Array} roles that can see this link in navbar and be routed to, ie. ["all"]
 *
 *          group =         {Number} for side navigation; group routes into a block
 *          isNavMobile =   {Boolean} (optional) show link in mobile nav block at bottom or top
 *
 */


import Home from '/imports/both/Pages/pageHome/home_route'
import Cards from '/imports/both/Pages/pageCards/cards_route'
import Widgets from '/imports/both/Pages/pageWidgets/widgets_route'
import Content from '/imports/both/Pages/widgetsContent/widgetsContent_route'
import Icons from '/imports/both/Pages/pageIcons/icons_route'
import Colours from '/imports/both/Pages/pageColours/colours_route'


const routes = [
    Home,
    Cards,
    Icons,
    Colours,
    Widgets,
    Content,

    //* not found or 404 page is redirected to home page
    {
        name: '404',
        path: '404',
        redirectTo: '/home',
    }
];

export {routes}


//** build short cut links for top or bottom nav
let shortcuts = routes.filter( (route) => route.isNavMobile );
export {shortcuts}


//** build grouped side bar links
let groups = [];

routes.forEach( (route) => {
    if( typeof route.group === "number"){
        groups[route.group] = groups[route.group] ? groups[route.group] : [];
        groups[route.group].push(route);
    }
});

export {groups}
