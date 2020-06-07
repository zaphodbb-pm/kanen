<script>
    /**
     * Selection box filter plugin for List Holder Filters.
     *
     * @memberof Components:List
     * @function selectFilter
     * @augments listFilter
     *
     * @param  {Object} field - field info that also configures the filter
     *
     * @emits {Object} - filter-changed -> {outFilter: <fieldName>: {$gte: isodate, $lte: isodate } }
     *
     */

    //* props
    export let field = {};

    //* support functions
    import {createEventDispatcher} from 'svelte';
    const dispatch = createEventDispatcher();

    //* local reactive variables
    let selected;
    let outFilter = {};


    //* event handlers
    function emitFilter(sel) {
        let val = sel.replace("_id.", "");

        if (sel === "none" || sel === "all" ) {
            outFilter[field.field + "._id"] = null;
        } else {
            outFilter[field.field + "._id"] = val;
        }

        dispatch("filter-changed", outFilter);
    }

</script>



<div class="select">
    <select title="Filter"
            bind:value="{selected}"
            on:change="{() => emitFilter( selected ) }">

        {#each field.filterText as filt}
            <option value="{filt._id}">
                {filt.name}
            </option>
        {/each}}
    </select>
</div>
