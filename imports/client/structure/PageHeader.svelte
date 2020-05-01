<script>

    /**
     * @summary Common page header for visible pages.
     *
     * @memberof Structure
     * @function PageHeader
     * @locus Client
     * @isTemplate true
     *
     */

    import {i18n} from '/imports/functions/func-i18n'

    export let hdrtext = null;
    export let lang;

</script>



{#if hdrtext}

    <header class="content-header mb-4">
        {#if hdrtext.title}
            <h2 class="title is-3">{ i18n(hdrtext, "title", lang) }</h2>
        {/if}

        {#if hdrtext.lead}
            <p class="subtitle lead">{ i18n(hdrtext, "lead", lang) }</p>
        {/if}

        {#if hdrtext.body}
            <div class="content is-family-secondary">{@html i18n(hdrtext, "body", lang) }</div>
        {/if}
    </header>

{/if}
