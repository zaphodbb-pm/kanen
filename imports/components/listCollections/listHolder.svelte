<script>
    /**
     * Top level component that holds a document list.
     *
     * @memberof Components:List
     * @function listHolder
     * @locus Client
     * @isTemplate true
     *
     * @param {Object} config - see example
     * @param {Array} fields - list of fields to fetch and show in a table
     * @param {Object} sort - main field to sort returned docs
     * @param {Boolean} submitted - indicator for document submission by a form
     * @param {String} coll - valid collection name
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
    import {onMount, onDestroy, setContext, getContext} from 'svelte'
    import {createEventDispatcher} from 'svelte';
    const dispatch = createEventDispatcher();

    import {methodReturn} from '/imports/functions/methodReturn'
    import {buildFilter} from './func-buildFilter'
    import {buildQuery} from './func-buildQuery'
    import {getDocs} from '/imports/functions/getDocs'

    //* components
    import ListGrid from './listGrid'

    //* props
    export let config = {};
    export let listText = {};
    export let fields = [];
    export let sort = {};
    export let submitted = false;
    export let coll = "";

    //* local reactive variables
    let pageRows = 10;
    let pageActive = 0;
    let totalDocs = 0;
    let collQuery = {};

    let collFields = {};
    let addFilters = {};
    let filterState = config.isShowFilters ? "is-primary" : "is-light";
    let showFilters = config.isShowFilters;
    let addConditions = {};

    let info = {
        config: config,
        pageCounts: 1,
        pageCountLabel: "",
        pageActive: this.pageActive,

        labels: this.fields,
        documents: [],
        collection: coll,
        submitted: submitted
    };


    setContext("listText", listText);
    console.log("list text:", listText, getContext("listText") );


    if (config && config.displayGrid) {
        addGridLayout();
    }







    onMount(async () => {
        //* on first load, show a list of unfiltered documents for this user; "combo" type gets a different count
        totalDocs = await getPageCounts(coll, {});

        addConditions = getConditions(fields);

        totalDocs = await getPageCounts(coll, {});

        getCurrentDocs();

        $: {
            info.submitted = submitted;
            totalDocs = await getPageCounts(coll, {});
            getCurrentDocs();
        }
    } );




    function addGridLayout() {
        if (config && config.displayGrid) {
            return () => import(config.displayGrid);
        } else {
            return ListGrid;
        }
    }

    function buildFilters() {
        let filters = [];

        //* find all list fields that have a "filter" key set
        fields.forEach((fld) => {
            if (fld.filter && fld.filter.length > 0) {
                filters.push(
                        {field: fld.field, filter: fld.filter, type: fld.type}
                )
            }
        });

        //* build and return a list of filters to apply to search
        return filters;
    }




    function getConditions(fields) {
        let conditions = {};

        //* find all list fields that have a "condition" key set and apply as a general search criteria
        fields.forEach((con) => {
            if (con.condition && typeof con.condition === "object") {
                conditions[con.field] = con.condition;
            }
        });

        return conditions;
    }

    function setFilter() {
        //* if search filters are allowed, then turn on the filter button to show or hide the column filters
        filterState = filterState === "is-light" ? "is-primary" : "is-light";
        showFilters = filterState === "is-primary";
    }

    function filterList(filters) {
        //* respond to user filter selection and get new list of filtered documents
        addFilters = filters;
        getCurrentDocs();
    }

    function newRow(msg) {
        //* when a user changes the rows length, get a the new longer list of documents
        pageRows = parseInt(msg.row);
        info.pagesRow = pageRows;
        getCurrentDocs();
    }

    function newPage(msg) {
        //* when a user uses pagination buttons,  get the documents for that range of selected page
        pageActive = msg.page;
        getCurrentDocs();
    }

    function newSearch(msg) {
        //* respond to a user entering text into the search bar by constructing search fragment object
        let target = msg.search;

        //* reset table if all text is removed
        if (target.length === 0) {
            collQuery = {};
            collFields = {};

            getCurrentDocs();
        }

        if (target.length > 2) {                        // need at least three characters to start a query
            target = target.replace(/ /g, '');          // remove all white spaces

            let list = {};
            let fields = [];
            let sArray = [];

            //* get list of fields to search
            fields.forEach(function (el) {
                if (el.key) {
                    list[el.key] = 1;
                }
                if (el.search) {
                    fields.push(el.key);
                }
            });

            collFields = list;

            //* simple search
            //** for logs search, respond to ":" as an object delimiter
            if (target.includes(":")) {
                sArray = target.split(":");
                let key = {};
                key["data." + sArray[0]] = {$regex: ".*" + sArray[1] + ".*", $options: "i"};
                collQuery = key;
            } else {
                //** else do a simple or compound search starting with ; and then +
                collQuery = buildQuery(target, fields);
            }

            getCurrentDocs();
        }
    }

    async function getCurrentDocs() {
        let setQ = collQuery ? collQuery : {};
        let combineSearch = Object.assign({}, setQ, addFilters, addConditions);

        info.pageCounts = await getPageCounts(coll, setQ);

        let f = buildFilter(
                pageRows ? pageRows : 10,
                pageActive ? pageActive : 1,
                info.pageCounts,
                sort ? sort : {}
        );

        //* support for combination collection searches
        let comboColls = ["marketplaceProducts", "marketplaceActivities", "marketplaceEvents", "marketplaceMerchants"];

        if (comboColls.includes(coll)) {
            info.documents = await getDocs(coll, "combo", combineSearch, f.filterSearch, null);
            info.pageCountLabel = info.documents.length;
        } else {
            info.documents = await getDocs(coll, "list", combineSearch, f.filterSearch, null);
            info.pageCountLabel = `${f.start} - ${f.end} / ${info.pageCounts} (${totalDocs})`;
        }

        dispatch("list-docs-ready", info.documents);
    }

    async function getPageCounts(coll, query) {
        let res = 0;

        try {
            //res = await Meteor.callPromise("pagerCount", coll, query);
            res = 77;
        } catch (error) {
            console.warn("pagerCount", error);
        }

        return res;
    }

    function docDelete(msg) {
        switch (true) {
            case self.coll === "users":
                Meteor.call('userMgmtRemove', msg.id, function (err, res) {
                    methodReturn(err, res, "listHolder userMgmtRemove");

                    if (res) {
                        dispatch("delete-doc", msg);
                        getCurrentDocs();
                    }
                });
                break;

            case self.coll === "employees":
                Meteor.call('employeeRemove', msg.id, function (err, res) {
                    methodReturn(err, res, "listHolder employeeRemove");

                    if (res) {
                        dispatch("delete-doc", msg);
                        getCurrentDocs();
                    }
                });
                break;

            default:
                Meteor.call('inputterRemove', coll, msg.id, function (err, res) {
                    methodReturn(err, res, "listHolder inputterRemove");

                    if (res) {
                        dispatch("delete-doc", msg);
                        getCurrentDocs();
                    }
                });
        }
    }

    function docEdit(msg) {
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

        dispatch("send-doc", message);
    }

    function docModal(msg) {
        dispatch("modal-doc", msg);
    }

    function docModalUser(msg) {
        dispatch("modal-doc-user", msg);
    }


</script>

<div class="card list-holder-container">

    {#if config.showHdr}
        <div class="card-header {config.bgTitle}">
            <div class="card-header-title" style="color: inherit; font-size: inherit; font-weight: inherit;">
                {config.header}
            </div>
        </div>
    {/if}


    <div class="card-content">

        content


        <div id="comp_listCollections">
            {#if config.hasOverlay && config.addNew}
                <div class="w-100 d-flex justify-content-between mb-3">
                    <div></div>

                    <button class="button is-primary is-outlined"
                            on:click="{ () => docEdit({}) }">
                        {config.addNew}
                    </button>
                </div>
            {/if}

            {#if config.hasRows}
                <div id="comp_rowSize" class="is-flex align-items-center">
                    <div>row size</div>
                    <div>count</div>
                    <!--
                    <vue-row-size v-bind=info v-on:row-changed="newRow"></vue-row-size>
                    <vue-page-count v-bind="info" class="mb-3 ml-4"></vue-page-count>
                    -->
                </div>
            {/if}


            {#if !!config.hasFilters && !!config.isShowFilters}
                list filters
                <!--
                <vue-list-filters
                        v-show="showFilters"
                        v-bind:filters="buildFilters"
                        v-on:filters-changed="filterList">
                </vue-list-filters>
                -->
            {/if}

            <div class="columns">
                <div class="column">
                    {#if config.hasSearch}
                        searchbox
                        <!--<vue-searchbox v-on:search-changed="newSearch"></vue-searchbox>-->
                    {/if}
                </div>

                {#if !config.isShowFilters && !!config.hasFilters}
                    <div class="column is-2">
                        <div style="display: flex; flex-direction: row-reverse;">
                            <div class="button {filterState}" on:click="{setFilter}">
                                <i class="{config.iconFilters}"></i>
                            </div>
                        </div>
                    </div>
                {/if}
            </div>


            {#if config.hasFilters && !config.isShowFilters}
                list filters
                <!--
                <vue-list-filters
                        v-show="showFilters"
                        v-bind:filters="buildFilters"
                        v-on:filters-changed="filterList">
                </vue-list-filters>
                -->
            {/if}

            {#if config.hasPager}
                <div id="comp_pagination">
                    pagination
                    <!--
                    <vue-pagination
                            v-bind:rows="pageRows"
                            v-bind:totalDocs="info.pageCounts"
                            v-on:page-changed="newPage">
                    </vue-pagination>
                    -->
                </div>
            {/if}


            {#if config.display === 'grid'}
                addGridLayout
                <!--
                <component
                        v-bind:is="addGridLayout"
                        v-bind="info"
                        v-on:item-delete="docDelete"
                        v-on:item-edit="docEdit">
                </component>
                -->
            {:else}
                list-table
                <!--
                <vue-list-table
                        v-bind="info"
                        v-on:item-delete="docDelete"
                        v-on:item-edit="docEdit"
                        v-on:item-modal="docModal"
                        v-on:item-modal-user="docModalUser">

                </vue-list-table>
                -->
            {/if}

        </div>

    </div>

</div>
