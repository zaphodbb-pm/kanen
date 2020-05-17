<script>
    /**
     * @summary Layout for Cards.
     *
     * @memberof Pages:Cards
     * @function cards
     * @locus Client
     *
     */


    //* setup props to receive route data
    export let currentRoute;
    export let params;

    //* get the user language preference from store
    import {lang} from '/imports/both/pageStructure/systemStores'
    let lng = $lang;

    //* app services
    import { setContext } from 'svelte';
    import { getContext } from 'svelte';

    //* get page text information and set contexts for children components
    import pageText from './cards_text'
    setContext("pageText", pageText);

    //* get page text information and set contexts for children components
    import pageConfig from './cards_config'
    setContext("pageConfig", pageConfig);

    //* get the page header common component and
    import Hdr from '/imports/both/pageStructure/PageHeader.svelte'




    //* page body support **************************
    import {i18n} from '/imports/functions/func-i18n'
    import Icon from '/imports/components/elements/icon.svelte'
    import Card from '/imports/components/blocks/card.svelte';

    let compText = pageText.components;

    //** respond to component events
    function cardsEvent(event){
        console.log("cardsEvent", event.detail);
    }

</script>



<Hdr hdrtext={pageText.header} lang={lng} />


<section class="page-body columns">

    <article class="column is-6">

        <Card text={compText.cardOne} lang={lng} id="cardsOne">
            <div class="d-flex align-items-center has-text-green-dark title is-3">
                <Icon icon={getContext("iconMark")} class="is-size-3"/>
                <span class="ml-3">Hello World</span>
            </div>
        </Card>

    </article>

    <article class="column is-6">

        <Card text={compText.cardTwo} lang={lng} id="cardsTwo" on:footEvent={cardsEvent}>
            <div class="d-flex align-items-center has-text-green-dark title is-3">
                <Icon icon={getContext("iconPost")} class="is-size-2" />
                <span class="ml-3">Another View</span>
            </div>
        </Card>

    </article>

</section>
