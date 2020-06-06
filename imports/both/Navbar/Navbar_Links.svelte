<script>

    /**
     * @summary Navbar brand insert.
     *
     * @memberof Navbar
     * @function Navbar_Brand
     * @locus Client
     * @augments Navbar
     *
     */

    //* props
    export let currentRoute;

    //* get system wide icon definition
    import Icon from '/imports/components/elements/icon.svelte'
    import { getContext } from 'svelte';

    //* get route information and config
    import { routes } from '/imports/both/routes'
    import { navigateTo } from 'svelte-router-spa/src/spa_router'

    function navigate(event, path) {
        event.preventDefault()
        event.stopPropagation()
        navigateTo(path);
    }

    let showLinks = routes.filter( (route) => !!route.component );

</script>



<nav class="navbar-start" style="height: 100%;">

    {#each showLinks as link }

        <a class="navbar-item navbar-hover"
           class:is-nav-active={currentRoute.name === link.name}
           style="height: 100%; align-items: flex-end"
           on:click={event => navigate(event, link.name)}
           href={link.name}>

            <div class="has-text-centered" title={link.label}>
                <Icon icon={getContext(link.icon)} class="text-1dot5rem"/>
                <div class="text-0dot9rem has-text-centered is-hidden-touch" style="line-height: 1.2;">{link.label}</div>
            </div>
        </a>

    {/each}

</nav>

<style>

    .is-nav-active,
    .navbar-hover:hover {
        background-color: #eee !important;
    }

</style>
