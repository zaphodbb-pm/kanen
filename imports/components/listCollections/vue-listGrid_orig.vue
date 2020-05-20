<template>
    <div>

        default grid

        <div class="columns is-multiline">
            <div class="column is-6 is-4-desktop is-3-widescreen" v-for="row in tableItems" v-bind:key="row[0].id">

                <div class="card">
                    <div class="card-content">

                        <template v-for="(cell, idx) in row">

                            <div v-if="cell.type === 'pict' " class="card-image" style="margin: -1.5rem -1.5rem 1.5rem -1.5rem">
                                <figure class="image is-2by1">
                                    <img v-bind:src="cell.url"  alt="image">
                                </figure>
                            </div>

                            <div v-if="cell.type === 'edit' " v-on:click="editDoc(cell.id)"
                                 style="word-wrap: break-word; word-break: break-all;"
                                 class="add-cursor has-text-info has-text-weight-semibold text-left">

                                {{cell.value}}
                            </div>

                            <div v-else-if="cell.type === 'newpage' " v-on:click="launchPage(cell.id)"
                                 style="word-wrap: break-word; word-break: break-all;"
                                 class="add-cursor has-text-info has-text-weight-semibold text-left">

                                {{cell.value}}
                            </div>

                            <div v-else-if="cell.type === 'text' " class="has-text-left">
                                <strong>{{tableLabels[idx].label}}:</strong> {{cell.value}}
                            </div>

                            <div v-else-if="cell.type === 'object' ">
                                {{cell.value}}
                            </div>

                            <div v-else-if="cell.type === 'boolean' " class="text-green text-center">
                                <span v-if="cell.value === 'true' ">&#10004;</span>
                            </div>

                            <div v-else-if="cell.type === 'del' " v-on:click="deleteDoc(cell.value)"
                                 class="add-cursor has-text-centered" style="max-width: 10%;">

                                <span><i v-bind:class="DELETE"></i></span>
                            </div>

                        </template>

                    </div>

                </div>

            </div>
        </div>


    </div>
</template>


<script>
    /**
     * @summary Grid to list documents and fields for docs.
     *
     * @memberof Components_List
     * @function vue-listGrid
     * @locus Client
     * @isTemplate true
     *
     * @requires {dotNotation}_from_'/imports/client/functions/func-dotNotation'
     * @requires {timeAgo}_from_'/imports/client/functions/func-timeAgo'
     *
     * @param  {Object} config - decoration for table
     * @param  {Array}  labels
     * @param  {Array}  documents
     * @param  {String} collection
     * @param  {Boolean} submitted
     *
     * @returns nothing
     *
     */

    import {dotNotation} from '/imports/client/functions/func-dotNotation'
    import {timeAgo} from '/imports/both/functions/func-timeAgo'

    export default {

        props: {
            config: Object,
            labels: Array,
            documents: Array,
            collection: String,
            submitted: Boolean
        },

        data() {
            return {
                DELETE: kanen.icons.DELETE,                     // standard trash can delete icon
                VIEW: kanen.icons.VIEW,                         // icon holds link to another page
                EDIT_COLOR: "#fcf8e3",                          // set color when item is in edit mode

                TAGS: {                                         // sets background label colour for "tag" cell
                    Image: "label-success",
                    Trigger: "label-info",
                    Message: "label-primary",
                    Logs: "label-warning",
                    System: "label-danger",
                    Default: "label-default",
                },


                inEdit: false,
                bgEdit: "",
                currRow: "",
                actRow: "",
                submit: this.submitted,

                width: this.config && this.config.dispWidth ? this.config.dispWidth : "is-6"
            }
        },

        methods: {

            deleteDoc(id) {
                this.$emit('item-delete', {
                    id: id,
                });
            },

            editDoc(id) {
                let same = (id === this.actRow);
                this.actRow = same ? this.actRow : id;
                this.inEdit = !this.inEdit;

                if (same) {
                    this.currRow = this.inEdit ? id : "";
                } else {
                    this.currRow = id;
                    this.inEdit = true;
                }

                this.$emit('item-edit', {
                    id: this.currRow,
                    edit: this.inEdit
                });
            },

            launchPage(id) {
                console.log("launchPage", id, this.config.target, window.location);

                let page = window.location.origin + "/" + this.config.target + "?q=" + id;

                window.open(page);
            }
        },

        watch: {
            submitted() {
                if (this.submitted) {
                    this.currRow = "";
                    this.actRow = "";
                    this.inEdit = false;
                    this.submit = false;
                }
            },

            documents() {
                console.log("documents", this.documents);

            }
        },

        computed: {

            //* inserts table (th) header labels
            tableLabels() {
                let start = this.labels;
                let labels = [];

                start.forEach(function (el) {
                    if (el.label) {
                        let css = el.type && el.type === "del" ? "has-text-centered" : "";
                        labels.push({label: el.label, css: css});
                    }
                });

                return labels;
            },

            //* build array of array of display objects
            tableItems() {
                let out = [];
                let docs = this.documents;
                let fields = this.labels;

                //** prepare document for display listing and get info for each field to display
                docs.forEach(function (els) {
                    let tr = [];
                    let values = els;
                    values.updatedAt = els.updatedAt;

                    fields.forEach(function (el) {
                        let val = dotNotation(values, el.key);

                        //*** "users" is a special case
                        if (this.collection === "users") {
                            if (el.key === "emails") {
                                val = val && val[0] ? val[0].address : "ex@example.com";
                            }
                        }

                        //*** convert timestamps to relative time string
                        if (el.key === "updatedAt") {
                            val = timeAgo(val);
                        }
                        if (el.key === "createdAt") {
                            val = timeAgo(val);
                        }
                        if (el.key === "data.time") {
                            val = timeAgo(val);
                        }
                        if (el.key === "timeStamp") {
                            val = timeAgo(val);
                        }
                        if (el.key === "tag") {
                            val = values.data && values.data.event ? values.data.event : val;
                        }
                        if (el.type === "object") {
                            val = JSON.stringify(val).replace(/,/g, ", ");
                        }

                        let base = el.base ? el.base : "";

                        tr.push({
                            id: values._id,
                            type: el.type,
                            value: val,
                            base: base,
                            url: base + val
                        });
                    });

                    out.push(tr);
                });

                return out;
            },
        }
    }
</script>