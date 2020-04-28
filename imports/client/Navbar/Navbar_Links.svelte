<script>

    /**
     * @summary Navbar brand insert.
     *
     * @memberof Navbar
     * @function Navbar_Brand
     * @locus Client
     * @isTemplate true
     * @augments Navbar
     *
     */

    //* get system wide icon definition
    import Icon from 'svelte-awesome/components/Icon.svelte';
    import { getContext } from 'svelte';

    //* get route information and config
    import { routes } from '/imports/client/structure/routes'
    import { navigateTo } from 'svelte-router-spa/src/spa_router'

    function navigate(event, path) {
        event.preventDefault()
        event.stopPropagation()
        navigateTo(path);
    }

    export let currentRoute;

</script>



<nav class="navbar-start" style="height: 100%;">

    {#each routes as link }

        <a class="navbar-item navbar-hover"
           class:is-nav-active={currentRoute.name === link.name}
           style="height: 100%; align-items: flex-end"
           on:click={event => navigate(event, link.name)}
           href={link.name}>

            <div class="has-text-centered">
                <Icon data={getContext(link.icon)} scale="1.5" label={link.icon}/>
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
