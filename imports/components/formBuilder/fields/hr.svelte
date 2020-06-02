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



<div id="{field.field}"
     class="is-divider field-hr hr-buffer"
     data-content="{tag}">

</div>



<style>
    .field-hr::after {
        color: #777 !important;
        font-size: 1rem;
    }

    .hr-buffer {
        margin: 1rem 0 0.5rem 0;
    }

</style>
