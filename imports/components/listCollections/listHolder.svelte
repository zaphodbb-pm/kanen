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
     *
     *              showHdr: false,              // show card header and title if true
     *              bgTitle: kanen.constants.BG_CARD,   // sets card title background and text color
     *              header: "",                 // label for card header
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

    //* props
    export let config = {};
    export let listText = {};
    export let fields = [];
    export let sort = {};
    export let submitted = false;

    //* support functions
    import {onMount, onDestroy, setContext, getContext} from 'svelte'
    import Icon from '/imports/components/elements/icon.svelte'
    import {createEventDispatcher} from 'svelte';
    const dispatch = createEventDispatcher();

    import {methodReturn} from '/imports/functions/methodReturn'
    import {buildFilter} from './func-buildFilter'
    import {buildQuery} from './func-buildQuery'
    import {getDocs} from '/imports/functions/getDocs'

    //* make form text available to all children components
    setContext("listText", listText);

    fields = loadText( fields, listText);   // insert text into fields object

    console.log("listHolder", config, listText, fields );

    //* components
    import Row_Size from './rowSize.svelte'
    import Page_Count from './pageCount.svelte'
    import Search from './searchbox.svelte'
    import Pagination from './pagination.svelte'
    import List_Filters from './listFilters.svelte'
    import List_Table from './listTable.svelte'
    import ListGrid from './listGrid'

    //* local reactive variables
    let coll = config.coll;
    let pageRows = 10;
    let pageActive = 0;
    let totalDocs = 0;
    let collQuery = {};

    let collFields = {};
    let addFilters = {};
    //let filterState = config.hasFilters ? "is-primary" : "is-light";

    let filterState =  "is-light";
    let showFilters = false;
    let addConditions = {};

    let pageCounts = 500;
    let pageCountLabel = "0 - 0 / 0 (0)";
    let labels = fields;
    let documents = [];


    let info = {
        config: config,
        pageCounts: 1,
        pageCountLabel: "",
        pageActive: this.pageActive,

        labels: fields,
        documents: [],
        submitted: submitted
    };


    if (config && config.displayGrid) {
        console.log("hasGrid", config.displayGrid);

        //addGridLayout();
    }







    onMount(async () => {
        //* on first load, show a list of unfiltered documents for this user; "combo" type gets a different count
        //totalDocs = await getPageCounts(coll, {});

        //addConditions = getConditions(fields);

        //totalDocs = await getPageCounts(coll, {});

        //getCurrentDocs();

        $: {
            info.submitted = submitted;
            totalDocs = await getPageCounts(coll, {});
            getCurrentDocs();
        }
    } );



    //* event handlers
    function docModal(msg) {
        dispatch("modal-doc", msg.detail);
    }

    function docModalUser(msg) {
        dispatch("modal-doc-user", msg.detail);
    }

    function docDelete(msg) {
        //let emit = dispatch;
        switch (true) {
            case coll === "users":
                Meteor.call('userMgmtRemove', msg.detail.id, function (err, res) {
                    methodReturn(err, res, "listHolder userMgmtRemove");

                    if (res) {
                        dispatch("delete-doc", msg.detail);
                        getCurrentDocs();
                    }
                });
                break;

            default:
                Meteor.call('removeDoc', coll, msg.detail.id, function (err, res) {
                    methodReturn(err, res, "listHolder removeDoc");

                    if (res) {
                        dispatch("delete-doc", msg.detail);
                        getCurrentDocs();
                    }
                });
        }
    }

    function docEdit(msg) {
        let message = {
            id: "",
            type: "create",
            coll: coll,
        };

        //** if editing a doc send doc id else clear edit form
        if (msg.detail.edit) {
            message.id = msg.detail.id;
            message.type = "edit";
        }

        dispatch("send-doc", message);
    }



    //* functions that mutate local variables
    function addGridLayout() {
        if (config && config.displayGrid) {
            return () => import(config.displayGrid);
        } else {
            return ListGrid;
        }
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
        pageRows = parseInt(msg.detail.row);
        info.pagesRow = pageRows;
        getCurrentDocs();

        console.log("newRow", msg.detail, info.pagesRow);
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

        pageCounts = await getPageCounts(coll, setQ);

        let f = buildFilter(
                pageRows ? pageRows : 10,
                pageActive ? pageActive : 1,
                pageCounts,
                sort ? sort : {}
        );

        //* support for combination collection searches
        documents = await getDocs(coll, "list", combineSearch, f.filterSearch);

        pageCountLabel = `${f.start} - ${f.end} / ${pageCounts} (${totalDocs})`;
        info.pageCountLabel = pageCountLabel;

        console.log("getDocs", documents,  pageCountLabel)

        dispatch("list-docs-ready", documents);
    }


    //* pure functions
    function loadText(fields, text){
        let out = JSON.parse( JSON.stringify(fields) );
        out = out.map( (fld) => {
            fld.label = text[fld.key].label;
            return fld;
        })

        return out;
    }

    function buildFilters(fields) {
        let filters = [];

        //* find all list fields that have a "filter" key set
        if(fields && fields.length > 0){
            fields.forEach((fld) => {
                if (fld.filter && fld.filter.length > 0) {
                    filters.push(
                            {field: fld.field, filter: fld.filter, type: fld.type}
                    )
                }
            });
        }

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

    async function getPageCounts(coll, query) {
        let res = 0;

        try {
            res = await Meteor.callPromise("pagerCount", coll, query);
            //res = 77;
        } catch (error) {
            console.warn("pagerCount", error);
        }

        return res;
    }

</script>

<div class="card list-holder-container">

    {#if config.showHdr}
        <div class="card-header {config.bgTitle}">
            <div class="card-header-title" style="color: inherit; font-size: inherit; font-weight: inherit;">
                {listText.labels.hdr}
            </div>
        </div>
    {/if}


    <div class="card-content">
        <div id="comp_listCollections">
            {#if config.hasOverlay && listText.addNew}
                <div class="w-100 d-flex justify-content-between mb-3">
                    <div></div>

                    <button class="button is-primary is-outlined"
                            on:click="{ () => docEdit({}) }">
                        {listText.addNew}
                    </button>
                </div>
            {/if}

            {#if config.hasRows}
                <div id="comp_rowSize" class="is-flex align-items-center">
                    <Row_Size on:row-changed="{newRow}" />
                    <Page_Count {pageCountLabel }/>
                </div>
            {/if}


            {#if !!config.hasFilters && !!config.showFilters}
                top list filters

                <List_Filters filters="{buildFilters()}" on:filters-changed="{filterList}" />
            {/if}

            <div class="columns">
                <div class="column">
                    {#if config.hasSearch}
                        <Search on:search-changed="{newSearch}" />
                    {/if}
                </div>

                {#if !config.isShowFilters && !!config.hasFilters}
                    <div class="column is-2">
                        <div style="display: flex; flex-direction: row-reverse;">
                            <div class="button {filterState}" on:click="{setFilter}">
                                <Icon icon='{getContext("iconFilters")}' class="text-1dot5rem"/>
                            </div>
                        </div>
                    </div>
                {/if}
            </div>

            {#if config.hasFilters && !config.isShowFilters}
                {#if showFilters}
                        bottom list filters
                    <List_Filters filters="{buildFilters()}" on:filters-changed="{filterList}" />
                {/if}
            {/if}

            {#if config.hasPager}
                <div id="comp_pagination">
                    <Pagination rows="{pageRows}" totalDocs="{pageCounts}" />
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

                <List_Table
                    {config}
                    labels="{fields}"
                    {documents}
                    collection="{coll}"
                    {submitted}

                    on:item-delete="{docDelete}"
                    on:item-edit="{docEdit}"
                    on:item-modal="{docModal}"
                    on:item-modal-user="{docModalUser}"/>

            {/if}

        </div>

    </div>

</div>
