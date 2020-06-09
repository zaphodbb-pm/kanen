<script>
    /**
     * Generic loader as a shim to insert page controller.
     *
     * @memberof Pages:Login
     * @function login_loader
     * @locus Client
     *
     * @notes
     *  1. This loader helps reduce the initial bundle size sent to the browser.
     *  2. This loader is optional and can be removed at the <page>_route.js file.
     *  3. Each page can have either a loader to dynamically import it (if the page is heavy) or
     *      be part of the initial bundle for snappier response.  Your choice.
     *  4. Since "import" and "webpack" don't play well with variables, we need to
     *      be pedantic with building a loader file per page.
     *
     */


    //* setup props to receive route data and pass down into page component
    export let currentRoute;
    export let params;

    //* get svelte component loader
    import Loadable from 'svelte-loadable';


</script>

<Loadable loader={() => import('./login.svelte')} {currentRoute} {params} />
