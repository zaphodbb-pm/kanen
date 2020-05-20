<template>

    <fieldset class="box vue-rows">

        <div class="buffer-y">

            <div class="table-container">
                <table class="table is-narrow is-fullwidth">
                    <thead>
                    <tr>
                        <th></th>
                        <th v-if="params.td0">{{params.td0.label}}</th>
                        <th v-if="params.td1">{{params.td1.label}}</th>
                        <th v-if="params.td2">{{params.td2.label}}</th>
                        <th v-if="params.td3">{{params.td3.label}}</th>
                        <th v-if="params.td4">{{params.td4.label}}</th>
                        <th v-if="params.td5">{{params.td5.label}}</th>
                        <th v-if="params.td6">{{params.td6.label}}</th>
                        <th v-if="params.td7">{{params.td7.label}}</th>
                        <th></th>
                    </tr>
                    </thead>

                    <Container v-on:drop="dropRow" drag-handle-selector=".row-handle" tag="tbody">
                        <Draggable v-for="row in rows" v-bind:key="rowUniq + '_' + row.id" tag="tr">
                            <td>
                                <span class="add-cursor row-handle">
                                    <i class="has-text-primary" v-bind:class="rowDrag"></i>
                                </span>

                                <span class="add-cursor ml-2" v-on:click="updateRow(row.id)">
                                <i class="add-cursor has-text-primary" v-bind:class="rowEdit"></i>
                            </span>
                            </td>

                            <td v-if="params.td0">{{row.td0}}</td>
                            <td v-if="params.td1">{{row.td1}}</td>
                            <td v-if="params.td2">{{row.td2}}</td>
                            <td v-if="params.td3">{{row.td3}}</td>
                            <td v-if="params.td4">{{formatTime(row.td4, "td4")}}</td>
                            <td v-if="params.td5">{{row.td5.name}}</td>
                            <td v-if="params.td6">{{row.td6.name}}</td>
                            <td v-if="params.td7">{{row.td7.name}}</td>

                            <td class="add-cursor" v-on:click="deleteRow(row.id)">
                                <i class="has-text-danger" v-bind:class="rowRemove"></i>
                            </td>

                        </Draggable>

                        <tr style="height: 2rem;"></tr>
                    </Container>

                </table>
            </div>
        </div>


        <div class="buffer has-background-white-ter">
            <div class="columns">
                <div class="column">
                    <div class="columns">

                        <div class="column" v-if="params.td0">
                            <div class="field">
                                <div class="control">
                                    <vue-inputs
                                            v-bind:id="'td0_' + id"
                                            v-bind:attributes="params.td0.attributes"
                                            v-bind:cmpLabel="params.td0.label"
                                            v-model="td0_value"
                                            v-on:on-inputentry="td0_update"
                                            v-bind:aria-describedby="params.td0.helpText">
                                    </vue-inputs>
                                </div>
                            </div>
                        </div>

                        <div class="column" v-if="params.td1">
                            <div class="field">
                                <div class="control">
                                    <vue-inputs
                                            v-bind:id="'td1_' + id"
                                            v-bind:attributes="params.td1.attributes"
                                            v-bind:cmpLabel="params.td1.label"
                                            v-model="td1_value"
                                            v-on:on-inputentry="td1_update"
                                            v-bind:aria-describedby="params.td1.helpText">
                                    </vue-inputs>
                                </div>
                            </div>
                        </div>

                        <div class="column" v-if="params.td2">
                            <div class="field">
                                <div class="control">
                                    <vue-inputs
                                            v-bind:id="'td2_' + id"
                                            v-bind:attributes="params.td2.attributes"
                                            v-bind:cmpLabel="params.td2.label"
                                            v-model="td2_value"
                                            v-on:on-inputentry="td2_update"
                                            v-bind:aria-describedby="params.td2.helpText">
                                    </vue-inputs>
                                </div>
                            </div>
                        </div>

                        <div class="column" v-if="params.td3">
                            <div class="field">
                                <div class="control">
                                    <vue-switch
                                            v-bind:id="'td3' + id"
                                            v-bind:switchLabel="params.td3.label"
                                            v-bind:switchField="id"
                                            v-on:on-switch="td3_update"
                                            v-model="td3_value"
                                            v-bind="params.td3.attributes"
                                            v-bind:aria-describedby="params.td3.helpText">
                                    </vue-switch>
                                </div>
                            </div>
                        </div>

                        <div class="column" v-if="params.td4">
                            <div class="field">
                                <div class="control">

                                    <vue-time-picker v-bind:id="'td4_' + id"
                                                     v-bind:label="params.td4.label"
                                                     v-bind:config="params.td4.config"
                                                     v-model="td4_value"
                                                     v-on:on-input-time="td4_update"
                                                     v-bind:aria-describedby="params.td4.helpText">
                                    </vue-time-picker>

                                </div>
                            </div>
                        </div>

                        <div class="column" v-if="params.td5">
                            <div class="field">
                                <div class="control">
                                    <vue-selects
                                            v-bind:id="'td5_' + id"
                                            v-bind:cmpSelects="params.td5.selects"
                                            v-bind:cmpLabel="params.td5.label"
                                            v-on:on-select="td5_update"
                                            v-model="td5_value"
                                            v-bind="{parms: {}, value: td5_value}"
                                            v-bind:aria-describedby="params.td5.helpText">
                                    </vue-selects>
                                </div>
                            </div>
                        </div>

                        <div class="column" v-if="params.td6">
                            <div class="field">
                                <div class="control">
                                    <vue-selects
                                            v-bind:id="'td6_' + id"
                                            v-bind:cmpSelects="params.td6.selects"
                                            v-bind:cmpLabel="params.td6.label"
                                            v-on:on-select="td6_update"
                                            v-model="td6_value"
                                            v-bind="{parms: {}, value: td6_value}"
                                            v-bind:aria-describedby="params.td6.helpText">
                                    </vue-selects>
                                </div>
                            </div>
                        </div>

                        <div class="column" v-if="params.td7">
                            <div class="field">
                                <div v-if="params.td7.params.type === 'dynamicSelectSearch'"
                                     class="control is-expanded dynamicSelectSearch">
                                    <vue-typeahead-search
                                            v-bind:id="'td7_' + id"
                                            v-bind:source="[]"
                                            v-bind:cmpLabel="params.td7.label"
                                            v-on:on-select="td7_update"
                                            v-model="td7_value"
                                            v-bind="{parms: params.td7.params, value: td7_value}"
                                            v-bind:aria-describedby="params.td7.helpText">
                                    </vue-typeahead-search>
                                </div>

                                <div v-else-if="params.td7.params.type === 'typeaheadDynamicSelect'"
                                     class="control is-expanded dynamicSelect">
                                    <vue-typeahead
                                            v-bind:id="'td7_' + id"
                                            v-bind:source="[]"
                                            v-bind:cmpLabel="params.td7.label"
                                            v-on:on-select="td7_update"
                                            v-model="td7_value"
                                            v-bind="{parms: params.td7.params, value: td7_value}"
                                            v-bind:aria-describedby="params.td7.helpText">
                                    </vue-typeahead>
                                </div>

                                <div v-else class="control is-expanded dynamicSelect">
                                    <vue-selects
                                            v-bind:id="'td7_' + id"
                                            v-bind:cmpSelects="[]"
                                            v-bind:cmpLabel="params.td7.label"
                                            v-on:on-select="td7_update"
                                            v-model="td7_value"
                                            v-bind="{parms: params.td7.params, value: td7_value}"
                                            v-bind:aria-describedby="params.td7.helpText">
                                    </vue-selects>
                                </div>

                            </div>
                        </div>
                    </div>

                </div>

                <div class="column is-1 text-1dot6rem add-cursor" v-show="!editing" v-on:click="addRow">
                    <i class="has-text-primary" v-bind:class="rowAdd"></i>
                </div>

                <div class="column is-1 text-1dot6rem add-cursor" v-show="editing" v-on:click="returnRow">
                    <i class="has-text-primary" v-bind:class="rowDone"></i>
                </div>

            </div>

        </div>

        <label class="has-float-label">{{cmpLabel}}</label>

    </fieldset>

</template>

<script>
    /**
     * @summary Vue fieldset row container for other input types.
     *
     * @memberof Components_Form
     * @function vue-rows
     * @locus Client
     * @isTemplate true
     * @augments vue-formFields
     *
     * @requires {i18n}_from_'/imports/client/functions/func-i18n'
     * @requires {generateId}_from_'/imports/both/functions/func-generateId'
     * @requires VueInputs_from_'../fieldTypes/vue-inputs'
     * @requires VueSelects_from_'../fieldTypes/vue-selects'
     * @requires VueSwitch_from_'../fieldTypes/vue-switch'
     * @requires VueTimePicker_from_'/imports/client/components/vues-widgets/vue-timePicker'
     * @requires VueTypeahead_from_'../fieldTypes/vue-typeahead'
     * @requires VueTypeaheadSearch_from_'../fieldTypes/vue-typeaheadSearch'
     * @requires {Container, Draggable}_from_'vue-smooth-dnd'
     *
     * @return nothing - emits: onFieldset with Object
     *
     * @notes
     *   Field types that can bet set:
     *      td0 = input field - typically text, but can be other types
     *      td1 = input field - typically number, but can be other types
     *      td2 = input field - typically number, but can be other types
     *      td3 = switch
     *      td4 = time select widget - set for 15 minute increments
     *      td5 = static select - requires list of values
     *      td6 = static select - requires list of values
     *      td7 = dynamic select or dynamic typeahead - requires target collection to fetch list items
     *
     *   If a field item is null, then this table cell will not show.
     */


    import {i18n} from '/imports/client/functions/func-i18n'
    import {generateId} from '/imports/both/functions/func-generateId'

    import VueInputs from '../fieldTypes/vue-inputs'
    import VueSelects from '../fieldTypes/vue-selects'
    import VueSwitch from '../fieldTypes/vue-switch'
    import VueTimePicker from '/imports/client/components/vues-widgets/vue-timePicker'
    import VueTypeahead from '../fieldTypes/vue-typeahead'
    import VueTypeaheadSearch from '../fieldTypes/vue-typeaheadSearch'

    import {Container, Draggable} from 'vue-smooth-dnd'

    export default {
        props: {
            id: String,
            value: Array,
            parms: Object,
            attributes: Object,
            cmpLabel: String
        },

        data() {
            const params = i18n(this.parms, "");

            return {
                rows: [],

                rowAdd: kanen.icons.ROW_ADD,
                rowDrag: kanen.icons.DRAG,
                rowRemove: kanen.icons.DELETE,
                rowEdit: kanen.icons.EDIT,
                rowDone: kanen.icons.EDIT_DONE,
                rowUniq: generateId(8),

                rowInEdit: "",
                editing: false,

                params: params,

                td0_value: params && params.td0 && params.td0.defaultValue ? params.td0.defaultValue : "",
                td1_value: params && params.td1 && params.td1.defaultValue ? params.td1.defaultValue : "",
                td2_value: params && params.td2 && params.td2.defaultValue ? params.td2.defaultValue : "",
                td3_value: params && params.td3 && params.td3.defaultValue ? params.td3.defaultValue : false,
                td4_value: params && params.td4 && params.td4.defaultValue ? params.td4.defaultValue : "",
                td5_value: params && params.td5 && params.td5.defaultValue ? params.td5.defaultValue : {_id: "none", name: ""},
                td6_value: params && params.td6 && params.td6.defaultValue ? params.td6.defaultValue : {_id: "none", name: ""},
                td7_value: params && params.td7 && params.td7.defaultValue ? params.td7.defaultValue : {_id: "none", name: ""},
            }
        },

        components: {
            Container,
            Draggable,

            VueSwitch,
            VueTimePicker,
            VueInputs,
            VueSelects,
            VueTypeahead,
            VueTypeaheadSearch,
        },

        watch: {

            value() {
                this.rows = this.value ? this.value : [];
            },
        },

        methods: {

            formatNumber(val, comp) {
                let value = val;
                let attr = this.params[comp] && this.params[comp].attributes ? this.params[comp].attributes : null;

                if (attr && attr.type && (attr.type === "number")) {
                    value = parseFloat(value);

                    if (attr.step && Number.isInteger(attr.step)) {
                        value = Math.round(value);
                    }
                }

                return value;
            },

            formatTime(val, comp){
                //** check for valid time string
                if(typeof val !== 'string' || !val.includes(":")){
                    return "";
                }

                //** convert 24 hour time to 12 hour time plus suffix for displaying only
                let ampm = this.params[comp] && this.params[comp].config && this.params[comp].config.hr12 ? this.params[comp].config.hr12 : false;

                let frag = val.split(":");
                let hr = parseInt( frag[0] );
                let min = parseInt( frag[1] );
                let suffix = ampm ? ( (hr <= 12) ? "am" : "pm" ) : "";

                if (hr > 12 && ampm) {
                    hr = hr - 12;
                }

                if (hr < 10 && !ampm) {
                    hr = "0" + hr.toString();
                }

                //* add leading zero to minutes
                if (min < 10) {
                    min = "0" + min.toString();
                }

                return `${hr}:${min} ${suffix}`
            },

            resetRow() {
                this.editing = false;

                this.td0_value = "";
                this.td1_value = 0;
                this.td2_value = 0;
                this.td3_value = false;
                this.td4_value = "";
                this.td5_value = {_id: "none"};
                this.td6_value = {_id: "none"};
                this.td7_value = {_id: "none"};
            },

            setRow(id) {
                let out = {
                    id: id,
                    td0: this.formatNumber(this.td0_value, "td0"),
                    td1: this.formatNumber(this.td1_value, "td1"),
                    td2: this.formatNumber(this.td2_value, "td2"),
                    td3: this.td3_value,
                    td4: this.td4_value,
                    td5: this.td5_value,
                    td6: this.td6_value,
                    td7: this.td7_value,
                };

                //** build an id from the value of an input field directed by the config file
                if (this.params._id) {
                    out.id = out[this.params._id].replace(/\s+/g, '').toLowerCase();
                }

                return out;
            },

            addRow() {
                let idx = this.rows && this.rows.length ? this.rows.length + 1 : 1;     // default "id" value

                this.rows.push(this.setRow(idx));
                this.emitValues();
                this.resetRow();
            },

            updateRow(msg) {
                this.editing = true;
                let test = this.rows.filter(row => row.id === msg);

                this.td0_value = this.formatNumber(test[0].td0, "td0");
                this.td1_value = this.formatNumber(test[0].td1, "td1");
                this.td2_value = this.formatNumber(test[0].td2, "td2");
                this.td3_value = test[0].td3;
                this.td4_value = test[0].td4;
                this.td5_value = test[0].td5;
                this.td6_value = test[0].td6;
                this.td7_value = test[0].td7;
                this.rowInEdit = test[0].id;
            },

            returnRow() {
                let edit = this.rowInEdit;

                if (edit) {
                    this.rows = this.rows.map(row => {
                        if (row.id === edit) {
                            return this.setRow(edit);

                        } else {
                            return row;
                        }
                    });

                    this.emitValues();
                    this.resetRow();
                }
            },

            deleteRow(rowid) {
                this.rows = this.rows.filter(row => row.id !== rowid);
                this.emitValues();
            },

            dropRow(dropResult) {
                const {removedIndex, addedIndex, payload} = dropResult;

                if (removedIndex !== null || addedIndex !== null) {
                    const result = [...this.rows];
                    let itemToAdd = payload;

                    if (removedIndex !== null) {
                        itemToAdd = result.splice(removedIndex, 1)[0];
                    }

                    if (addedIndex !== null) {
                        result.splice(addedIndex, 0, itemToAdd);
                    }

                    this.rows = result;
                    this.emitValues();
                }
            },

            td0_update(msg) {
                this.td0_value = msg;
            },

            td1_update(msg) {
                this.td1_value = msg;
            },

            td2_update(msg) {
                this.td2_value = msg;
            },

            td3_update(msg) {
                this.td3_value = msg;
            },

            td4_update(msg) {
                this.td4_value = msg;
            },

            td5_update(msg) {
                this.td5_value = msg;
            },

            td6_update(msg) {
                this.td6_value = msg;
            },

            td7_update(msg) {
                this.td7_value = msg;
            },


            emitValues() {
                const self = this;

                let out = this.rows.map(row => {
                    return {
                        id: row.id,
                        td0: self.formatNumber(row.td0, "td0"),
                        td1: self.formatNumber(row.td1, "td1"),
                        td2: self.formatNumber(row.td2, "td2"),
                        td3: row.td3,
                        td4: row.td4,
                        td5: row.td5,
                        td6: row.td6,
                        td7: row.td7
                    }
                });

                this.$emit('on-fieldset', out);
            }
        }
    }
</script>

<style scoped>

    table {
        display: table;
        border-collapse: separate;
    }

    tr {
        display: table-row !important;
    }

    tr[style*="transform"] {
        border-collapse: separate !important;
    }

</style>
