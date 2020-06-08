<script>
    /**
     * Builds filter component for list.
     *
     * @memberof Components:List
     * @function listFilters
     * @locus Client
     * @augments listHolder
     *
     * @param  {Array} filters - array of filter objects
     *
     * @returns {Object} - emits 'filters-changed' - a valid MongoDb selector object across all filter components
     *
     * @notes
     *  Types:
     *      "date" - looks for a fixed date within a date range filter
     *      "select" - looks for docs that meet the selector value
     *      "object" - looks for docs that have a "geoLocation" field value; relative distance from the user
     *
     */

    //* props
    export let filters = [];

    //* support functions
    import {createEventDispatcher} from 'svelte';
    const dispatch = createEventDispatcher();

    //* add filter plugins
    import Filter_Date from './filterPlugins/dateFilter.svelte'
    import Filter_Select from './filterPlugins/selectFilter.svelte'
    import Filter_Geo from './filterPlugins/geoFilter.svelte'

    let filterInserts = {
        date: Filter_Date,
        select: Filter_Select,
        address: Filter_Geo,
    }

    //* local reactive variables
    let outFilter = {};

    //* event handlers
    function filterUpdate(msg){
        Object.entries(msg.detail).forEach( (m) => {
            if (m[1] ){
                outFilter[ m[0] ] = m[1];
            }else{
               delete outFilter[ m[0] ];
            }
        })

        dispatch("filters-changed", outFilter);
    }

</script>


<div class="list-filters filter-selects">
    {#each filters as field (field.field) }
        <div class="filter-items">

            <svelte:component
                    this="{filterInserts[field.type]}"
                    {field}
                    on:filter-changed="{filterUpdate}"/>

        </div>
    {/each}
</div>



<style>

    .filter-selects {
        align-items: center;
        display: flex;
        flex-basis: auto;
        flex-grow: 0;
        flex-shrink: 0;

        justify-content: end;
        flex-wrap: wrap;
    }

    .filter-items {
        padding: 0 0.5rem 0.75rem 0;
    }

</style>
