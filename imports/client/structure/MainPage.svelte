<script>

    /**
     * MainPage creates the page structure
     *
     * @memberof Structure:Client
     * @function MainPage
     * @locus Client
     *
     * @notes
     *      1. Imports an object that holds the page route information
     *      2. When a new url is detected, the page will be rendered into the main page area
     *
     */

    import Navbar from '../Navbar/Navbar.svelte'
    import SideNav from '../Navbar/NavSideMenu.svelte'
    import AsideWrapper from '/imports/components/blocks/asideWrapper.svelte'
    import Footer from './Footer.svelte'

    import Route from 'svelte-router-spa/src/components/route.svelte'

    export let currentRoute;
    export let params = {};

    let hamburger = false;

    function toggle(){
        hamburger = !hamburger;

        console.log("hamburger", hamburger);
    }

</script>



<Navbar {currentRoute} on:hamburger={toggle}> </Navbar>

<div class="side-navbar-container has-background-white">
    <div class="side-navbar-wrapper has-border-right">

        <AsideWrapper>
            <SideNav {currentRoute} />
        </AsideWrapper>

    </div>
</div>


<div class="page-master-layout has-background-white">
    <div class="columns">

        <div class="column is-narrow is-hidden-touch is-hidden-desktop-only">
            <SideNav {currentRoute} />
        </div>

        <div class="column">
            <section id="page-layout">
                <Route {currentRoute}  {params} />
            </section>

            <Footer />
        </div>

    </div>
</div>
