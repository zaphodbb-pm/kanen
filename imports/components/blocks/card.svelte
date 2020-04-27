<script>

    /**
     * @summary Component block: card.
     *
     * @memberof Components:Blocks
     * @function card
     * @locus Client
     * @isTemplate true
     *
     */

    import {i18n} from '/imports/functions/func-i18n'
    export let lang;
    export let text;
    export let id;

    //** event handlers
    import {createEventDispatcher} from 'svelte';
    const dispatch = createEventDispatcher();

    function footEvent(id, key, label){
        dispatch("footEvent", {item: id, key: key, label: label} );
    }

</script>


<div class="card {id ? id : ''}">
    {#if text.title}
        <header class="card-header">
            <p class="card-header-title">{i18n(text, "title", lang)}</p>
        </header>
    {/if}

    {#if text.image}
        <div class="card-image">
            <figure class="image is-3by1">
                <img src={text.image} alt="Placeholder image">
            </figure>
        </div>
    {/if}

    <div class="card-content">
        <slot> </slot>
    </div>

    {#if text.footer }
        <footer class="card-footer">
            {#each i18n(text, "footer", lang) as foot, idx}
                <a href="#"
                   class="card-footer-item"
                   on:click={ () => footEvent(id, idx, foot) }>

                    {foot}
                </a>
            {/each}
        </footer>
    {/if}
</div>
