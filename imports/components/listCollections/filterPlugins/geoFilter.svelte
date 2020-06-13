<script>
    /**
     * Geolocation filter plugin for List Holder Filters.
     *
     * @memberof Components:List
     * @function geoFilter
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
    import {userPosition} from '/imports/client/systemStores'

    //* local reactive variable
    let selected;
    let outFilter = {};


    //* event handlers
    function emitFilter(sel) {
        switch (true) {
            case sel === "none" || sel === "all":
                outFilter[field.field] = null;
                break;

            //** build geolocation object
            case field.field === "geoLocation":
                //*** default values if user does not have a position
                let lat = 45;
                let lng = -75;
                let dist = 1000 * 1000;

                //** get user position and set radius
                let me = $userPosition;

                if ( me && me.lat && me.lng ) {
                    lat = me.lat;
                    lng = me.lng;

                    if (sel === "nearby") {
                        dist = 5 * 1000
                    }
                    if (sel === "citywide") {
                        dist = 30 * 1000
                    }
                    if (sel === "inregion") {
                        dist = 250 * 1000
                    }
                }

                outFilter[field.field] = {
                    $nearSphere: {
                        $geometry: {
                            type: "Point",
                            coordinates: [lng, lat]
                        },
                        $maxDistance: dist
                    }
                };
                break;

            default:
                outFilter[field.field] = null;
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
