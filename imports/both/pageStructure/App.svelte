<script>

    /**
     * Main / top Svelte component for this application
     *
     * @memberof Structure:Client
     * @function App
     * @locus Client
     *
     * @notes
     *      1. context: "Version" - app version info
     *      2. context: "icon<Name>" - imports svg file from library and insert into returned object
     *
     *      3. systemGlobals: "documents" - mongodb doc options / limits
     *      4. systemGlobals: "colors" - hex colour values
     *      5. systemGlobals: "colorArrays" - array of hex colour values for threshold colour change
     *      6. systemGlobals: "components" - css strings for components
     *      7. systemGlobals: "theme" - css strings for theming items
     *
     */

    import { onMount, setContext, getContext } from 'svelte';

    //* setup system wide version info
    import version from '../../client/setup/version'
    setContext("Version", version);

    //* setup system wide icons as a context
    import {mainIcons} from '/imports/client/setup/systemIcons'

    const keys =  Object.keys(mainIcons);
    for( const key of keys){
        setContext(key, mainIcons[key]);
    }

    //* get system wide constants
    //import {documents, colors, colorArrays, components, theme } from '/imports/client/setup/systemGlobals'

    //* load router -> will render main page & components based on nav-link selection
    import Pages from 'svelte-router-spa/src/components/router.svelte'
    import {routes} from '../routes'


</script>

<Pages {routes} />
