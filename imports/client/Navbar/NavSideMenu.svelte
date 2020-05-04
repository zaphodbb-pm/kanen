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
    import Icon from '/imports/components/elements/icon.svelte'
    import { getContext } from 'svelte';

    //* get route information and config
    import { groups } from '/imports/client/structure/routes'
    import { navigateTo } from 'svelte-router-spa/src/spa_router'

    //** get event dispatcher
    import {createEventDispatcher} from 'svelte'
    const dispatch = createEventDispatcher();

    //** respond to a link click
    function navigate(event, path) {
        event.preventDefault()
        event.stopPropagation()
        navigateTo(path);
    }

    export let currentRoute;
    export let theme = "light";

</script>


{#each groups as group }

    <div class="mb-4">
        {#each group as links}

            <a class="navbar-item navbar-hover "
               class:is-nav-active={currentRoute.name === links.name}
               class:dark={theme === "dark"}
               on:click={event => navigate(event, links.name)}
               href={links.name}>

                <div class="d-flex align-items-center" title={links.label}>
                    <Icon icon={getContext(links.icon)} class="text-1dot5rem"/>
                    <div class="nav-page-text ml-2">{links.label}</div>
                </div>
            </a>

        {/each}
    </div>

{/each}



<style>

    .dark {
        color: whitesmoke;
    }

    .is-nav-active,
    .navbar-hover:hover{
        color: #CC5C00 !important;
        background-color: #EEE !important;
    }

    .is-nav-active.dark,
    .navbar-hover.dark:hover{
        color: #FF7F00 !important;
        background-color: #222 !important;
    }

</style>
