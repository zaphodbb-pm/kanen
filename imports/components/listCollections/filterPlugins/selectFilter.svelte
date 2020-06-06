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
    import {onMount, onDestroy, createEventDispatcher} from 'svelte';
    const dispatch = createEventDispatcher();

    //* local reactive variable
    let selected;
    let outFilter = {};
    let inValue = "";


    console.log("select field", field);


    //* lifecycle states
    onMount( () => {

    });

    onDestroy( () => {

    });


    //* event handlers
    function clearDateRange() {
        inValue = "";
        outFilter[field.field] = null;


        dispatch("filter-changed", outFilter);
    }

    function dateUpdate(ev) {

        dispatch("filter-changed", outFilter);
    }




    function emitFilter(sel) {

        console.log("emitFilter", sel);





        let val = sel.replace("_id.", "");

        if (sel === "_id.none") {
            //delete outFilter[field + "._id"];

            outFilter[field.field] = null;

        } else {
            //outFilter[field + "._id"] = {$in: [val]};

            outFilter[field.field] = {$in: [val]};
        }

        console.log("outFilter", outFilter);

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
