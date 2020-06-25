<script context="module">
    //** change source for values

    //** can be any external source that creates values
    //** set up initial docs and their values
    let len = 15;
    let interval = 3000;

    let generateValues = function(len){
        let newArray = [];
        for( let i = 0; i < len; i++){
            newArray[i] = {
                name: "real_time_" + i,
                value: Math.round( Math.random() * 100 )
            };
        }

        return newArray;
    }

    let newArray = generateValues(len);

    Meteor.call("bulkLoadDocs", "realTime", newArray, function(err, res){
        if(err){ console.log("Bulk Upload Failed: ", err);}
        if(res){ Meteor.subscribe("testRealTime", [], {}); }
    });

</script>


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
    let colours = ["is-primary", "is-info", "is-link", "is-success", "is-warning", "is-danger"]
    let values = new Array(len).fill({name: "init", value: 0});

    let timeStart = Date.now();
    let timeEnd = Date.now();
    let currentItem = "";
    let intervalId = null;

    onMount( () => {

        //** update all documents at once with random values with direct write method
        intervalId = setInterval( function(){
            Meteor.call("updateRealTimeDoc", "realTime", generateValues(len), function(err, res){
                if(err){console.log("Update Real Time failed: ", err);}
            });

        }, interval);

        //** respond to db changes propagated in real time from server over Meteor Publish / Subscribe
        Tracker.autorun(function(){
            let rt = RealTime.find({}, {limit: len}).fetch();

            currentItem = rt && rt[0] && rt[0].name ? rt[0].name: "init";
            timeStart = rt && rt[0] && rt[0].updatedAt ? rt[0].updatedAt : Date.now();
            timeEnd = Date.now();

            values = rt;
        });

    });

    onDestroy( () => {
        if(intervalId){
            clearInterval(intervalId);
        }
    });

</script>



<Hdr />



<section class="page-body">

    <div class="buffer-small">
        Time from inject to respond: {timeEnd - timeStart} milliseconds for {currentItem}
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
