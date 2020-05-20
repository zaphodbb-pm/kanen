<template>

    <fieldset class="box">

        <div class="table-container">
            <table class="table is-fullwidth">
                <tbody>
                <tr v-for="(row, idx) in rows" v-bind:key="'row' + idx">

                    <td>{{row}}</td>

                    <td class="add-cursor min-width" v-on:click="deleteRow(row.id, row.timeStamp, idx)">
                        <i class="has-text-danger" v-bind:class="rowRemove"></i>
                    </td>

                </tr>
                </tbody>
            </table>
        </div>

        <label class="has-float-label">{{cmpLabel}}</label>

    </fieldset>

</template>


<script>
    /**
     * @summary Vue Array List container for array of items.
     *
     * @memberof Components_Form
     * @function vue-arrayList
     * @locus Client
     * @isTemplate true
     * @augments vue-formFields
     *
     * @return nothing - emits: onArrayList with Object
     *
     */

    export default {
        props: {
            id: String,
            label: String,
            value: Array,
            parms: Object,
            attributes: Object,
            cmpLabel: String
        },

        data() {
            return {
                rows: this.value,
                rowRemove: kanen.icons.DELETE,

                list_value: "",
                rowInEdit: "",
                editing: false
            }
        },

        watch: {

            value() {
                this.rows = this.value;
            },
        },

        methods: {

            deleteRow(rowid, ts, idx) {
                if(rowid){
                    this.rows = this.rows.filter(row => row.id !== rowid);
                }else{
                    if(ts){
                        this.rows = this.rows.filter(row => row.timeStamp !== ts);
                    }else{
                        this.rows.splice(idx, 1);
                    }
                }

                this.$emit('on-arraylist', this.rows);
            },
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
