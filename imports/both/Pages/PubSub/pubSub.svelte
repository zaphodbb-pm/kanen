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
        import { setContext, getContext, onMount, onDestroy } from 'svelte';
        setContext("pageHdr", header);
        setContext("pageText", page);

        //** (optional) get component configuration information and set contexts for children components
        import pageConfig from './pubSub_config'
        setContext("pageConfig", pageConfig);

        //** get the page header common component; component get gets its own translated text from "pageText" context
        import Hdr from '/imports/both/pageStructure/PageHeader.svelte'

    //* end of page boilerplate *************************************



    //* page-body support **************************
    let len = 10;
    let colours = ["is-primary", "is-info", "is-link", "is-success", "is-warning", "is-danger"]

    let values = new Array(len).fill({name: "init", value: 0});
    let intervalId = null;
    let singleId = null;
    let singleUpdate = 0;

    let timeStart = Date.now();
    let timeEnd = Date.now();

    let test = null;

    $: {
        test = Meteor.subscribe("testRealTime");

        console.log("test", test);
    }



    onMount( () => {

        //** respond to db changes in real time
        Tracker.autorun(function(){
            let rt = RealTime.find({}, {limit: len}).fetch();

            if(rt && rt[singleUpdate] && rt[singleUpdate].updatedAt){
                timeEnd = Date.now();
                timeStart = rt[singleUpdate].updatedAt;

                console.log("rt", rt, timeEnd - timeStart);
            }

            values = rt;
        });


        //** change source for values
        //** can be any external source that creates values
        //intervalId = setInterval( function(){
            let newArray = [];

            for( let i = 0; i < len; i++){
                newArray[i] = {
                    name: "real_time_" + i,
                    value: Math.round( Math.random() * 100 )
                };
            }

            Meteor.call("bulkLoadDocs", "realTime", newArray, function(err, res){
                //console.log("bulkLoadDocs", timeStart, err, res);
            });

        //}, 10000);


        //** randomly update a single document
        singleId = setInterval( function(){

            let index = Math.round( Math.random() * len );

            let doc = {
                name: "real_time_" + index,
                value: Math.round( Math.random() * 100 )
            };

            Meteor.call("bulkLoadDocs", "realTime", [doc], function(err, res){
                //console.log("bulkLoadDocs", timeStart, err, res);
                singleUpdate = index;
            });


        }, 1000);



    });

    onDestroy( () => {
        console.log("pubSub page destroyed");

        if(intervalId){
            clearInterval(intervalId);
        }
    });

</script>



<Hdr />



<section class="page-body">

    <div class="buffer-small">
        Time from inject to respond: {timeEnd - timeStart} milliseconds
    </div>

    <section class="section">
        {#each values as item, idx (idx)}
            <div class="d-flex justify-content-between mb-2">
                <div>{item.name} - {item.value}</div>

                <div class="w-80">
                    <progress class="progress {colours[idx % colours.length]}" value="{item.value}" max="100">{item.value}%</progress>
                </div>
            </div>
        {/each}
    </section>

</section>
