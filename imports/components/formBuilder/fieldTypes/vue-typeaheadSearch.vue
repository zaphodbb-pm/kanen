<template>
    <div class="vbta">
        <input type="text" readonly
               v-bind:class="['input', 'vbta-hint', { visible: matches.length }]"
               v-bind:value="hint"
               v-bind:placeholder="placeholder">

        <input type="text" class="input vbta-input"
               v-model="query"
               v-on:keyup.delete="handleDelete($event)"
               v-on:keyup.enter.prevent.submit="emitSelect(matches[preselected])">

        <div v-bind:class="['vbta-menu', { visible: matches.length && !selected }]">
            <ul>
                <li v-for="match in matches" class="vbta-suggestion" v-on:click="emitSelect(match)">
                    <span v-html="match"></span>
                </li>
            </ul>
        </div>
        <label class="has-float-label">{{cmpLabel}}</label>
    </div>
</template>

<script>
    /**
     * @summary Vue typeahead with search select bar.  Used for very large collections to find documents.
     *
     * @memberof Components_Form
     * @function vue-typeaheadSearch
     * @locus Client
     * @isTemplate true
     * @augments vue-formFields
     *
     * @requires {debounce}_from_'/imports/client/functions/func-debounce'
     * @requires {graphGetDocs}_from_'/imports/client/functions/func-graphGetDocs'
     *
     * @return nothing - emits: onSelect with id , name
     *
     * @see Based on work by {@link https://github.com/mattrosendin/vue-bulma-typeahead|Matt Rosendin}
     *
     */


    import {debounce} from '/imports/client/functions/func-debounce'
    import {graphGetDocs} from '/imports/client/functions/func-graphGetDocs'

    export default {
        props: {

            source: {
                type: Array,
                default: () => {
                    return []
                },
                required: true
            },

            async: {
                type: Boolean,
                default: false,
                required: false
            },

            placeholder: {
                type: String,
                default() {
                    return ''
                },
                required: false
            },

            attributes: {
                type: Object,
                required: false
            },

            parms: {
                type: Object,
                required: false
            },

            value: {
                type: Object,
                required: false
            },

            cmpLabel: {
                type: String,
                required: false
            }
        },

        data() {
            return {
                query: '',
                matches: [],
                ids: [],
                hint: this.value.name,
                selected: false,
                firstTouch: true,
                preselected: 0,

                setList: [],

                searchField: this.parms && this.parms.search ? this.parms.search : false,
                searchType: this.parms && this.parms.type ? this.parms.type : false,
            }
        },

        watch: {
            query(qr) {
                if (this.async) {
                    debounce(this.getMatches, 150)(qr);
                } else {
                    this.getMatches(qr);
                }
            },

            value() {
                this.hint = this.value.name;
                this.query = this.value.name;
                this.selected = true;
                this.firstTouch = false;
                this.preselected = 0;
            }
        },

        methods: {
            handleDelete() {
                this.selected = false;
                this.preselected = 0;
                this.firstTouch = true;
            },

            emitSelect(sel) {
                let pos = this.matches.indexOf(sel);

                sel = sel.replace(/<[\/]?strong>/gm, '');
                let out = {_id: this.ids[pos], name: sel};

                this.selected = true;
                this.query = sel;
                this.hint = sel;

                this.$emit('on-select', out);
                this.$emit('input', out);
            },

            getMatches(query) {
                if (query && query.length > 2) {

                    this.setSelects(query);

                    if (query.includes("+")) {
                        query = query.split("+");
                    }

                    if (this.setList && this.setList.length > 0) {

                        let matches = [];
                        let ids = [];
                        let regex = new RegExp(query, 'i');
                        let isMatch = false;
                        let len = this.parms && this.parms.rows ? this.parms.rows : 5;

                        if (typeof query === "string") {

                            this.setList.forEach(src => {
                                if (typeof src !== 'object') new TypeError(`Typeahead sources must be an object. Received ${typeof src}.`);
                                if (matches.length === len) return;

                                let regexProps = regex.exec(src.name);
                                if (regexProps) {
                                    isMatch = true;

                                    let substr1 = src.name.substring(0, regexProps.index);
                                    let substr2 = `<strong>${src.name.slice(regexProps.index, regexProps.index + query.length)}</strong>`;
                                    let substr3 = src.name.substring(regexProps.index + query.length);

                                    let match = substr1 + substr2 + substr3;
                                    matches.push(match);
                                    ids.push(src._id);

                                    if (regexProps.index === 0) {
                                        let hint = matches[0].replace(/<[\/]?strong>/gm, '').substring(query.length);
                                        if (hint !== this.hint) {
                                            this.hint = query + hint;
                                        }
                                    }
                                }
                                if (!isMatch) {
                                    this.hint = '';
                                }
                            });
                            this.matches = matches;
                            this.ids = ids;

                        } else {

                            if (Array.isArray(query)) {
                                this.hint = '';

                                let truncList = this.setList.filter(sl => {
                                    let temp = sl.name.toLowerCase();
                                    let test = true;

                                    query.forEach(function (q) {
                                        let check = temp.includes(q);
                                        if (!check) {
                                            test = false;
                                        }
                                    });

                                    return test;
                                });

                                this.matches = truncList.map(sl => sl.name);
                                this.ids = truncList.map(sl => sl._id);
                            }
                        }
                    }

                } else {
                    this.hint = '';
                    this.matches = [];
                    this.ids = [];
                }
            },

            setSelects(qr) {
                let filter = this.parms.filter ? this.parms.filter : {};
                let field = this.parms.filter.fields ? this.parms.filter.fields : {name: {}};
                let query = this.buildQuery(qr, field);

                this.getSelects(this.parms.coll, query, filter);
            },

            async getSelects(coll, query, filter) {
                this.setList = await graphGetDocs(coll, "select", query, filter, null);

                if (this.setList) {
                    this.setList = this.setList.map(function (s) {
                        if (coll === "users" || coll === "employees") {
                            return {
                                _id: s._id,
                                name: s.username,
                                handle: s.profile && s.profile.name ? s.profile.name : ""
                            };
                        } else {
                            return {_id: s._id, name: s.name};
                        }
                    });
                }
            },

            //* builds an array of "and" terms to filter the list
            //* build a query based on the first field in the fields key; should really only have one field target anyway.
            buildQuery(str, field) {
                let pairs = Object.entries(field);
                let key = pairs[0][0];
                let pairQuery = {};
                pairQuery[key] = {};

                if (str && str.includes("+")) {
                    let andArray = [];
                    let ands = str.split("+");

                    ands.forEach(function (el) {
                        if (el.length > 2) {                //need at least three characters to form a compound search

                            let and = {};
                            and[key] = {$regex: ".*" + el + ".*", $options: "i"};
                            andArray.push(and);
                        }
                    });

                    if (andArray.length > 0) {
                        pairQuery = {$and: andArray};
                    } else {
                        pairQuery = null;
                    }

                } else {
                    pairQuery[key] = {$regex: ".*" + str + ".*", $options: "i"};
                }

                return pairQuery;
            }
        }
    }
</script>


<style scoped>

    .vbta {
        width: 100%;
        position: relative;
        display: inline-block;
    }

    .vbta-input {
        background-color: transparent;
    }

    .vbta-menu.visible {
        display: inline-block;
    }

    .vbta-menu {
        position: absolute;
        width: 100%;
        top: 100%;
        left: 0;
        z-index: 1000;
        display: none;
        float: left;
        min-width: 160px;
        padding: 5px 0;
        margin: 2px 0 0;
        list-style: none;
        font-size: 14px;
        text-align: left;
        background-color: #ffffff;
        border: 1px solid rgba(0, 0, 0, 0.15);
        border-radius: 4px;
        -webkit-box-shadow: 0 6px 12px rgba(0, 0, 0, 0.175);
        box-shadow: 0 6px 12px rgba(0, 0, 0, 0.175);
        background-clip: padding-box;
    }

    .vbta-suggestion {
        display: block;
        padding: 3px 20px;
        clear: both;
        font-weight: normal;
        line-height: 1.4;
        color: #555;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .vbta-suggestion:hover,
    .vbta-suggestion:focus {
        color: #fff;
        text-decoration: none;
        outline: 0;
        background-color: #00bda0;
        cursor: pointer;
    }

    .vbta-hint {
        color: #999;
        position: absolute;
        top: 0;
        left: 0;
        border-color: transparent;
        box-shadow: none;
        opacity: 1;
        background: none 0 0 / auto repeat scroll padding-box border-box rgb(255, 255, 255);
    }
</style>
