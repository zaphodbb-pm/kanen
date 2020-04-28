<script>

    /**
     * MainPage creates the page structure
     *
     * @memberof Structure:Client
     * @function MainPage
     * @isTemplate true
     * @locus Client
     *
     * @notes
     *      1. Imports an object that holds the page route information
     *      2. When a new url is detected, the page will be rendered into the main page area
     *
     */

    import Navbar from '../Navbar/Navbar.svelte'
    import SideNav from '../Navbar/NavSideMenu.svelte'
    import Route from 'svelte-router-spa/src/components/route.svelte'

    export let currentRoute;
    export let params = {};

</script>



<Navbar {currentRoute}> </Navbar>

<div class="page-master-layout has-background-white">
    <div class="columns">

        <div class="column is-narrow is-hidden-touch is-hidden-desktop-only">
            <div class="title is-4">side nav</div>

            <SideNav {currentRoute} />


            <!--<div style="max-width: 10rem; word-wrap: break-word">{JSON.stringify(currentRoute)}</div>-->
        </div>

        <div class="column">
            <section id="page-layout">
                <Route {currentRoute}  {params} />
            </section>

            <footer class="mt-5 has-border-top">footer</footer>
        </div>

    </div>
</div>
