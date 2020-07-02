<script>

    /**
     * Common wrapper around page body specific code.
     * Includes page header component and slot for page body.
     *
     * @memberof Structure:Client
     * @function PageWrapper
     * @locus Client
     *
     */

    //* props
    export let header = null;

    //* get the user language preference from store and text from parent page prop
    import {lang} from '/imports/client/systemStores'
    import {i18n} from '/imports/functions/i18n'

    let text = header ? i18n(header, "", $lang) : null;

</script>



{#if text}
    <header class="content-header mb-5">
        {#if text.title}
            <h2 class="title is-3">{text.title}</h2>
        {/if}

        {#if text.lead}
            <p class="lead">{text.lead}</p>
        {/if}

        {#if text.body}
            <div class="content is-family-secondary">{@html text.body}</div>
        {/if}
    </header>
{/if}


<section class="page-body">
    <slot> </slot>
</section>
