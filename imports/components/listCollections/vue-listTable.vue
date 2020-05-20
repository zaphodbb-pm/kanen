<template>
    <div class="table-container">

        <table class="table is-striped is-narrow is-hoverable is-fullwidth mt-3">
            <thead>
            <tr class="">
                <th v-for="tl in tableLabels" v-bind:class="tl.css">{{tl.label}}</th>
            </tr>
            </thead>

            <tbody>
            <tr v-for="(row, idx) in tableItems"
                v-bind:key="row[0] && row[0].id ? row[0].id : idx"
                v-bind:style="{backgroundColor: row[0] && row[0].id && (currRow === row[0].id) ? EDIT_COLOR : ''}">

                <template v-for="cell in row">

                    <td v-if="cell.type === 'check' ">
                        <input type="checkbox" class="checkbox" title="cell.value">
                    </td>

                    <td v-else-if="cell.type === 'tag' ">
                        <span class="buffer-small">
                            <span class="tag is-medium"  v-bind:class="TAGS[cell.value]"><b>{{cell.value}}</b></span>
                        </span>
                    </td>

                    <td v-else-if="cell.type === 'id' " v-bind:data-id="cell.value"></td>

                    <td v-else-if="cell.type === 'link' " class="add-cursor">
                        <a v-bind:href="cell.url" target="_blank">
                            <span class=""><i v-bind:class="VIEW"></i></span>
                        </a>
                    </td>

                    <td v-else-if="cell.type === 'edit' " v-on:click="editDoc(cell.id)"
                        style="word-wrap: break-word; word-break: break-all;"
                        class="add-cursor has-text-link has-text-weight-semibold text-left">

                        {{cell.value}}
                    </td>

                    <td v-else-if="cell.type === 'modal' " v-on:click="modalDoc(cell.id)"
                        style="word-wrap: break-word; word-break: break-all;"
                        class="add-cursor has-text-link has-text-weight-semibold text-left">

                        {{cell.value}}
                    </td>

                    <td v-else-if="cell.type === 'modalUser' " v-on:click="modalUserDoc(cell.id)"
                        style="word-wrap: break-word; word-break: break-all;"
                        class="add-cursor has-text-link has-text-weight-semibold text-left">

                        {{cell.value}}
                    </td>

                    <td v-else-if="cell.type === 'text' " class="has-text-left">
                        {{cell.prefix}}{{cell.value}}{{cell.suffix}}
                    </td>

                    <td v-else-if="cell.type === 'currency' " class="has-text-right">
                        {{cell.prefix}}{{cell.value.toFixed(2)}}{{cell.suffix}}
                    </td>

                    <td v-else-if="cell.type === 'date' " class="has-text-left list-date">
                        {{formatDate(cell.value)}}
                    </td>

                    <td v-else-if="cell.type === 'phone' " class="has-text-left list-date">
                        <a v-bind:href="'tel:' + cell.value">{{formatPhoneNumber(cell.value)}}</a>
                    </td>

                    <td v-else-if="cell.type === 'email' " class="has-text-left list-date">
                        <a v-bind:href="'mailTo:' + cell.value">{{cell.value}}</a>
                    </td>

                    <td v-else-if="cell.type === 'status' " class="has-text-left list-status"
                        style="">
                        <span v-bind:style="{color: cell.value && cell.value.colour ? cell.value.colour : ''}">
                            <i class="fas fa-circle"></i>
                        </span>
                        {{cell.value && cell.value.name ? cell.value.name : '' }}
                    </td>

                    <td v-else-if="cell.type === 'newpage' " v-on:click="launchPage(cell.id)"
                        style="word-wrap: break-word; word-break: break-all;"
                        class="add-cursor has-text-info has-text-weight-semibold text-left">

                        {{cell.value}}
                    </td>

                    <td v-else-if="cell.type === 'object' ">
                        {{cell.value}}
                    </td>

                    <td v-else-if="cell.type === 'boolean' " class="has-text-success text-center text-1dot4rem"
                        style="padding-bottom: 0; padding-top: 0">
                        <span v-if="cell.value">&#9679;</span>
                    </td>

                    <td v-else-if="cell.type === 'pict' " class="pict pictSmall">
                        <div v-if="cell.value && cell.value.src">
                            <img v-bind:src="cell.value && cell.value.src ? cell.value.src : ''" class="list-thumbnail"
                                 alt="thumbnail"/>
                        </div>

                        <div v-else class="alt-pict">
                            <div class="alt-pict-text">{{cell.name}}</div>
                        </div>
                    </td>

                    <td v-else-if="cell.type === 'del' " v-on:click="deleteDoc(cell.value)"
                        class="add-cursor has-text-centered" style="max-width: 10%;">

                        <span><i v-bind:class="DELETE"></i></span>
                    </td>

                </template>

            </tr>
            </tbody>
        </table>

    </div>
</template>


<script>
    /**
     * @summary Table to list documents and fields for docs.
     *
     * @memberof Components_List
     * @function vue-listTable
     * @locus Client
     * @isTemplate true
     *
     * @requires {i18nf}_from_'/imports/client/functions/func-i18nf'
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
     * @notes
     *      Column types:
     *              "check" - checkbox
     *              "tag" - coloured box with label
     *              "id" - has document id
     *              "link" - active url to new page
     *              "edit" - sends doc info to be edited
     *              "modal" - sends doc info to modal for detailed display
     *              "modalUser" - sends doc info to then fetch user info
     *              "text" - plain text display
     *              "date" - formatted date display text
     *              "phone" - formatted phone number with link to phone application
     *              "email" - formatted email with link to email application
     *              "status" - dot and text status display
     *              "newpage" - launch new page in new tab
     *              "object" - stringified display of object
     *              "boolean" - check character if true
     *              "pict" - thumbnail picture
     *              "del" - trash can and docid of document to delete
     *
     */

    import {i18nf} from '/imports/client/functions/func-i18nf'
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
                EDIT_COLOR: kanen.constants.EDIT_COLOR,         // set color when item is in edit mode

                tagColour: "is-info",                           // default tag colour

                TAGS: {
                    // sets background label colour for "tag" cell
                    login: "is-info",
                    logout: "is-warning",
                    system: "is-danger",
                    startup: "is-danger",
                    default: "is-info",
                },

                inEdit: false,
                bgEdit: "",
                currRow: "",
                actRow: "",
                submit: this.submitted
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

            formatDate(isoDate) {
                let date = new Date();
                if (isoDate) {
                    date = new Date(isoDate);
                }

                //** get common calendar text and adjust for language preference
                let cal = i18nf("common.calendar");
                return `${cal.months[date.getMonth()].name} ${date.getDate()}, ${date.getFullYear()}`;
            },

            formatPhoneNumber(str) {
                let cleaned = ('' + str).replace(/\D/g, '');                // Filter only numbers from the input
                let match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);  // Check if the input is of correct
                let out = "";

                if (match) {
                    let intlCode = (match[1] ? '+1 ' : '');                  //Remove matched extension code and change to format for any country code.
                    out = [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('');
                }

                return out;
            },

            createInitials(name) {
                let parts = name.trim().split(" ");
                let part1a = parts[0] ? parts[0].charAt(0).toUpperCase() : "";
                let part1b = parts[0] ? parts[0].charAt(1) : "";
                let part2 = parts[1] ? parts[1].charAt(0).toUpperCase() : "";

                return part1a + (part2 ? part2 : part1b);
            },

            modalDoc(id) {
                let showDoc = _.findWhere(this.documents, {_id: id});
                this.$emit('item-modal', showDoc);
            },

            modalUserDoc(id) {
                let showDoc = _.findWhere(this.documents, {_id: id});
                this.$emit('item-modal-user', showDoc);
            },

            launchPage(id) {
                console.log("launchPage", id, this.config.target, window.location);

                let page = window.location.origin + "/" + this.config.target + "?q=" + id;
                window.open(page);
            },
        },

        computed: {

            //* inserts table (th) header labels
            tableLabels() {
                let start = this.labels;
                let labels = [];

                start.forEach(function (el) {
                    if (el.label) {
                        let css = el.type && el.type === "del" ? "has-text-centered" : (el.css ? el.css : "");
                        labels.push({label: el.label, css: css});
                    }
                });

                return labels;
            },

            //* build array of array of display objects
            tableItems() {
                let self = this;
                let out = [];
                let docs = this.documents;
                let fields = this.labels;

                //** prepare document for display listing and get info for each field to display
                docs.forEach(function (els) {
                    let tr = [];
                    let values = els;
                    values.updatedAt = els.updatedAt;

                    //*** create a set of initials if a "name" field exists
                    let name = "az";
                    if (els.name) {
                        name = self.createInitials(els.name);
                    }

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
                            url: base + val,
                            prefix: el.prefix ? el.prefix : "",
                            suffix: el.suffix ? el.suffix : "",
                            name: name,
                        });

                    });

                    out.push(tr);
                });
                return out;
            }
        }
    }
</script>

<style scoped>
    td {
        vertical-align: middle;
    }

    .pict {
        margin: 0.5rem;
    }

    .alt-pict {
        width: 3rem;
        height: 3rem;
        border-radius: 50%;
        background-color: #555;
        display: flex;
    }

    .alt-pict-text {
        color: #FFF;
        font-size: 1.5rem;
        margin: auto; /* Important */
        text-align: center;
    }

    .list-thumbnail {
        width: 3rem;
        border-radius: 50%;
        background-color: #eee;
    }

</style>
