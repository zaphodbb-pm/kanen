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
     *      1. Imports svg file from library and insert into returned object
     *
     */

    //* setup system wide version info
    import { setContext } from 'svelte';
    import version from './version'
    setContext("Version", version);

    //* setup system wide icons as a context
    import icons from '/imports/client/setup/systemIcons'

    const keys =  Object.keys(icons);
    for( const key of keys){
        setContext(key, icons[key]);
    }

    /*
    //* set language preference
    import {writable} from 'svelte/store'
    import {getLang} from './func-getLang'
    let lang = writable( getLang("en") );

     */

    //* load router -> will render main page components based on nav-link selection
    import Pages from 'svelte-router-spa/src/components/router.svelte'
    import {routes} from './routes'


</script>

<Pages {routes} />
