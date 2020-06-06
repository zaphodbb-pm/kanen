<script>
    /**
     * Generic insert loader for pages.
     *
     * @memberof Pages:Documentation
     * @function documentation_loader
     * @locus Client
     *
     */


    //* setup props to receive route data
    export let currentRoute;
    export let params;

    //* get svelte component loader
    import Loadable from 'svelte-loadable';

</script>

<Loadable loader={() => import('./documentation.svelte')} {currentRoute} {params} />
