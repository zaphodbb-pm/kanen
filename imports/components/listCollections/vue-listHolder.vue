<template>

    <div class="card list-holder-container">

        <div v-if="config.showHdr" class="card-header" v-bind:class="config.bgTitle">
            <div class="card-header-title" style="color: inherit; font-size: inherit; font-weight: inherit;">
                {{config.header}}
            </div>
        </div>

        <div class="card-content">

            <div id="comp_listCollections">

                <div v-if="config.hasOverlay && config.addNew">
                    <div class="w-100 d-flex justify-content-between mb-3">
                        <div></div>

                        <button class="button is-primary is-outlined"
                                v-on:click="docEdit({})">
                            {{config.addNew}}
                        </button>
                    </div>
                </div>

                <div id="comp_rowSize" class="is-flex align-items-center" v-if="config.hasRows">
                    <vue-row-size v-bind=info v-on:row-changed="newRow"></vue-row-size>
                    <vue-page-count v-bind="info" class="mb-3 ml-4"></vue-page-count>
                </div>

                <div v-if="!!config.hasFilters && !!config.isShowFilters">
                    <vue-list-filters
                            v-show="showFilters"
                            v-bind:filters="buildFilters"
                            v-on:filters-changed="filterList">
                    </vue-list-filters>
                </div>

                <div class="columns">

                    <div class="column">
                        <div id="comp_searchbox" v-if="config.hasSearch">
                            <vue-searchbox v-on:search-changed="newSearch"></vue-searchbox>
                        </div>
                    </div>

                    <div class="column is-2" v-if="!config.isShowFilters">
                        <div style="display: flex; flex-direction: row-reverse;">
                            <div v-if="!!config.hasFilters"
                                 v-bind:class="filterState"
                                 v-on:click="setFilter"
                                 class="button">

                                <i v-bind:class="config.iconFilters"></i>
                            </div>
                        </div>
                    </div>

                </div>

                <div v-if="config.hasFilters && !config.isShowFilters">
                    <vue-list-filters
                            v-show="showFilters"
                            v-bind:filters="buildFilters"
                            v-on:filters-changed="filterList">
                    </vue-list-filters>
                </div>

                <div id="comp_pagination" v-if="config.hasPager">
                    <vue-pagination
                            v-bind:rows="pageRows"
                            v-bind:totalDocs="info.pageCounts"
                            v-on:page-changed="newPage">
                    </vue-pagination>
                </div>

                <div v-if="config.display === 'grid'">
                    <component
                            v-bind:is="addGridLayout"
                            v-bind="info"
                            v-on:item-delete="docDelete"
                            v-on:item-edit="docEdit">
                    </component>
                </div>

                <div v-else id="comp_itemlist" class="">
                    <vue-list-table
                            v-bind="info"
                            v-on:item-delete="docDelete"
                            v-on:item-edit="docEdit"
                            v-on:item-modal="docModal"
                            v-on:item-modal-user="docModalUser"
                    ></vue-list-table>
                </div>

            </div>

        </div>

    </div>

</template>


<script>
    /**
     * @summary top level Vue component that holds a document list.
     *
     * @memberof Components_List
     * @function vue-listHolder
     * @locus Client
     * @isTemplate true
     *
     * @param {Object} config - see example
     * @param {Array} fields - list of fields to fetch and show in a table
     * @param {Object} sort - main field to sort returned docs
     * @param {Boolean} submitted - indicator for document submission by a form
     * @param {String} coll - valid collection name
     *
     * @requires {methodReturn}_from_'/imports/client/functions/common/func-methodReturn'
     * @requires {buildFilter}_from_'./func-buildFilter'
     * @requires {buildQuery}_from_'./func-buildQuery'
     * @requires {graphGetDocs}_from_'/imports/client/functions/func-graphGetDocs'
     *
     * @requires VueRowSize_from_'./vue-rowSize.vue'
     * @requires VuePageCount_from_'./vue-pageCount.vue'
     * @requires VuePagination_from_'./vue-pagination.vue'
     * @requires VueSearchbox_from_'./vue-searchbox.vue'
     * @requires VueListFilters from './vue-listFilters'
     * @requires VueListTable_from_'./vue-listTable.vue'
     *
     * @return nothing
     *
     * @emits {Object} send-doc message
     * @emits {Object} modal-doc msg
     * @emits {Array} list-docs-ready - array of document objects
     *
     * @example
     *      config options for controlling list layout
     *
     *              coll: "products",           // collection name to list
     *
     *              hasOverlay: false,          // support for form overlaying the list during edit operation
     *              hasRows: true,              // show row length selection box
     *              hasSearch: true,            // show search box
     *              hasPager: true,             // show pager component, pages = (number of items) / (rows per page)
     *              hasFilters: true,           // show search filters for specific fields
     *              isShowFilters: true,        // show filters at page load; user can then toggle off
     *              display: "grid",            // show results as a "list" (default) or asd a "grid" of cards
     *              displayGrid: '/imports/both/pages/Pages/vue-listGrid',         // dynamically loaded grid card display component
     *              iconFilters: kanen.icons.FILTERS,
     *
     *              showHdr: false,              // show card header and title if true
     *              bgTitle: kanen.constants.BG_CARD,   // sets card title background and text color
     *              header: "",                 // label for card header
     *
     *              group: false,               // activate the ability to create groups of file names
     *              target: null,               // send grouped list to this collection
     *
     *      field object keys:
     *              field: "name",              // field name
     *              key: "name",                // document key value
     *              label: text.name.label,     // user readable label for form
     *              type: "inDateRange",        // how to display in the table or grid; also used by filter
     *              filter: text.name.filter,   // filter information
     *              condition: {$gte: now},     // general MongoDb search criterion merged with other items for a final query
     *              sort: 1,                    // allows sorting based on value returned
     *              search: true,               // allows for searching from search bar
     *
     */


    //* support functions
    import {methodReturn} from '/imports/client/functions/func-methodReturn'
    import {buildFilter} from './func-buildFilter'
    import {buildQuery} from './func-buildQuery'
    import {graphGetDocs} from '/imports/client/functions/func-graphGetDocs'

    import VueRowSize from './vue-rowSize.vue'
    import VuePageCount from './vue-pageCount.vue'
    import VuePagination from './vue-pagination.vue'
    import VueSearchbox from './vue-searchbox.vue'
    import VueListFilters from './vue-listFilters'
    import VueListTable from './vue-listTable.vue'
    import VueListGrid from './listGrid.svelte'


    export default {

        props: {
            config: Object,
            fields: Array,
            sort: Object,
            submitted: Boolean,
            coll: String
        },

        components: {
            VueRowSize,
            VuePageCount,
            VueSearchbox,
            VueListFilters,
            VuePagination,
            VueListTable,
            VueListGrid,
        },

        data() {

            return {
                //** define specific form fields
                pageRows: 10,
                pageActive: 0,
                totalDocs: 0,

                collQuery: {},
                collFields: {},

                addFilters: {},
                filterState: this.config.isShowFilters ? "is-primary" : "is-light",
                showFilters: this.config.isShowFilters,

                addConditions: {},

                info: {
                    config: this.config,
                    pageCounts: 1,
                    pageCountLabel: "",
                    pageActive: this.pageActive,

                    labels: this.fields,
                    documents: [],
                    collection: this.coll,
                    submitted: this.submitted
                },
            };
        },


        async mounted() {
            //* on first load, show a list of unfiltered documents for this user; "combo" type gets a different count
            this.totalDocs = await this.getPageCounts(this.coll, {});

            this.addConditions = this.getConditions(this.fields);
            this.getDocs();
        },

        computed: {
            addGridLayout() {
                if (this.config && this.config.displayGrid) {
                    return () => import(this.config.displayGrid);
                } else {
                    return VueListGrid;
                }
            },

            buildFilters() {
                let filters = [];

                //* find all list fields that have a "filter" key set
                this.fields.forEach((fld) => {
                    if (fld.filter && fld.filter.length > 0) {
                        filters.push(
                            {field: fld.field, filter: fld.filter, type: fld.type}
                        )
                    }
                });

                //* build and return a list of filters to apply to search
                return filters;
            }
        },

        watch: {
            config() {
                if (this.config && this.config.displayGrid) {
                    this.addGridLayout();
                }
            },

            async submitted() {
                this.info.submitted = this.submitted;
                this.totalDocs = await this.getPageCounts(this.coll, {});
                this.getDocs();
            },

            async coll() {
                this.totalDocs = await this.getPageCounts(this.coll, {});
                this.getDocs();
            }
        },

        methods: {

            getConditions(fields) {
                let conditions = {};

                //* find all list fields that have a "condition" key set and apply as a general search criteria
                fields.forEach((con) => {
                    if (con.condition && typeof con.condition === "object") {
                        conditions[con.field] = con.condition;
                    }
                });

                return conditions;
            },

            setFilter() {
                //* if search filters are allowed, then turn on the filter button to show or hide the column filters
                this.filterState = this.filterState === "is-light" ? "is-primary" : "is-light";
                this.showFilters = this.filterState === "is-primary";
            },

            filterList(filters) {
                //* respond to user filter selection and get new list of filtered documents
                this.addFilters = filters;
                this.getDocs();
            },

            newRow(msg) {
                //* when a user changes the rows length, get a the new longer list of documents
                this.pageRows = parseInt(msg.row);
                this.info.pagesRow = this.pageRows;
                this.getDocs();
            },

            newPage(msg) {
                //* when a user uses pagination buttons,  get the documents for that range of selected page
                this.pageActive = msg.page;
                this.getDocs();
            },

            newSearch(msg) {
                //* respond to a user entering text into the search bar by constructing search fragment object
                let target = msg.search;

                //* reset table if all text is removed
                if (target.length === 0) {
                    this.collQuery = {};
                    this.collFields = {};

                    this.getDocs();
                }

                if (target.length > 2) {                        // need at least three characters to start a query
                    target = target.replace(/ /g, '');          // remove all white spaces

                    let list = {};
                    let fields = [];
                    let sArray = [];

                    //* get list of fields to search
                    this.fields.forEach(function (el) {
                        if (el.key) {
                            list[el.key] = 1;
                        }
                        if (el.search) {
                            fields.push(el.key);
                        }
                    });

                    this.collFields = list;

                    //* simple search
                    //** for logs search, respond to ":" as an object delimiter
                    if (target.includes(":")) {
                        sArray = target.split(":");
                        let key = {};
                        key["data." + sArray[0]] = {$regex: ".*" + sArray[1] + ".*", $options: "i"};
                        this.collQuery = key;
                    } else {
                        //** else do a simple or compound search starting with ; and then +
                        this.collQuery = buildQuery(target, fields);
                    }

                    this.getDocs();
                }
            },

            async getDocs() {
                let setQ = this.collQuery ? this.collQuery : {};
                let combineSearch = Object.assign({}, setQ, this.addFilters, this.addConditions);

                this.info.pageCounts = await this.getPageCounts(this.coll, setQ);

                let f = buildFilter(
                    this.pageRows ? this.pageRows : 10,
                    this.pageActive ? this.pageActive : 1,
                    this.info.pageCounts,
                    this.sort ? this.sort : {}
                );

                //* support for combination collection searches
                let comboColls = ["marketplaceProducts", "marketplaceActivities", "marketplaceEvents", "marketplaceMerchants"];

                if (comboColls.includes(this.coll)) {
                    this.info.documents = await graphGetDocs(this.coll, "combo", combineSearch, f.filterSearch, null);
                    this.info.pageCountLabel = this.info.documents.length;
                } else {
                    this.info.documents = await graphGetDocs(this.coll, "list", combineSearch, f.filterSearch, null);
                    this.info.pageCountLabel = `${f.start} - ${f.end} / ${this.info.pageCounts} (${this.totalDocs})`;
                }

                this.$emit("list-docs-ready", this.info.documents);
            },

            async getPageCounts(coll, query) {
                let res = 0;

                try {
                    res = await Meteor.callPromise("pagerCount", coll, query);
                } catch (error) {
                    console.warn("pagerCount", error);
                }

                return res;
            },

            docDelete(msg) {
                let self = this;

                switch (true) {
                    case self.coll === "users":
                        Meteor.call('userMgmtRemove', msg.id, function (err, res) {
                            methodReturn(err, res, "listHolder userMgmtRemove");

                            if (res) {
                                self.$emit("delete-doc", msg);
                                self.getDocs();
                            }
                        });
                        break;

                    case self.coll === "employees":
                        Meteor.call('employeeRemove', msg.id, function (err, res) {
                            methodReturn(err, res, "listHolder employeeRemove");

                            if (res) {
                                self.$emit("delete-doc", msg);
                                self.getDocs();
                            }
                        });
                        break;

                    default:
                        Meteor.call('inputterRemove', self.coll, msg.id, function (err, res) {
                            methodReturn(err, res, "listHolder inputterRemove");

                            if (res) {
                                self.$emit("delete-doc", msg);
                                self.getDocs();
                            }
                        });
                }
            },

            docEdit(msg) {

                let message = {
                    id: "",
                    type: "create",
                    coll: this.coll,
                };

                //** if editing a doc send doc id else clear edit form
                if (msg.edit) {
                    message.id = msg.id;
                    message.type = "edit";
                }

                this.$emit("send-doc", message);
            },

            docModal(msg) {
                this.$emit("modal-doc", msg);
            },

            docModalUser(msg) {
                this.$emit("modal-doc-user", msg);
            }
        }
    }

</script>
