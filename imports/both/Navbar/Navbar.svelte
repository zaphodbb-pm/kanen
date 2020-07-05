<script>
    /**
     * Main Navbar component fixed at top of page.
     *
     * @memberof Navbar
     * @function Navbar
     * @locus Client
     *
     */

    //* props
    export let currentRoute;

    //* support files
    import {messages} from '/imports/client/systemStores'
    import {layout} from '/imports/both/systemGlobals'
    import {createEventDispatcher, setContext} from 'svelte'
    const dispatch = createEventDispatcher();

    //* get the user language preference from store
    import {i18n} from '/imports/functions/i18n'
    import {lang} from '/imports/client/systemStores'

    //* get page text information and set contexts for children components
    import {navbar, gdpr} from './Navbar_text'
    setContext("navbar", i18n(navbar, "", $lang) );
    setContext("gdprNotice", i18n(gdpr, "", $lang) );

    //* components
    import Navbar_Brand from './Navbar_Brand.svelte'
    import Navbar_Links from './Navbar_Links.svelte'
    import NavShortcuts from './NavCondensedMenu.svelte'
    import SideNav from './NavSideMenu.svelte'
    import AsideNav from './asideNavWrapper.svelte'
    import Messages from '/imports/components/general/messages.svelte'
    import GDPR from '/imports/components/general/gdprNotice.svelte'

    import Notifications from '/imports/components/elements/notifications.svelte'
    import UserProfile from '/imports/components/elements/userProfile.svelte'
    import UserCredit from '/imports/components/elements/userCredit.svelte'

    //** simple nav configuration options for aside navs
    let theme = "light";        // "light" or "dark" background
    let side = "left";          // "left" or "right" entry
    let open = false;           // hamburger state true = "open"; false = "closed"

</script>




<nav id="navbar-container"
     class="navbar is-fixed-top is-marginless is-paddingless has-opacity has-navbar-widgets"
     style="border-bottom: 2px solid #dbdbdb"
     role="navigation" aria-label="main navigation">

    <div id="navbarBrand-insert" class="navbar-brand mr-5">
        <Navbar_Brand> </Navbar_Brand>

        <a role="button"
           class="navbar-burger navbar-widgets-burger is-block-touch is-block-desktop-only"
           aria-label="menu"
           on:click={ () => open = !open}
           aria-expanded="false">

            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
        </a>
    </div>

    <div class="navbar-menu">
        <div class="navbar-start">
            {#if layout.TOP_NAV}
                <Navbar_Links {currentRoute}> </Navbar_Links>
            {/if}
        </div>

        <div class="navbar-end w-100 justify-content-center is-hidden-mobile">
            {#if layout.SHORTCUTS}
                <NavShortcuts {currentRoute}> </NavShortcuts>
            {/if}
        </div>
    </div>

    <div class="navbar-widgets">
        <UserCredit  />

        <Notifications />

        <UserProfile />
    </div>

</nav>

<div class="navbar w-100 justify-content-center is-fixed-bottom is-light is-hidden-tablet"
     style="display: inline-flex; min-height: 2rem;">

    <NavShortcuts {currentRoute} bottom />
</div>


<AsideNav bind:open {theme} {side} >
    <SideNav {currentRoute} {theme} on:side-link-selected={() => open = false} />
</AsideNav>


<aside>
    <Messages />
</aside>


<aside>
    <GDPR />
</aside>
