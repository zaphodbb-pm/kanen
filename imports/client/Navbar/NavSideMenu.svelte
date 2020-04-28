<script>
    /**
     * Side Navbar menu.
     *
     * @memberof Navbar
     * @function NavSideMenu
     * @locus Client
     * @augments Navbar
     *
     * @param {Object} currentRoute - current active path name (link)
     *
     */

    //* get system wide icon definition
    import Icon from 'svelte-awesome/components/Icon.svelte';
    import { getContext } from 'svelte';

    //* get route information and config
    import { groups } from '/imports/client/structure/routes'
    import { navigateTo } from 'svelte-router-spa/src/spa_router'

    function navigate(event, path) {
        event.preventDefault()
        event.stopPropagation()
        navigateTo(path);
    }

    export let currentRoute;

</script>


{#each groups as group }

    <div class="mb-5">
        {#each group as links}

            <a class="navbar-item navbar-hover "
               class:is-nav-active={currentRoute.name === links.name}
               on:click={event => navigate(event, links.name)}
               href={links.name}>

                <div class="d-flex align-items-center">
                    <Icon data={getContext(links.icon)} scale="1.5" label={links.icon}/>

                    <div class="nav-page-text ml-2">
                        {links.label}
                    </div>

                </div>

            </a>

        {/each}
    </div>

{/each}



<style>

    .is-nav-active,
    .navbar-hover:hover{
        color: #CC5C00 !important;
        background-color: #eee !important;
    }

</style>
