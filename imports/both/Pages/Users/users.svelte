<script>
    /**
     * Layout for users page.
     *
     * @memberof Pages:Users
     * @function users
     * @locus Client
     *
     */


    //* page set-up boilerplate *************************************

        //** setup props to receive route data
        export let currentRoute;
        export let params;

        //** get page text information and set contexts for children components
        import {i18n} from '/imports/functions/i18n'
        import {lang} from '/imports/client/systemStores'
        import {header, page} from './users_text'

        //** app services (getContext is often optional)
        import { setContext, getContext, onMount, onDestroy } from 'svelte';
        setContext("pageHdr", header);
        setContext("pageText", page);

        //** (optional) get component configuration information and set contexts for children components
        import pageConfig from './users_config'
        setContext("pageConfig", pageConfig);

        //** get the page header common component; component get gets its own translated text from "pageText" context
        import Hdr from '/imports/both/pageStructure/PageHeader.svelte'

    //* end of page boilerplate *************************************



    //* page-body support **************************
    import config from './users_config'
    import Form_Holder from '/imports/components/formBuilder/formHolder.svelte'
    import schema from './users_form_schema'

    import List_Holder from '/imports/components/listCollections/listHolder.svelte'
    import listArray from './users_list'

    let formText = i18n(page, "form", $lang);
    let listText = i18n(page, "list", $lang);

    let conf = config;
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



<Hdr />


<section class="page-body">
    <div class="columns">

        <article class="column is-6" class:is-hidden={!showList}>
            <List_Holder
                    config="{conf.list}"
                    {listText}
                    {fields}
                    {sort}
                    submitted="{releaseEdit}"
                    on:send-doc="{docToEdit}"/>

        </article>

        <article class="column is-6" class:is-hidden={!showForm}>
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
</section>
