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

    import Pages from 'svelte-router-spa/src/components/router.svelte'
    import {routes} from './func-routes'

</script>

<div class="page-master-layout has-background-white">
    <div class="columns">

        <div class="column is-narrow is-hidden-touch is-hidden-desktop-only">
            side nav
        </div>

        <div class="column">
            <section id="page-layout">
                <Pages {routes} />

                <div></div>
            </section>

            <footer class="mt-5 has-border-top">footer</footer>
        </div>

    </div>
</div>
