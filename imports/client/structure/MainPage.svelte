<script>

    import Pages from 'svelte-router-spa/src/components/router.svelte'
    import {routes} from './routes'


    //<link rel="stylesheet" href="path/to/line-awesome/css/line-awesome-font-awesome.min.css">

</script>

<div class="page-master-layout has-background-white">
    <div class="columns">

        <div class="column is-narrow is-hidden-touch is-hidden-desktop-only">
            side nav
        </div>

        <div class="column">
            <section id="page-layout">
                <Pages {routes} />
            </section>

            <footer class="mt-5 has-border-top">footer</footer>
        </div>

    </div>
</div>

<style>



</style>


