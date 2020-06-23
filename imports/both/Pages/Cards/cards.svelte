<script>
    /**
     * Layout for Cards Page.
     * Builds two sample cards with different configurations
     *
     * @memberof Pages:Cards
     * @function cards
     * @locus Client
     *
     * @param {Object} currentRoute
     * @param {Object} params - url parameters
     *
     */

     //* page set-up boilerplate *************************************

        //** setup props to receive route data
        export let currentRoute;
        export let params;

        //** get page text information and set contexts for children components
        import {i18n} from '/imports/functions/i18n'
        import {lang} from '/imports/client/systemStores'
        import {header, page} from './cards_text'

        //** app services (getContext is often optional)
        import { setContext, getContext, onMount, onDestroy } from 'svelte';
        setContext("pageHdr", header);
        setContext("pageText", page);

        //** (optional) get component configuration information and set contexts for children components
        import pageConfig from './cards_config'
        setContext("pageConfig", pageConfig);

        //** get the page header common component; component get gets its own translated text from "pageText" context
        import Hdr from '/imports/both/pageStructure/PageHeader.svelte'

     //* end of page boilerplate *************************************



    //* page body support **************************
    import Icon from '/imports/components/elements/icon.svelte'
    import Card from '/imports/components/blocks/card.svelte';


    //* respond to component events
    function cardsEvent(event){
        console.log("cardsEvent", event.detail);
    }

</script>



<Hdr />


<section class="page-body columns">

    <article class="column is-6">
        <Card text="cardOne" id="cardsOne">
            <div class="d-flex align-items-center has-text-green-dark title is-3">
                <Icon icon={getContext("iconMark")} class="is-size-3"/>
                <span class="ml-3">Hello World</span>
            </div>
        </Card>
    </article>

    <article class="column is-6">
        <Card text="cardTwo" id="cardsTwo" on:footEvent={cardsEvent}>
            <div class="d-flex align-items-center has-text-green-dark title is-3">
                <Icon icon={getContext("iconPost")} class="is-size-2" />
                <span class="ml-3">Another View</span>
            </div>
        </Card>
    </article>

</section>
