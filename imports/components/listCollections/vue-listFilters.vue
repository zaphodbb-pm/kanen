<template>

    <div class="list-filters filter-selects">
        <div class="filter-items" v-for="selector in buildSelector" v-bind:key="selector.field">

            <div v-if="selector.type === 'date'" class="date">
                <div class="field has-addons">
                    <div class="control control-flatpickr" style="width: 14rem">
                        <vue-flat-pickr class="input"
                                        v-model="dateValue"
                                        v-bind:config="params"
                                        v-bind:placeholder="label"
                                        v-on:on-change="dateUpdate($event, selector.field)"

                                        v-bind:aria-describedby="helpText">
                        </vue-flat-pickr>
                    </div>

                    <div class="control" v-if="hasRange">
                        <a class="button is-warning" v-on:click="clearDateRange(selector.field)">
                            <div class="delete"></div>
                        </a>
                    </div>
                </div>
            </div>

            <div v-else-if="selector.type === 'relativeDate'" class="relativeDate select">
                <select title="Filter"
                        v-model="selector.current"
                        v-on:change="emitFilterRD( selector.field, selector.current )">

                    <option v-for="filt in selector.filter"
                            v-bind:value="filt._id"
                            v-bind:key="filt._id">

                        {{filt.name}}
                    </option>
                </select>
            </div>

            <div v-else-if="selector.type === 'inDateRange'" class="inDateRange select">
                <select title="Filter"
                        v-model="selector.current"
                        v-on:change="emitFilterRange( selector.field, selector.current )">

                    <option v-for="filt in selector.filter"
                            v-bind:value="filt._id"
                            v-bind:key="filt._id">

                        {{filt.name}}
                    </option>
                </select>
            </div>

            <div v-else-if="selector.type === 'byDayOfWeek'" class="byDayOfWeek select">
                <select title="Filter"
                        v-model="selector.current"
                        v-on:change="emitFilterDay( selector.field, selector.current )">

                    <option v-for="filt in selector.filter"
                            v-bind:value="filt._id"
                            v-bind:key="filt._id">

                        {{filt.name}}
                    </option>
                </select>
            </div>

            <div v-else class="select">
                <select title="Filter"
                        v-model="selector.current"
                        v-on:change="emitFilter( selector.field, selector.current )">

                    <option v-for="filt in selector.filter"
                            v-bind:value="filt._id"
                            v-bind:key="filt._id">

                        {{filt.name}}
                    </option>
                </select>
            </div>

        </div>
    </div>

</template>


<script>
    /**
     * @summary Builds row selector and documents count.
     *
     * @memberof Components_List
     * @function vue-listFilters
     * @locus Client
     * @isTemplate true
     *
     * @requires {parseDate}_from_'/imports/client/functions/func-parseDate'
     * @requires VueFlatPickr_from_'vue-flatpickr-component'
     *
     * @param  {Array} filters - array of filter objects
     *
     * @returns {Object} - emits 'filters-changed' - a valid MongoDb selector object
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

    import {parseDate} from '/imports/client/functions/func-parseDate'
    import VueFlatPickr from 'vue-flatpickr-component'

    export default {

        props: {
            filters: Array
        },

        data() {
            return {
                buildSelector: [],
                outFilter: {},

                dateValue: "",
                label: "Date Range",
                helpText: "date range help.",
                params: {dateFormat: "d-m-Y", mode: "range"},
                hasRange: false
            }
        },

        components: {
            VueFlatPickr
        },

        watch: {
            filters() {
                this.buildSelector = this.buildSelection(this.filters);
            }
        },

        mounted() {
            this.buildSelector = this.buildSelection(this.filters);
        },

        methods: {

            buildSelection(filters) {
                //* add a current value field for selections to track user selections; default value is none
                return filters.map((filt) => {
                    let temp = filt;
                    temp.current = "_id.none";
                    return temp;
                });
            },

            dateUpdate(ev, field) {
                if (Array.isArray(ev) && ev.length === 2) {
                    let start = new Date(ev[0]);
                    let end = new Date(ev[1]);

                    this.outFilter[field] = {$gte: start.toISOString(), $lte: end.toISOString()};
                    this.hasRange = true;

                    this.$emit("filters-changed", this.outFilter);
                }
            },

            clearDateRange(field) {
                this.dateValue = "";
                delete this.outFilter[field];
                this.hasRange = false;
                this.$emit("filters-changed", this.outFilter);
            },

            emitFilter(field, sel) {
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

                        this.outFilter[field] = {
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
                        delete this.outFilter[field];
                        break;

                    case sel === "_id.none":
                        let frag = sel.split(".");
                        delete this.outFilter[field + "." + frag[0]];
                        break;

                    //** use dot notation text string for a compound search
                    //** format for searching a stored object is fieldName + "<parentField>.<childName>"
                    case sel.includes("."):
                        let dotNotation = sel.split(".");
                        this.outFilter[field + "." + dotNotation[0]] = dotNotation[1];
                        break;

                    default:
                        this.outFilter[field] = sel;
                }

                this.$emit("filters-changed", this.outFilter);
            },

            emitFilterRD(field, sel) {
                let now = new Date();
                let parts = parseDate(now);
                let dayStart = new Date(parts.year, parts.month, parts.day + 1);

                switch (true) {
                    case sel === "_id.days1":
                        let dayEnd = new Date(parts.year, parts.month, parts.day + 1, 24);
                        this.outFilter[field] = {$gte: dayStart.toISOString(), $lte: dayEnd.toISOString()};
                        break;

                    case sel === "_id.days7":
                        let weekEnd = new Date(parts.year, parts.month, parts.day + 1 + 7, 24);
                        this.outFilter[field] = {$gte: dayStart.toISOString(), $lte: weekEnd.toISOString()};
                        break;

                    case sel === "_id.days30":
                        let monthEnd = new Date(parts.year, parts.month + 1, parts.day + 1, 24);
                        this.outFilter[field] = {$gte: dayStart.toISOString(), $lte: monthEnd.toISOString()};
                        break;

                    case sel === "_id.days90":
                        let quarterEnd = new Date(parts.year, parts.month + 3, parts.day + 1, 24);
                        this.outFilter[field] = {$gte: dayStart.toISOString(), $lte: quarterEnd.toISOString()};
                        break;

                    default:
                        delete this.outFilter[field];
                        break;
                }

                this.$emit("filters-changed", this.outFilter);
            },

            emitFilterRange(field, sel) {
                let now = new Date();
                let parts = parseDate(now);
                let dayStart = new Date(parts.year, parts.month, parts.day + 1);

                switch (true) {
                    case sel === "_id.days1":
                        let dayEnd = new Date(parts.year, parts.month, parts.day + 1, 24);
                        this.outFilter[field] = {$gte: dayEnd.toISOString()};
                        break;

                    case sel === "_id.days7":
                        let weekEnd = new Date(parts.year, parts.month, parts.day + 1 + 7, 24);
                        this.outFilter[field] = {$gte: weekEnd.toISOString()};
                        break;

                    case sel === "_id.days30":
                        let monthEnd = new Date(parts.year, parts.month + 1, parts.day + 1, 24);
                        this.outFilter[field] = {$gte: monthEnd.toISOString()};
                        break;

                    case sel === "_id.days90":
                        let quarterEnd = new Date(parts.year, parts.month + 3, parts.day + 1, 24);
                        this.outFilter[field] = {$gte: quarterEnd.toISOString()};
                        break;

                    default:
                        this.outFilter[field] = {$gte: dayStart.toISOString()};
                        break;
                }

                this.$emit("filters-changed", this.outFilter);
            },

            emitFilterDay(field, sel) {
                let val = sel.replace("_id.", "");

                if (sel === "_id.none") {
                    delete this.outFilter[field + "._id"];
                } else {
                    this.outFilter[field + "._id"] = {$in: [val]};
                }

                this.$emit("filters-changed", this.outFilter);
            }
        }
    }
</script>

<style scoped>

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
