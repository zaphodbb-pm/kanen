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

    <div class="level">

        <div class="level-right">
            main intro text
        </div>

        <div class="level-right">
            <figure class="image is-128x128">
                <img src="https://bulma.io/images/placeholders/256x256.png">
            </figure>
        </div>

    </div>



    <div class="columns mt-5">

        <div class="column">
            <div class="box">
                philosophy
            </div>
        </div>

        <div class="column">
            <div class="box">
                features
            </div>
        </div>

        <div class="column">
            <div class="box">
                performance
            </div>
        </div>
    </div>

</section>
