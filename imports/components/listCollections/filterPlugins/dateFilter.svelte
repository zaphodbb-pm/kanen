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
     * @emits filter-changed -> {outFilter: <fieldName>: {$gte: isodate, $lte: isodate } }
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

    let relativeDates = field.filterText && field.filterText.relativeDates && Array.isArray(field.filterText.relativeDates);
    let selected;

    //* lifecycle states
    onMount( () => {
        //** if using absolute date range, then mount "filepickr" component
        if(!relativeDates){
            let target = document.getElementById("fp_" + field.field);
            fp = flatpickr(target, field.filter);
            fp.config.onChange.push(dateUpdate );
            fp.jumpToDate(inValue);
        }
    });

    onDestroy( () => {
        if(!relativeDates){
            fp.destroy();
        }
    });


    //* event handlers
    function emitFilter(sel) {

        if (sel === "none" || sel === "all" ) {
            outFilter[field.field] = null;
        } else {
            let now = Date.now();
            let parts = sel.split("_");
            let offset = parseInt( parts[2] ) * 1000 * 3600 * 24;   // time expressed in milliseconds / day
            let dir = parts[1] === "p" ? -1 : 1;

            let past = ( new Date(now - offset) ).toISOString();
            let today = ( new Date(now) ).toISOString();
            let future = ( new Date(now + offset) ).toISOString();

            outFilter[field.field] = dir < 0 ? {$gte: past, $lte: today} : {$gte: today, $lte: future};
        }

        dispatch("filter-changed", outFilter);
    }

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

            if(field.type === "timeStamp"){
                outFilter[field.field] = {$gte: start.getTime(), $lte: end.getTime()};
            }else{
                outFilter[field.field] = {$gte: start.toISOString(), $lte: end.toISOString()};
            }

            hasRange = true;
            dispatch("filter-changed", outFilter);
        }
    }

</script>



{#if relativeDates}

    <div class="date select">
        <select title="Filter"
                bind:value="{selected}"
                on:change="{() => emitFilter( selected ) }">

            {#each field.filterText.relativeDates as filt}
                <option value="{filt._id}">
                    {filt.name}
                </option>
            {/each}}
        </select>
    </div>

{:else}

    <div class="date field has-addons">
        <div class="control">
            <label>
                <input type="text"
                       id="fp_{field.field}"
                       class="input"
                       style="width: 14rem;"
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

{/if}
