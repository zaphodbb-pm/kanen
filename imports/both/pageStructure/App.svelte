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
     *      2. context: "commonText" - system wide text strings
     *      3. context: "icon<Name>" - imports svg file from library and insert into returned object
     *
     *      4. systemGlobals: "documents" - mongodb doc options / limits
     *      5. systemGlobals: "colors" - hex colour values
     *      6. systemGlobals: "colorArrays" - array of hex colour values for threshold colour change
     *      7. systemGlobals: "components" - css strings for components
     *      8. systemGlobals: "theme" - css strings for theming items
     *
     */

    import { onMount, setContext, getContext } from 'svelte';

    //* setup system wide version info
    import version from '/imports/client/setup/version'
    setContext("Version", version);

    //* setup system wide text strings (all languages)
    import commonText from '/imports/client/setup/textCommon'
    setContext("commonText", commonText);

    //* setup system wide Icons as a context
    import {mainIcons} from '/imports/client/setup/systemIcons'

    const keys =  Object.keys(mainIcons);
    for( const key of keys){
        setContext(key, mainIcons[key]);
    }

    //* get system wide constants
    //import {documents, colors, colorArrays, components, theme } from '/imports/client/setup/systemGlobals'

    //* set up user extra items
    import {userPosition} from '/imports/both/systemStores'

    navigator.geolocation.getCurrentPosition(function (position) {
        $userPosition = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,

            accuracy: position.coords.accuracy,
            altitude: position.coords.altitude,
            altitudeAccuracy: position.coords.altitudeAccuracy,
            heading: position.coords.heading,
            speed: position.coords.speed,
        };
    });

    //* load router -> will render main page & components based on nav-link selection
    import Navbar from '../Navbar/Navbar.svelte'

    import Pages from 'svelte-router-spa/src/components/router.svelte'
    import { activeRoute } from 'svelte-router-spa/src/store'
    import {routes} from '../routes'


</script>


<Navbar currentRoute="{$activeRoute}" />

<Pages {routes} />
