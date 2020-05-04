<script>
    /**
     * @summary Navbar insert.
     *
     * @memberof Navbar
     * @function Navbar
     * @locus Client
     *
     */

    import Navbar_Brand from './Navbar_Brand.svelte'
    import Navbar_Links from './Navbar_Links.svelte'
    import NavShortcuts from './NavCondensedMenu.svelte'
    import SideNav from './NavSideMenu.svelte'
    import AsideNav from './asideNavWrapper.svelte'

    import {createEventDispatcher} from 'svelte'
    const dispatch = createEventDispatcher();

    export let currentRoute;

    //** simple nav configuration options
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
            <Navbar_Links {currentRoute}> </Navbar_Links>
        </div>

        <div class="navbar-end w-100 justify-content-center is-hidden-mobile">
            <NavShortcuts {currentRoute}> </NavShortcuts>
        </div>

    </div>

    <div class="navbar-widgets">
        widgets
    </div>

</nav>

<div class="navbar w-100 justify-content-center is-fixed-bottom is-light is-navMobile is-hidden-tablet">
    <NavShortcuts {currentRoute} bottom> </NavShortcuts>
</div>


<AsideNav bind:open {theme} {side}>
    <SideNav {currentRoute} {theme}/>
</AsideNav>


<style>

    .is-navMobile {
        min-height: 2rem;
    }

</style>
