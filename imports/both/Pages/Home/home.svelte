<script>
    /**
     * @summary Layout insert for Home page.
     *
     * @memberof Pages:Home
     * @function home_insert
     * @locus Client
     *
     */


    //* setup props to receive route data
    export let currentRoute;
    export let params;

    //* app services
    import { setContext } from 'svelte';
    import { getContext } from 'svelte';

    //* get the user language preference from store
    import {lang} from '/imports/client/systemStores'

    //* get page text information and set contexts for children components
    import {header, page} from './home_text'

    setContext("pageHdr", header);
    setContext("pageText", page);


    //* get the page header common component; component get gets its own translated text
    import Hdr from '/imports/both/pageStructure/PageHeader.svelte'




    //* page body support **************************
    import Icon from '/imports/components/elements/icon.svelte'
    let out = getContext("iconMark");

    import fiver from '/public/svg_to_js/biking-solid.json'
    let newIcon = fiver;


</script>



<Hdr />


<section class="page-body">

    <div>lang: {$lang}</div>

    <div class="d-flex align-items-center" style="font-size: 3rem;">
        <Icon icon={out}/>
        <span>svelte-icons</span>
    </div>

    <div class="d-flex align-items-center has-text-blue-dark">
        <Icon icon={getContext("iconNotify")} class="icon"/>
        <span>Svelte-Icons</span>
    </div>

    <div class="d-flex align-items-center has-text-blue-dark">
        <span class="icon">
            <Icon icon={newIcon}/>
        </span>

        <span>Gotten svg</span>
    </div>

</section>
