<script>
    /**
     * Layout for SysConfig page.
     *
     * @memberof Pages:SysConfig
     * @function sysConfig_page
     * @locus Client
     *
     */


    //* page set-up boilerplate *************************************

        //** setup props to receive route data (optional)
        export let currentRoute;
        export let params;

        //** page specific text and configuration
        import {header, page} from './sysConfig_text'
        import {pageConfig} from './sysConfig_config'

        //** app support files
        import { onMount } from 'svelte';
        import PageWrapper from '/imports/both/PageStructure/PageWrapper.svelte'

    //* end of page boilerplate *************************************



    //* page-body support **************************
    import {i18n} from '/imports/functions/i18n'
    import {lang} from '/imports/client/systemStores'

    import Form_Holder from '/imports/components/formBuilder/formHolder.svelte'
    import schema from './sysConfig_form_schema'
    import List_Holder from '/imports/components/listCollections/listHolder.svelte'
    import listArray from './sysConfig_list'

    let formText = i18n(page, "form", $lang);
    let listText = i18n(page, "list", $lang);

    let conf = pageConfig;
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

</script>




<PageWrapper {header} >

    <div class="columns">

        <article class="column is-5" class:is-hidden={!showList}>
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
                    on:doc-submitted="{docSent}"/>

        </article>

    </div>

</PageWrapper>
