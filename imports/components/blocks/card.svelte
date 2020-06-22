<script>

    /**
     * Component block: card.
     *
     * @memberof Components:Blocks
     * @function card
     * @locus Client
     *
     * @emits 'footEvent' - {item: id, key: key, label: label}
     */

    //* setup props to receive component data
    export let text;            // text object; child of pageText.components
    export let id;              // unique component id

    //* get the user language preference from store and text from context
    import { getContext } from 'svelte';
    import {lang} from '/imports/client/systemStores'
    import {i18n} from '/imports/functions/i18n'

    let cardText = getContext("pageText").components[text];

    //** event handlers
    import {createEventDispatcher} from 'svelte';
    const dispatch = createEventDispatcher();

    function footEvent(id, key, label){
        dispatch("footEvent", {item: id, key: key, label: label} );
    }

</script>


<div class="card {id ? id : ''}">
    {#if cardText.title}
        <header class="card-header">
            <p class="card-header-title">{i18n(cardText, "title", $lang)}</p>
        </header>
    {/if}

    {#if cardText.image}
        <div class="card-image">
            <figure class="image is-3by1">
                <img src={cardText.image} alt="Placeholder image">
            </figure>
        </div>
    {/if}

    <div class="card-content">
        <slot> </slot>
    </div>

    {#if cardText.footer }
        <footer class="card-footer">
            {#each i18n(cardText, "footer", $lang) as foot, idx}
                <a href="#"
                   class="card-footer-item"
                   on:click={ () => footEvent(id, idx, foot) }>

                    {foot}
                </a>
            {/each}
        </footer>
    {/if}
</div>
