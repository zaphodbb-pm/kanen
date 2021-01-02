<script>

/**
     * Component insert combination for list and form components.
     *
     * @memberof Components:ListForm
     * @function listForm
     * @locus Client
     *
     * @emits {Object} edit-initiated - {coll, type, data}
     * @emits {Object} doc-sent - {document object}
     */

    export let confList = {};
    export let confForm = {};
    export let schema = [];
    export let listArray = [];
    export let formText = {};
    export let listText = {};


    import {setContext} from 'svelte';
    import {generateId} from '/imports/functions/generateId'
    import {messages} from '/imports/client/systemStores'

    import Form_Holder from '/imports/components/formBuilder/formHolder.svelte'
    import List_Holder from '/imports/components/listCollections/listHolder.svelte'

    setContext("formText", formText);

    let mode = "list";
    let role = "";
    let editdoc = {};
    let directdoc = {};

    let sort = listArray.sort;
    let fields = listArray.fields;
    let submitted = false;
    let currentDoc = {};
    let showList = false;
    let showForm = false;
    let releaseEdit = false;
    let grid = false;

    $: showList = !!confList?.hasOverlay || !confForm?.hasOverlay;
    $: showForm = !confForm?.hasOverlay;
    $: gridMode(confList);

    //* functions that mutate reactive variables
    function checkOverlay() {
        showList = !!confList?.hasOverlay || !confForm?.hasOverlay;
        showForm = !confForm?.hasOverlay;
        releaseEdit = true;
    }

    function docToEdit(msg) {
        currentDoc = msg.detail;
        editdoc = msg.detail;

        if(!releaseEdit){
            showList = !confList?.hasOverlay;
            showForm = !confList?.hasOverlay || !!confForm?.hasOverlay;
        }

        releaseEdit = false;
    }

    function docSent(){
        showList = !!confList?.hasOverlay || !confForm?.hasOverlay;
        showForm = !confForm?.hasOverlay;
        releaseEdit = true;
    }

    //** for demonstration only; can be removed ***
    function methodMessage(msg){
        let status = msg.detail && msg.detail.status ? msg.detail.status : 500;

        let state = {
            200: "success",
            400: "fail",
            404: "warning",
            500: "uncertain",
        }

        let newMsg = {
            id: generateId(8),
            state: state[status],
            text: msg.detail && msg.detail.text ? msg.detail.text : "n/a"
        }

        $messages = [... $messages, newMsg];
    }
    //** end of demonstration ***



    function gridMode(msg){
        mode = msg?.display ?? "list";

        if(mode === "grid") {
            showList = true;
            showForm = false;

            releaseEdit = true;
        }else{
            checkOverlay();

            releaseEdit = false;
        }
    }

</script>



<div class="columns">

    <article class="column {mode === 'grid' ? 'is-12' : 'is-5'}" class:is-hidden={!showList}>
        <List_Holder
                config="{confList}"
                {listText}
                {fields}
                {sort}
                submitted="{releaseEdit}"
                on:send-doc="{docToEdit}"/>

    </article>

    <article class="column is-7" class:is-hidden={!showForm}>
        <Form_Holder
                config="{confForm}"
                {formText}
                {schema}
                {role}
                {editdoc}
                {directdoc}
                on:back-to-list="{checkOverlay}"
                on:doc-submitted="{docSent}"
                on:method-return={methodMessage}/>

    </article>

</div>
