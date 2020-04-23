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

    //* setup system wide icons as a context
    import { setContext } from 'svelte';
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

    //* load main page components
    import Navbar from '../Navbar/Navbar.svelte'
    import MainPage from './MainPage.svelte'


</script>


<Navbar> </Navbar>

<MainPage> </MainPage>


<style>

</style>
