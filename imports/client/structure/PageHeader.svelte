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

    import { getContext } from 'svelte';
    let hdrtext = getContext("pageText").header;
    let hdrshow = getContext("pageConfig").hdrShow;

    import {i18n} from '/imports/functions/func-i18n'
    export let lang;

</script>



{#if hdrshow}

    <header class="content-header mb-4">
        <h2 class="title is-3">{ i18n(hdrtext, "title", lang) }</h2>
        <p class="subtitle lead">{ i18n(hdrtext, "lead", lang) }</p>
        <div class="content is-family-secondary">{@html i18n(hdrtext, "body", lang) }</div>
    </header>

{/if}
