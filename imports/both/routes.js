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
 *  1. route objects are located within the associated page directory under /imports/both/pages<pageName>
 *  2. the order of the page route objects in the returned array determines the page order
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
 *          roles =         {Array} roles that can see this link in Navbar and be routed to, ie. ["all"]
 *
 *          group =         {Number} for side navigation; group routes into a block
 *          isNavMobile =   {Boolean} (optional) show link in mobile nav block at bottom or top
 *
 */


//* get page configuration information
import Home from '/imports/both/Pages/Home/home_route'
import Template from '/imports/both/Pages/Template/template_route'
import ListForm from '/imports/both/Pages/StarterListForm/listForm_route'
import Cards from '/imports/both/Pages/Cards/cards_route'
import Widgets from '/imports/both/Pages/Widgets/widgets_route'
import Content from '/imports/both/Pages/WidgetsContent/widgetsContent_route'
import Icons from '/imports/both/Pages/Icons/icons_route'
import Colours from '/imports/both/Pages/Colours/colours_route'
import Documentation from '/imports/both/Pages/Documentation/documentation_route'

//* Load page route configurations into array for processing.
//* Note that array order determines the displayed nav link order.
const routes = [
    Home,
    Template,
    ListForm,
    Cards,
    Icons,
    Colours,
    Widgets,
    Content,
    Documentation,

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
