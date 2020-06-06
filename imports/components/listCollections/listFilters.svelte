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
     *      Filter can search objects as well.  Format is fieldName + "<parentField>.<childName>".
     *
     *      If the field is named "status" and holds an object of the form {_id, name, colour},
     *      then the filter value for the list item "status" would be {{_id: "_id.paid", ... }
     *      if the "paid" option was selected.
     *
     *      Types:
     *          "date" - looks for a fixed date within a date range filter
     *          "relativeDate" - looks for docs that are within now plus some days
     *          "inDateRange" - looks for docs that are lte and end date
     *          "byDayOfWeek" - docs gte today and a day of the week
     *
     */

    //* props
    export let filters = [];

    //* support functions
    import {onMount, onDestroy, setContext, getContext} from 'svelte'
    import {createEventDispatcher} from 'svelte';
    const dispatch = createEventDispatcher();

    //* add plugins
    import Filter_Date from './filterPlugins/dateFilter.svelte'
    import Filter_Select from './filterPlugins/selectFilter.svelte'

    let filterInserts = {
        date: Filter_Date,
        text: Filter_Select,
    }

    //* local reactive variables
    let buildSelector = [];
    let outFilter = {};


    $: console.log("list filters", filters);


    onMount( () => {
        buildSelector = buildSelection(filters);
    });

    function buildSelection(filters) {
        //* add a current value field for selections to track user selections; default value is none
        return filters.map((filt) => {
            let temp = filt;
            temp.current = "_id.none";
            return temp;
        });
    }




    /*
    function emitFilter(field, sel) {
        switch (true) {
                //** build geolocation object
            case field.includes("geoLocation"):
                //*** default values if user does not have a position
                let lat = 45;
                let lng = -75;
                let dist = 1000 * 1000;

                //** get user position and set radius
                let me = Session.get("userPosition");

                if ( me && !_.isEmpty(me) ) {
                    lat = me.lat;
                    lng = me.lng;

                    if (sel === "_id.nearby") {
                        dist = 5 * 1000
                    }
                    if (sel === "_id.citywide") {
                        dist = 30 * 1000
                    }
                    if (sel === "_id.inregion") {
                        dist = 250 * 1000
                    }
                }

                outFilter[field] = {
                    $nearSphere: {
                        $geometry: {
                            type: "Point",
                            coordinates: [lng, lat]
                        },
                        $maxDistance: dist
                    }
                };

                break;

            case field.includes("geoLocation") && sel === "_id.none":
                delete outFilter[field];
                break;

            case sel === "_id.none":
                let frag = sel.split(".");
                delete outFilter[field + "." + frag[0]];
                break;

                //** use dot notation text string for a compound search
                //** format for searching a stored object is fieldName + "<parentField>.<childName>"
            case sel.includes("."):
                let dotNotation = sel.split(".");
                outFilter[field + "." + dotNotation[0]] = dotNotation[1];
                break;

            default:
                outFilter[field] = sel;
        }

        dispatch("filters-changed", outFilter);
    }

     */


    /*
    function emitFilterRD(field, sel) {
        let now = new Date();
        let parts = parseDate(now);
        let dayStart = new Date(parts.year, parts.month, parts.day + 1);

        switch (true) {
            case sel === "_id.days1":
                let dayEnd = new Date(parts.year, parts.month, parts.day + 1, 24);
                outFilter[field] = {$gte: dayStart.toISOString(), $lte: dayEnd.toISOString()};
                break;

            case sel === "_id.days7":
                let weekEnd = new Date(parts.year, parts.month, parts.day + 1 + 7, 24);
                outFilter[field] = {$gte: dayStart.toISOString(), $lte: weekEnd.toISOString()};
                break;

            case sel === "_id.days30":
                let monthEnd = new Date(parts.year, parts.month + 1, parts.day + 1, 24);
                outFilter[field] = {$gte: dayStart.toISOString(), $lte: monthEnd.toISOString()};
                break;

            case sel === "_id.days90":
                let quarterEnd = new Date(parts.year, parts.month + 3, parts.day + 1, 24);
                outFilter[field] = {$gte: dayStart.toISOString(), $lte: quarterEnd.toISOString()};
                break;

            default:
                delete outFilter[field];
                break;
        }

        dispatch("filters-changed", this.outFilter);
    }

     */


    /*
    function emitFilterRange(field, sel) {
        let now = new Date();
        let parts = parseDate(now);
        let dayStart = new Date(parts.year, parts.month, parts.day + 1);

        switch (true) {
            case sel === "_id.days1":
                let dayEnd = new Date(parts.year, parts.month, parts.day + 1, 24);
                outFilter[field] = {$gte: dayEnd.toISOString()};
                break;

            case sel === "_id.days7":
                let weekEnd = new Date(parts.year, parts.month, parts.day + 1 + 7, 24);
                outFilter[field] = {$gte: weekEnd.toISOString()};
                break;

            case sel === "_id.days30":
                let monthEnd = new Date(parts.year, parts.month + 1, parts.day + 1, 24);
                outFilter[field] = {$gte: monthEnd.toISOString()};
                break;

            case sel === "_id.days90":
                let quarterEnd = new Date(parts.year, parts.month + 3, parts.day + 1, 24);
                outFilter[field] = {$gte: quarterEnd.toISOString()};
                break;

            default:
                outFilter[field] = {$gte: dayStart.toISOString()};
                break;
        }

        dispatch("filters-changed", outFilter);
    }

     */


    /*
    function emitFilterDay(field, sel) {
        let val = sel.replace("_id.", "");

        if (sel === "_id.none") {
            delete outFilter[field + "._id"];
        } else {
            outFilter[field + "._id"] = {$in: [val]};
        }

        dispatch("filters-changed", outFilter);
    }


*/


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
    {#each buildSelector as field (field.field) }
        <div class="filter-items">

            <svelte:component
                    this="{filterInserts[field.type]}"
                    {field}
                    on:filter-changed="{filterUpdate}"/>


        <!--
            {:else if selector.type === 'relativeDate'}

                <div class="relativeDate select">
                    <select title="Filter"
                            bind:value="{selector.current}"
                            on:change="{() => emitFilterRD( selector.field, selector.current ) }">

                        {#each selector.filter as filt}
                            <option value="{filt._id}">
                                {filt.name}
                            </option>
                        {/each}
                    </select>
                </div>

            {:else if selector.type === 'inDateRange'}

                <div>
                    <select title="Filter"
                            bind:value="{selector.current}"
                            on:change="{() => emitFilterRange( selector.field, selector.current ) }">

                        {#each selector.filter as filt}
                            <option value="{filt._id}">
                                {filt.name}
                            </option>
                        {/each}

                    </select>
                </div>

            {:else if selector.type === 'byDayOfWeek'}

                <div class="byDayOfWeek select">
                    <select title="Filter"
                            bind:value="{selector.current}"
                            on:change="{() => emitFilterDay( selector.field, selector.current ) }">

                        {#each selector.filter as filt}
                            <option value="{filt._id}">
                                {filt.name}
                            </option>
                        {/each}
                    </select>
                </div>

            {:else}

                <div class="select">
                    <select title="Filter"
                            bind:value="{selector.current}"
                            on:change="{() => emitFilter( selector.field, selector.current ) }">

                        {#each selector.filter as filt}
                            <option value="{filt._id}">
                                {filt.name}
                            </option>
                        {/each}}
                    </select>
                </div>

            {/if}
                            -->

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
