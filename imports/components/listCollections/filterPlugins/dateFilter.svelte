<script>
    /**
     * Date filter plugin for List Holder Filters.
     *
     * @memberof Components:List
     * @function dateFilter
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
    import flatpickr from 'flatpickr';
    import 'flatpickr/dist/flatpickr.css'
    import {onMount, onDestroy, createEventDispatcher} from 'svelte';
    const dispatch = createEventDispatcher();

    //* local reactive variable
    let outFilter = {};
    let hasRange = false;
    let inValue = "";
    let fp;


    //* lifecycle states
    onMount( () => {
        let target = document.getElementById("fp_" + field.field);
        fp = flatpickr(target, field.filter);
        fp.config.onChange.push(dateUpdate );
        fp.jumpToDate(inValue);
    });

    onDestroy( () => {
        fp.destroy();
    });


    //* event handlers
    function clearDateRange() {
        inValue = "";
        outFilter[field.field] = null;
        hasRange = false;
        fp.clear();
        dispatch("filter-changed", outFilter);
    }

    function dateUpdate(ev) {
        if (Array.isArray(ev) && ev.length === 2) {
            let start = new Date(ev[0]);
            let end = new Date(ev[1]);

            outFilter[field.field] = {$gte: start.toISOString(), $lte: end.toISOString()};
            hasRange = true;
            dispatch("filter-changed", outFilter);
        }
    }

</script>




<div class="date field has-addons">
    <div class="control">
        <label>
            <input type="text"
                   id="fp_{field.field}"
                   class="input"
                   bind:value="{inValue}"
                   placeholder={field.filterText.placeholder}>

        </label>
    </div>

    {#if hasRange}
        <div class="control">
            <a class="button is-warning" on:click="{clearDateRange}">
                <div class="delete"></div>
            </a>
        </div>
    {/if}
</div>
