<script>

    /**
     * Main / top Svelte component for this application
     *
     * @memberof Structure:Client
     * @function App
     * @isTemplate true
     * @locus Client
     *
     * @returns {Object} out - holds the icon svg info
     *
     * @notes
     *      1. context: "Version" - app version info
     *      2. context: "icon<Name>" - imports svg file from library and insert into returned object
     *      3. context: "Docs" - mongodb doc options / limits
     *      4. context: "Colors" - hex colour values
     *      5. context: "Comps" - css strings for components
     *      6. context: "Theme" - css strings for theming items
     *
     */

    import { setContext } from 'svelte';

    //* setup system wide version info
    import version from './version'
    setContext("Version", version);

    //* setup system wide icons as a context
    import icons from '/imports/client/setup/systemIcons'

    const keys =  Object.keys(icons);
    for( const key of keys){
        setContext(key, icons[key]);
    }

    //* setup system wide constants
    /*
    import {documents, colors, colorArrays, components, theme } from '/imports/client/setup/systemGlobals'
    setContext("Docs", documents);
    setContext("Colors", colors);
    setContext("ColorArrays", colorArrays);
    setContext("Comps", components);
    setContext("Theme", theme);
     */


    //* load router -> will render main page components based on nav-link selection
    import Pages from 'svelte-router-spa/src/components/router.svelte'
    import {routes} from './routes'


</script>

<Pages {routes} />
