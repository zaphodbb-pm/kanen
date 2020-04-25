<script>
    /**
     * @summary Navbar insert.
     *
     * @memberof Navbar
     * @function Navbar
     * @locus Client
     * @isTemplate true
     *
     */

    import Navbar_Brand from './Navbar_Brand.svelte'
    import Navbar_Links from './Navbar_Links.svelte'

    export let currentRoute;

</script>




<nav id="navbar-container"
     class="navbar is-fixed-top is-marginless is-paddingless has-opacity has-navbar-widgets"
     style="border-bottom: 2px solid #dbdbdb"
     role="navigation" aria-label="main navigation">

    <div id="navbarBrand-insert" class="navbar-brand">
        <Navbar_Brand> </Navbar_Brand>

        <a role="button"
           class="navbar-burger navbar-widgets-burger is-block-touch is-block-desktop-only"
           aria-label="menu"
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

        <div class="navbar-end">
            end
        </div>

    </div>

    <div class="navbar-widgets">
        widgets
    </div>

</nav>




<style>

</style>
