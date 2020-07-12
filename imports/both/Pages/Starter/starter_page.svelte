<script>
    /**
     * Layout for Starter page.
     *
     * @memberof Pages:Starter
     * @function starter_page
     * @locus Client
     *
     */


    //* page set-up boilerplate *************************************

        //** setup props to receive route data (optional)
        export let currentRoute;
        export let params;

        //** page specific text and configuration
        import {header, page} from './starter_page_text'
        import {pageConfig} from './starter_page_config'

        //** app support files
        import { setContext, onMount } from 'svelte';
        import PageWrapper from '/imports/both/pageStructure/PageWrapper.svelte'

    //* end of page boilerplate *************************************


    //* page-body support **************************
    import {i18n} from '/imports/functions/i18n'
    import {lang, messages} from '/imports/client/systemStores'
    import {deepClone} from '/imports/functions/deepClone'
    import {generateId} from '/imports/functions/generateId'

    import Field_Wrapper from '/imports/components/formBuilder/fieldWrapper.svelte'
    import Form_Holder from '/imports/components/formBuilder/formHolder.svelte'
    import schema from './starter_form_schema'

    import List_Holder from '/imports/components/listCollections/listHolder.svelte'
    import listArray from './starter_list'

    let mode = false;
    let formText = i18n(page, "form", $lang);
    let listText = i18n(page, "list", $lang);
    setContext("formText", formText);


    let conf = deepClone(pageConfig);
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

    //* lifecycle controls
    onMount( () => {
        showList = !!conf.list.hasOverlay || !conf.form.hasOverlay;
        showForm = !conf.form.hasOverlay;
    });


    //* functions that mutate reactive variables
    function checkOverlay() {
        showList = !!conf.list.hasOverlay || !conf.form.hasOverlay;
        showForm = !conf.form.hasOverlay;
        releaseEdit = true;
    }

    function docToEdit(msg) {
        currentDoc = msg.detail;
        editdoc = msg.detail;

        if(!releaseEdit){
            showList = !conf.list.hasOverlay;
            showForm = !conf.list.hasOverlay || !!conf.form.hasOverlay;
        }

        releaseEdit = false;
    }

    function docSent(){
        showList = !!conf.list.hasOverlay || !conf.form.hasOverlay;
        showForm = !conf.form.hasOverlay;
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
        mode = msg.detail.value;

        if(mode) {
            showList = true;
            showForm = false;

            conf.list.display = "grid";
            releaseEdit = true;
        }else{
            conf.list.display = "list";
            checkOverlay();

            releaseEdit = false;
        }
    }

</script>




<PageWrapper {header} >
    <div class="columns">

        <div class="column is-one-quarter is-offset-three-quarters">
            <Field_Wrapper
                    class=""
                    field="{pageConfig.components.gridMode}"
                    watchFields="{ {} }"
                    on:field-changed="{gridMode}"/>
        </div>
    </div>

    <div class="columns">

        <article class="column {mode ? 'is-12' : 'is-5'}" class:is-hidden={!showList}>
            <List_Holder
                    config="{conf.list}"
                    {listText}
                    {fields}
                    {sort}
                    submitted="{releaseEdit}"
                    on:send-doc="{docToEdit}"/>

        </article>

        <article class="column is-7" class:is-hidden={!showForm}>
            <Form_Holder
                    config="{conf.form}"
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

</PageWrapper>
