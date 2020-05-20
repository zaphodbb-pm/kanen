<template>

    <div class="select">
        <select v-bind:class=" {'has-status-icon': showColours} "
                v-bind="attributes"
                v-model="selValue._id"
                v-on:change="emitSelect(selValue._id)">

            <option disabled value="">{{cmpLabel}}</option>
            <option v-for="optSelect in source"
                    v-bind:value="optSelect._id"
                    v-bind:key="optSelect._id">

                {{optSelect.name}}
            </option>
        </select>

        <div v-if="showColours" class="is-status-icon" v-bind:style="{ color: activeColour }">
            <i class="fas fa-circle"></i>
        </div>
        <label class="has-float-label" for>{{cmpLabel}}</label>
    </div>

</template>

<script>
    /**
     * @summary Vue static and dynamic select field.
     *
     * @memberof Components_Form
     * @function vue-selects
     * @locus Client
     * @isTemplate true
     * @augments vue-formFields
     *
     * @requires {graphGetDocs}_from_'/imports/client/functions/func-graphGetDocs'
     *
     * @param {String} selLabel - component main label,
     * @param {Object} attributes - html type settings
     * @param {String} ph - placeholder
     * @param {Object} value - selection value
     * @param {Object} parms - component parameters
     *
     * @emits onSelect with {id , name}
     *
     * @notes
     *  params- {type, coll, field, filter} object provides behaviour information:
     *      params: {type: "staticSelect"} - uses array of objects from the associated text file
     *
     *      params: {type: "dynamicSelect", coll: "companies", query: {}, filter: {fields: {name: 1}, sort: {name: 1}} }
     *          - retrieves all "companies" name field as an array for the select operation
     *
     *      params: {type: "dynamicSelectArray", coll: "companies", query: {}, field: "departments, filter: {fields: {departments: 1}} }
     *          - finds one document from "companies" and extracts the field and builds an array for the select operation
     *          - note that the retrieval will automatically query with {tenantId: user.tenantId}
     *
     *      params: {type: "dynamicSelectRow", coll: "companies", query: {}, field: "locations, filter: {fields: {locations: 1}} }
     *          - finds one document from "companies" and extracts the field row and builds an array for the select operation
     *          - note that the retrieval will automatically query with {tenantId: user.tenantId}
     *
     */

    import {graphGetDocs} from '/imports/client/functions/func-graphGetDocs'

    export default {
        props: {
            ph: String,
            parms: Object,
            value: Object,
            attributes: Object,
            cmpLabel: String,

            cmpSelects: {
                type: Array,
                default: () => {
                    return []
                },
                required: true
            },

            status: kanen.icons.STATUS
        },

        data() {
            return {
                selValue: this.value,
                source: this.setSelects(),
                showColours: !!(this.parms && this.parms.colours),
                activeColour: "#dbdbdb"
            }
        },

        watch: {
            value() {
                this.selValue = this.value;
                this.activeColour = this.value && this.value.colour ? this.value.colour : "#dbdbdb";
            }
        },

        methods: {
            emitSelect(selId) {
                let item = _.findWhere(this.source, {_id: selId});
                let colour = item.colour ? item.colour : null;

                //** adjust object to be saved if colour field exists
                if (colour) {
                    this.$emit('on-select', {_id: item._id, name: item.name, colour: colour});
                } else {
                    this.$emit('on-select', {_id: item._id, name: item.name});
                }

                this.activeColour = item.colour;
            },

            setSelects() {
                let type = this.parms && this.parms.type ? this.parms.type : false;
                let filter = this.parms && this.parms.filter ? this.parms.filter : {};
                let query = this.parms && this.parms.query ? this.parms.query : {};

                switch (true) {
                    //** a database dip has a long latency; use promises / await to synchronize updates
                    //** async functions in Vue do NOT play happily with normal code
                    case (type && type === "dynamicSelect"):
                        this.getSelects(this.parms.coll, query, filter);
                        break;

                    case (type && type === "dynamicSelectArray"):
                        this.getSelectsField(this.parms.coll, query, filter, "array");
                        break;

                    case (type && type === "dynamicSelectRow"):
                        this.getSelectsField(this.parms.coll, query, filter, "row");
                        break;

                    default:
                        return this.cmpSelects ? this.cmpSelects : [];
                }
            },

            async getSelects(coll, query, filter) {
                this.source = await graphGetDocs(coll, "select", query, filter, null);

                if (this.source) {
                    this.source = this.source.map(function (s) {
                        if (coll === "users" || coll === "employees") {
                            return {_id: s._id, name: s.username};
                        } else {
                            return {_id: s._id, name: s.name};
                        }
                    });

                    let prepend = this.parms && this.parms.prepend ? this.parms.prepend : null;
                    if(prepend){
                        this.source.unshift(prepend)
                    }
                }
            },

            async getSelectsField(coll, query, filter, type) {
                let field = this.parms && this.parms.field ? this.parms.field : null;
                let source = await graphGetDocs(coll, "oneAllFields", query, filter, null);

                if (field) {
                    if (type && type === "array") {
                        this.source = source[field];
                    }

                    if (type && type === "row") {
                        this.source = source[field].map((r) => {
                            return {_id: r.id, name: r.td0}
                        });
                    }
                }
            }
        }
    }

</script>

<style scoped>

    .has-status-icon {
        padding-left: 2.25em;
    }

    .is-status-icon {
        display: inline-flex;
        justify-content: center;
        align-items: center;
        z-index: 4;

        height: 2.25em;
        pointer-events: none;
        position: absolute;
        top: 0;
        left: 0;
        width: 2.25em;
    }

</style>
