<script>
    /**
     * @summary Insert Layout for Page Two.
     *
     * @memberof Pages:PageTwo
     * @function pageTwo_insert
     * @locus Client
     * @augments pageTwo
     *
     */

    //* common page setup information

        //** setup props
        export let lang;

        //** get required services and component text
        import { getContext } from 'svelte';
        import {i18n} from '/imports/functions/func-i18n'
        let compText = getContext("pageText").components;

        //** get any other required components
        import Icon from 'svelte-awesome/components/Icon.svelte';
        import Card from '/imports/components/blocks/card.svelte';

        //** respond to component events
        function cardEvent(event){

            console.log("cardEvent", event.detail);
        }

</script>


<section class="columns">

    <article class="column is-6">

        <Card text={compText.cardOne} lang={lang} id="cardOne">
            <div class="d-flex align-items-center has-text-green-dark title is-3">
                <Icon data={getContext("iconMark")} scale="2"/>
                <span class="ml-3">Hello World</span>
            </div>
        </Card>

    </article>

    <article class="column is-6">

        <Card text={compText.cardTwo} lang={lang} id="cardTwo" on:footEvent={cardEvent}>
            <div class="d-flex align-items-center has-text-green-dark title is-3">
                <Icon data={getContext("iconPost")} scale="4"/>
                <span class="ml-3">Another View</span>
            </div>
        </Card>

    </article>

</section>
