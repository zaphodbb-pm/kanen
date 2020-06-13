<script>
    /**
     * @summary Layout for Documentation page.
     *
     * @memberof Pages:Documentation
     * @function documentation
     * @locus Client
     *
     */


    //* page set-up boilerplate *************************************

    // setup props to receive route data
    export let currentRoute;
    export let params;

    // app services (getContext is often optional)
    import { setContext, getContext } from 'svelte';
    //import { getContext } from 'svelte';

    // get the user language preference from store (optional)
    import {lang} from '/imports/client/systemStores'

    // get page text information and set contexts for children components
    import {header, page} from './documentation_text'

    setContext("pageHdr", header);
    setContext("pageText", page);


    // get the page header common component; component get gets its own translated text from "pageText" context
    import Hdr from '/imports/both/pageStructure/PageHeader.svelte'

    //****************************************************************



    //* page-body support **************************
    import {onMount, onDestroy} from 'svelte'
    import {i18n} from '/imports/functions/i18n'
    import Accordian from '/imports/components/widgets/accordian.svelte'
    import Paged from '/imports/components/widgets/pagedContent.svelte'

    let result = [];
    let content = [];
    let tabSettings = "is-light is-fullwidth justify-content-start";
    let eventMain = "doc-main-topic";
    let eventSub = "doc-subtopic";
    let newCategory = "Getting_Started";
    let newTopic = "";

    //* set up initial introductory information
    let preamble = [
        {
            icon: null,
            label: "Getting_Started",
            text: null,
            dbContent: null,
            list: [
                {name: "Set-Up", info: i18n(page.components, "documentation", $lang).setup},
                {name: "Considerations", info: i18n(page.components, "documentation", $lang).consider},
            ]
        }
    ];


    //* lifecycle
    onMount( async () => {
        let results = await Meteor.callPromise("fetchDocumentation");
        content = preamble.concat(results);
    });


    //* switch categories and topics
    function changeBody(msg) {
        newCategory = msg.detail;
    }

    function changeSub(msg) {
        let el = document.getElementById(msg.detail);
        if(el){
            el.scrollIntoView({behavior: "smooth", block: "center", inline: "start"});
        }
    }

    function getSvelte(){
        console.log("getSvelte")
        Meteor.call("buildDSvelteJsdoc");
    }

    function buildDocumentation(){
        console.log("buildDocumentation")

        Meteor.call("fetchDocumentation");
    }

</script>



<Hdr />



<section class="page-body">

    <div class="columns">

        <div class="column is-offset-3">
            <div class="mb-3">
                {@html i18n(page.page, "howToUse", $lang)}
            </div>

            <div class="level">
                <button class="button is-primary is-outlined" on:click={getSvelte}>
                    {i18n(page.components, "btnJsdoc", $lang)}
                </button>

                <button class="button is-primary is-outlined" on:click={buildDocumentation}>
                    {i18n(page.components, "btnGetDocs", $lang)}
                </button>
            </div>

        </div>
    </div>

    <div id="documentation-list">
        <div class="columns">

            <div class="column is-3">
                <Accordian {tabSettings} text="{content}" {eventMain} {eventSub}
                           on:doc-main-topic="{changeBody}" on:doc-subtopic="{changeSub}"/>
            </div>

            <div class="column">
                <Paged {content} {newCategory} {newTopic} />
            </div>


        </div>
    </div>

</section>
