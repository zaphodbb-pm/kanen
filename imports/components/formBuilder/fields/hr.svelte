<script>
    /**
     * Horizontal divider component.
     *
     * @memberof Components:Form
     * @function hr
     * @locus Client
     * @augments fieldWrapper
     *
     */

    //* common props from parent
    export let field = {};

    //* support functions
    import {getContext} from 'svelte'
    let formText = getContext("formText");
    let tag = formText[field.field] && formText[field.field].tag ? formText[field.field].tag : "";

</script>

<div class="is-divider field-hr"
     style="margin: 3rem 0 2rem 0;"
     id="{field.field}"
     data-content="{tag}">

</div>


<style>
    .field-hr::after {
        color: #777 !important;
        font-size: 1rem;
    }

</style>
