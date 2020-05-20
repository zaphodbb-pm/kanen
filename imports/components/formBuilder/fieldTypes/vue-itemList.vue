<template>

    <fieldset class="box">

        <div class="text-1dot6rem add-cursor" v-on:click="addRow">
            <i class="has-text-primary" v-bind:class="rowAdd"></i>
        </div>

        <table class="table is-fullwidth">

            <Container v-on:drop="dropRow" tag="tbody" drag-handle-selector=".row-handle">
                <Draggable v-for="(row, idx) in rows" v-bind:key="row.id" tag="tr">

                    <td class="min-width">
                        <span class="add-cursor row-handle">
                            <i class="has-text-primary" v-bind:class="rowDrag"></i>
                        </span>
                    </td>

                    <td class="min-width">{{idx + 1}}</td>

                    <td class="min-width">
                        <div class="field" v-if="showCheck">
                            <input type="checkbox"
                                   class="is-checkradio is-primary has-background-color"
                                   title=""
                                   v-bind:id="'checkbox_' + uniqueId + '_' + idx"
                                   v-model="row.check"
                                   v-on:change.stop="updateRow(row)">

                            <label v-bind:for="'checkbox_' + uniqueId + '_' + idx"></label>
                        </div>
                    </td>

                    <td>
                        <textarea
                                class="textarea"
                                v-bind="attributes"
                                v-model="row.text"
                                v-on:keyup="updateRow(row)">

                        </textarea>
                    </td>

                    <td class="add-cursor min-width" v-on:click="deleteRow(row.id)">
                        <i class="has-text-danger" v-bind:class="rowRemove"></i>
                    </td>

                </Draggable>
            </Container>

        </table>

        <label class="has-float-label">{{cmpLabel}}</label>

    </fieldset>

</template>


<script>
    /**
     * @summary Vue Item List container for other input types.
     *
     * @memberof Components_Form
     * @function vue-itemList
     * @locus Client
     * @isTemplate true
     * @augments vue-formFields
     *
     * @requires {Container,Draggable}_from_"vue-smooth-dnd"
     *
     * @return nothing - emits: on-itemList with Object
     *
     */


    import {Container, Draggable} from "vue-smooth-dnd"

    export default {
        props: {
            id: String,
            label: String,
            label_switch: String,
            value: Array,
            parms: Object,
            attributes: Object,
            cmpLabel: String
        },

        data() {
            return {
                showCheck: !!( this.parms && this.parms.showCheck ),

                rows: [],
                rowAdd: kanen.icons.ROW_ADD,
                rowDrag: kanen.icons.DRAG,
                rowRemove: kanen.icons.DELETE,

                uniqueId: Math.random()
            }
        },

        components: {
            Container,
            Draggable,
        },

        watch: {
            value() {
                if( !_.isEmpty(this.value) ){
                    this.rows = this.value;
                }
            },
        },

        methods: {

            addRow() {
                let addItem = {
                    id: "row" + (this.rows.length + 1),
                    check: "",
                    text: "",
                };

                this.rows.push(addItem);
                this.$emit('on-itemlist', this.rows);
            },

            updateRow(row){
                this.rows = this.rows.map( (r) => r.id === row.id ? row : r);
                this.$emit('on-itemlist', this.rows);
            },

            deleteRow(rowid) {
                this.rows = this.rows.filter(row => row.id !== rowid);
                this.$emit('on-itemlist', this.rows);
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
                    this.$emit('on-itemlist', this.rows);
                }
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

    .min-width {
        width: 1%;
        white-space: nowrap;
    }

</style>
