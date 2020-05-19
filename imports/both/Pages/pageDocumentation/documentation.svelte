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
    import { setContext } from 'svelte';
    //import { getContext } from 'svelte';

    // get the user language preference from store (optional)
    import {lang} from '/imports/both/systemStores'

    // get page text information and set contexts for children components
    import pageText from './documentation_text'
    setContext("pageText", pageText);

    // get component configuration information and set contexts for children components
    import pageConfig from './documentation_config'
    setContext("pageConfig", pageConfig);

    // get the page header common component; component get gets its own translated text from "pageText" context
    import Hdr from '/imports/both/pageStructure/PageHeader.svelte'

    //****************************************************************



    //* page-body support **************************
    import {onMount, onDestroy} from 'svelte'
    import {i18n} from '/imports/functions/func-i18n'
    import Accordian from '/imports/components/widgets/accordian.svelte'
    import Paged from '/imports/components/widgets/pagedContent.svelte'

    let content = [];
    let tabSettings = "is-light is-fullwidth justify-content-start";
    let eventMain = "doc-main-topic";
    let eventSub = "doc-subtopic";
    let newCategory = "Getting_Started";
    let newTopic = "";

    //* set up initial introductory information
    let start = ["Getting_Started",         // preamble to add to jsdoc found items
        [
            {name: "Set-Up", info: i18n(pageText.components, "documentation", $lang).setup},
            {name: "Considerations", info: i18n(pageText.components, "documentation", $lang).consider},
        ]
    ];

    let notSupported = ["Getting_Started",
        [{name: "Not_Supported", info: i18n(pageText.components, "documentation").notSupported}]
    ];


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


    onMount( async () => {
        let result = await Meteor.callPromise("fetchDocumentation");
        content = formatDocumentation(result, start, notSupported);
    });


    //* re-package documentation for display as paged content
    function formatDocumentation(res, start, notSupported){
        let content = "not ready";

        if (res && res.length > 0) {

            let list = _.pairs(_.groupBy(res, "memberof"));
            list.unshift(start);

            //** prepare documentation for insertion into an accordion component
            list = list.map(function (li) {
                return {
                    icon: null,
                    label: li && li[0] ? li[0] : "n/a",
                    text: null,
                    dbContent: null,
                    list: li && li[1] ? li[1] : []
                }
            });

            //** keep "Getting Started" content at top and sort the body of a topic
            let temp = list.shift();
            list = _.sortBy(list, "label");

            list = list.map((topic) => {
                topic.list = _.sortBy(topic.list, "name");
                return topic;
            });

            list.unshift(temp);
            content = list;

        } else {
            content = notSupported;
        }

        return content;
    }

</script>



<Hdr />



<section class="page-body">

    <div id="documentation-list">
        <div class="columns">

            <div class="column is-3">
                <Accordian {tabSettings} {content} {eventMain} {eventSub}
                           on:doc-main-topic="{changeBody}" on:doc-subtopic="{changeSub}"/>
            </div>

            <div class="column">
                <Paged {content} {newCategory} {newTopic} />
            </div>

        </div>
    </div>

</section>
