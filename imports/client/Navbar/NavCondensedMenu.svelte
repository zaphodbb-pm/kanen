<script>
    /**
     * Navbar condensed menu for shortcuts.
     *
     * @memberof Navbar
     * @function NavTopMenu
     * @locus Client
     * @augments Navbar
     *
     * @param {Object} currentRoute - current active path name (link)
     * @param {Boolean} bottom - flag to shape menu for use at bottom
     */

    //* get system wide icon definition
    import Icon from 'svelte-awesome/components/Icon.svelte';
    import { getContext } from 'svelte';

    //* get route information and config
    import { shortcuts } from '/imports/client/structure/routes'
    import { navigateTo } from 'svelte-router-spa/src/spa_router'

    function navigate(event, path) {
        event.preventDefault()
        event.stopPropagation()
        navigateTo(path);
    }

    export let currentRoute;
    export let bottom = false;


</script>


{#each shortcuts as link }

    <a class="navbar-item navbar-hover"
       class:is-nav-active={currentRoute.name === link.name}
       style="height: 100%; align-items: flex-end"
       on:click={event => navigate(event, link.name)}
       href={link.name}
       title={link.label}>

        <div class="has-text-centered">
            <Icon data={getContext(link.icon)} scale="1.5" label={link.icon}/>

            {#if !bottom}
                <div class="text-0dot8rem nav-page-text has-text-centered" style="line-height: 1.2;">
                    {link.label}
                </div>
            {/if}
        </div>
    </a>

{/each}



<style>

    .is-nav-active .nav-page-text,
    .navbar-hover:hover .nav-page-text {
        color: #CC5C00 !important;
        border-top: 2px solid #CC5C00;
    }

    .is-nav-active,
    .navbar-hover:hover{
        color: #CC5C00 !important;
        background-color: #eee !important;
    }


</style>
