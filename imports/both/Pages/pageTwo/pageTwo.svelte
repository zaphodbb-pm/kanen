<script>
    /**
     * @summary Layout for Page One.
     *
     * @memberof Pages:PageOne
     * @function pageOne
     * @locus Client
     *
     */


    //* setup props to receive route data
    export let currentRoute;
    export let params;

    //* get the user language preference from store
    import {lang} from '/imports/client/structure/systemStores'
    let lng = $lang;

    //* app services
    import { setContext } from 'svelte';
    import { getContext } from 'svelte';

    //* get page text information and set contexts for children components
    import pageText from './pageTwo_text'
    setContext("pageText", pageText);

    //* get page text information and set contexts for children components
    import pageConfig from './pageTwo_config'
    setContext("pageConfig", pageConfig);

    console.log("pageConfig", pageConfig);

    //* get the page header common component and
    import Hdr from '/imports/client/structure/PageHeader.svelte'




    //* page body support **************************
    import {i18n} from '/imports/functions/func-i18n'
    import Icon from 'svelte-awesome/components/Icon.svelte';
    import Card from '/imports/components/blocks/card.svelte';

    let compText = pageText.components;

    //** respond to component events
    function cardEvent(event){

        console.log("cardEvent", event.detail);
    }

</script>



<Hdr lang={lng} />


<section class="page-body columns">

    <article class="column is-6">

        <Card text={compText.cardOne} lang={lng} id="cardOne">
            <div class="d-flex align-items-center has-text-green-dark title is-3">
                <Icon data={getContext("iconMark")} scale="2"/>
                <span class="ml-3">Hello World</span>
            </div>
        </Card>

    </article>

    <article class="column is-6">

        <Card text={compText.cardTwo} lang={lng} id="cardTwo" on:footEvent={cardEvent}>
            <div class="d-flex align-items-center has-text-green-dark title is-3">
                <Icon data={getContext("iconPost")} scale="4"/>
                <span class="ml-3">Another View</span>
            </div>
        </Card>

    </article>

</section>
