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

    import Navbar from '../navbar/Navbar.svelte'
    import SideNav from '../navbar/NavSideMenu.svelte'
    import Footer from './Footer.svelte'

    import Route from 'svelte-router-spa/src/components/route.svelte'
    export let currentRoute;
    export let params = {};

</script>



<Navbar {currentRoute}> </Navbar>


<div class="page-master-layout has-background-white">
    <div class="columns">

        <div class="column mr-4 is-narrow is-hidden-touch is-hidden-desktop-only">
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
