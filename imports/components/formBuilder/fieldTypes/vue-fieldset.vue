<template>

    <fieldset class="box">

        <div class="field" v-if="params.comp0">
            <div class="control">
                <vue-switch
                        v-bind:id="'comp0_' + id"
                        v-bind:switchLabel="params.comp0.label"
                        v-bind:switchField="id"
                        v-on:on-switch="comp0_update"
                        v-model="comp0_value"
                        v-bind="params.comp0.attributes"
                        v-bind:aria-describedby="params.comp0.helpText">
                </vue-switch>
            </div>
        </div>

        <div class="field is-horizontal">
            <div class="field-body">

                <div class="field" v-if="params.comp1">
                    <div class="control">
                        <vue-inputs
                                v-bind:id="'comp1_' + id"
                                v-bind:attributes="params.comp1.attributes"
                                v-bind:cmpLabel="params.comp1.label"
                                v-model="comp1_value"
                                v-on:on-inputentry="comp1_update"
                                v-bind:aria-describedby="params.comp1.helpText">
                        </vue-inputs>
                    </div>
                </div>

                <div class="field" v-if="params.comp2">
                    <div class="control">
                        <vue-select
                                v-bind:id="'comp2_' + id"
                                v-bind:cmpSelects="params.comp2.selects"
                                v-bind:cmpLabel="params.comp2.label"
                                v-on:on-select="comp2_update"
                                v-model="comp2_value"
                                v-bind="{parms: {}, value: comp2_value}"
                                v-bind:aria-describedby="params.comp2.helpText">
                        </vue-select>
                    </div>
                </div>

                <div class="field" v-if="params.comp3">
                    <div class="control">
                        <vue-select
                                v-bind:id="'comp3_' + id"
                                v-bind:cmpSelects="params.comp3.selects"
                                v-bind:cmpLabel="params.comp3.label"
                                v-on:on-select="comp3_update"
                                v-model="comp3_value"
                                v-bind="{parms: {}, value: comp3_value}"
                                v-bind:aria-describedby="params.comp3.helpText">
                        </vue-select>
                    </div>
                </div>
            </div>
        </div>


        <div class="buffer-y">
            <table class="table is-fullwidth">
                <thead>
                <tr>
                    <th></th>
                    <th v-if="params.td0">{{params.td0.label}}</th>
                    <th v-if="params.td1">{{params.td1.label}}</th>
                    <th v-if="params.td2">{{params.td2.label}}</th>
                    <th v-if="params.td3">{{params.td3.label}}</th>
                    <th></th>
                </tr>
                </thead>

                <Container v-on:drop="dropRow" drag-handle-selector=".row-handle" tag="tbody">
                    <Draggable v-for="row in rows" v-bind:key="row.id" tag="tr">

                        <td>
                            <span class="add-cursor row-handle">
                                <i class="has-text-primary" v-bind:class="rowDrag"></i>
                            </span>

                            <span class="add-cursor ml-2" v-on:click="updateRow(row.id)">
                                <i class="add-cursor has-text-primary" v-bind:class="rowEdit"></i>
                            </span>
                        </td>

                        <td v-if="params.td0">{{row.td0}}</td>
                        <td v-if="params.td1">{{row.td1.name}}</td>
                        <td v-if="params.td2">{{row.td2.name}}</td>
                        <td v-if="params.td3">{{row.td3}}</td>

                        <td class="add-cursor" v-on:click="deleteRow(row.id)">
                            <i class="has-text-danger" v-bind:class="rowRemove"></i>
                        </td>

                    </Draggable>

                    <tr style="height: 2rem;"></tr>
                </Container>

            </table>

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
                                    <vue-select
                                            v-bind:id="'td1_' + id"
                                            v-bind:cmpSelects="params.td1.selects.one"
                                            v-bind:cmpLabel="params.td1.label"
                                            v-on:on-select="td1_update"
                                            v-model="td1_value"
                                            v-bind="{parms: {}, value: td1_value}"
                                            v-bind:aria-describedby="params.td1.helpText">
                                    </vue-select>
                                </div>
                            </div>
                        </div>

                        <div class="column is-7" v-if="params.td2">
                            <div class="field">
                                <div v-if="params.td2.params.type === 'dynamicSelectSearch'"
                                     class="control is-expanded dynamicSelectSearch">
                                    <vue-typeahead-search
                                            v-bind:id="'td2_' + id"
                                            v-bind:source="[]"
                                            v-bind:cmpLabel="params.td2.label"
                                            v-on:on-select="td2_update"
                                            v-model="td2_value"
                                            v-bind="{parms: params.td2.params, value: td2_value}"
                                            v-bind:aria-describedby="params.td2.helpText">
                                    </vue-typeahead-search>
                                </div>

                                <div v-else class="control is-expanded dynamicSelect">
                                    <vue-typeahead
                                            v-bind:id="'td2_' + id"
                                            v-bind:source="[]"
                                            v-bind:cmpLabel="params.td2.label"
                                            v-on:on-select="td2_update"
                                            v-model="td2_value"
                                            v-bind="{parms: params.td2.params, value: td2_value}"
                                            v-bind:aria-describedby="params.td2.helpText">
                                    </vue-typeahead>
                                </div>

                            </div>
                        </div>
                    </div>

                    <div class="field" v-if="params.td3">
                        <div class="control">
                            <vue-textarea
                                    v-bind:id="'td3_' + id"
                                    v-bind:attributes="params.td3.attributes"
                                    v-bind:cmpLabel="params.td3.label"
                                    v-model="td3_value"
                                    v-on:on-textentry="td3_update"
                                    v-bind:aria-describedby="params.td3.helpText">
                            </vue-textarea>
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
     * @summary Vue fieldset container for other input types.
     *
     * @memberof Components_Form
     * @function vue-fieldset
     * @locus Client
     * @isTemplate true
     * @augments vue-formFields
     *
     * @return nothing - emits: onFieldset with Object
     *
     */


    import {i18n} from '/imports/client/functions/func-i18n'

    import VueInputs from '../fieldTypes/vue-inputs'
    import VueSelect from '../fieldTypes/vue-selects'
    import VueSwitch from '../fieldTypes/vue-switch'
    import VueTextarea from '../fieldTypes/vue-textarea'
    import VueTypeahead from '../fieldTypes/vue-typeahead'
    import VueTypeaheadSearch from '../fieldTypes/vue-typeaheadSearch'

    import {Container, Draggable} from 'vue-smooth-dnd'

    export default {
        props: {
            id: String,
            value: [Object, String],
            parms: Object,
            attributes: Object,
            cmpLabel: String
        },

        data() {
            return {
                rows: [],

                rowAdd: kanen.icons.ROW_ADD,
                rowDrag: kanen.icons.DRAG,
                rowRemove: kanen.icons.DELETE,
                rowEdit: kanen.icons.EDIT,
                rowDone: kanen.icons.EDIT_DONE,

                rowInEdit: "",
                editing: false,

                params: i18n(this.parms, ""),

                comp0_value: false,
                comp1_value: "",
                comp2_value: {_id: "none"},
                comp3_value: {_id: "none"},

                td0_value: 0,
                td1_value: {_id: "none"},
                td2_value: {_id: "none"},
                td3_value: "",
            }
        },

        components: {
            Container,
            Draggable,

            VueSwitch,
            VueInputs,
            VueSelect,
            VueTypeahead,
            VueTypeaheadSearch,
            VueTextarea
        },

        watch: {

            value() {
                this.comp0_value = this.value.comp0;
                this.comp1_value = this.value.comp1;
                this.comp2_value = this.value.comp2;
                this.comp3_value = this.value.comp3;
                this.rows = this.value && this.value.rows ? this.value.rows : [];
            },
        },

        methods: {

            addRow() {

                let idx = this.rows && this.rows.length ? this.rows.length + 1 : 1;
                let addItem = {
                    id: "row" + idx,
                    td0: this.td0_value,
                    td1: this.td1_value,
                    td2: this.td2_value,
                    td3: this.td3_value,
                };

                this.rows.push(addItem);
                this.emitValues();

                this.td0_value = 0;
                this.td1_value = {_id: "none"};
                this.td2_value = {_id: "none"};
                this.td3_value = "";
            },

            updateRow(msg) {
                this.editing = true;
                let test = this.rows.filter(row => row.id === msg);

                this.td0_value = test[0].td0;
                this.td1_value = test[0].td1;
                this.td2_value = test[0].td2;
                this.td3_value = test[0].td3;
                this.rowInEdit = test[0].id;
            },

            returnRow(msg) {
                let edit = this.rowInEdit;

                if (edit) {
                    let addItem = {
                        id: edit,
                        td0: this.td0_value,
                        td1: this.td1_value,
                        td2: this.td2_value,
                        td3: this.td3_value,
                    };

                    this.rows = this.rows.map(row => {
                        if (row.id === edit) {
                            return addItem;
                        } else {
                            return row;
                        }
                    });

                    this.emitValues();

                    this.editing = false;
                    this.td0_value = 0;
                    this.td1_value = {_id: "none"};
                    this.td2_value = {_id: "none"};
                    this.td3_value = "";
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

            comp0_update(msg) {
                this.comp0_value = msg;
                this.emitValues();
            },

            comp1_update(msg) {
                this.comp1_value = msg;
                this.emitValues();
            },

            comp2_update(msg) {
                this.comp2_value = msg;
                this.emitValues();
            },

            comp3_update(msg) {
                this.comp3_value = msg;
                this.emitValues();
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

            emitValues() {
                this.$emit('on-fieldset',
                    {
                        comp0: this.comp0_value,
                        comp1: this.comp1_value,
                        comp2: this.comp2_value,
                        comp3: this.comp3_value,
                        rows: this.rows,
                    });
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