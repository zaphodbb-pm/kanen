<script>
    /**
     * Shows page count as range / total of search (total docs).
     *
     * @memberof Components:List
     * @function pageCount
     * @locus Client
     *
     * @param  {String} pageCountLabel
     *
     */

    //* props
    export let pageCountLabel = "";

    //** support functions
    import {getContext} from 'svelte';
    import Icon from '/imports/components/elements/icon.svelte'

</script>


<div class="ml-4 mb-3 d-flex align-items-center">
    <Icon icon='{getContext("iconDoc")}' class="text-1dot5rem"/>
    <span>{pageCountLabel}</span>
</div>
