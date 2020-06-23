<script>
    /**
     * Layout for PubSub page.
     *
     * @memberof Pages:PubSub
     * @function pubSub
     * @locus Client
     *
     */


     //* page set-up boilerplate *************************************

        //** setup props to receive route data
        export let currentRoute;
        export let params;

        //** get page text information and set contexts for children components
        import {i18n} from '/imports/functions/i18n'
        import {lang} from '/imports/client/systemStores'
        import {header, page} from './pubSub_text'

        //** app services (getContext is often optional)
        import { setContext } from 'svelte';
        setContext("pageHdr", header);
        setContext("pageText", page);

        //** get component configuration information and set contexts for children components
        import pageConfig from './pubSub_config'
        setContext("pageConfig", pageConfig);

        //** get the page header common component; component get gets its own translated text from "pageText" context
        import Hdr from '/imports/both/pageStructure/PageHeader.svelte'

     //* end of page boilerplate *************************************



    //* page-body support **************************
    import {onMount, onDestroy} from 'svelte'


    let len = 5;
    let colours = ["is-primary", "is-info", "is-link", "is-success", "is-warning", "is-danger"]

    let values = new Array(len).fill(0);
    let intervalId = null;

    RealTime.subscribe("testRealTime");

    onMount( () => {

        setTimeout(function(){

            let rt = RealTime.find({}).fetch();

            console.log("rt", rt);

        });




        intervalId = setInterval( function(){
            let newArray = [];

            for( let i = 0; i < len; i++){
                newArray[i] = Math.round( Math.random() * 100 );
            }

            values = newArray;

        }, 2000);

    });

    onDestroy( () => {
        console.log("pubSub page destroyed");

        if(intervalId){
            clearInterval(intervalId);
        }
    });

</script>



<Hdr />



<section class="page-body section">

    {#each values as value, idx (idx)}
        <div class="d-flex justify-content-between mb-2">
            <div>{idx} - {value} - {idx % colours.length}</div>

            <div class="w-90">
                <progress class="progress {colours[idx % colours.length]}" value="{value}" max="100">{value}%</progress>
            </div>
        </div>
    {/each}

</section>
