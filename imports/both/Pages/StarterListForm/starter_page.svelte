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

    // setup props to receive route data
    export let currentRoute;
    export let params;

    // app services (getContext is often optional)
    import { setContext } from 'svelte';
    //import { getContext } from 'svelte';

    // get the user language preference from store (optional)
    import {lang} from '/imports/both/systemStores'

    // get page text information and set contexts for children components
    import pageText from './starter_page_text'
    setContext("pageText", pageText);

    // get component configuration information and set contexts for children components
    import pageConfig from './starter_page_config'
    setContext("pageConfig", pageConfig);

    // get the page header common component; component get gets its own translated text from "pageText" context
    import Hdr from '/imports/both/pageStructure/PageHeader.svelte'

    //****************************************************************



    //* page-body support **************************
    import {onMount, onDestroy} from 'svelte'

    import config from './starter_page_config'
    import Form_Holder from '/imports/components/formBuilder/formHolder.svelte'
    import schema from './starter_form_schema'

    import List_Holder from '/imports/components/listCollections/listHolder.svelte'
    import listArray from './starter_list'

    import {i18n} from '/imports/functions/i18n'
    let formText = i18n(pageText, "form", $lang);
    let listText = i18n(pageText, "list", $lang);

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



    onMount( () => {

    });

    onDestroy( () => {
        console.log("listForm page destroyed");
    });


    function checkOverlay() {
        showList = !!conf.list.hasOverlay || !conf.form.hasOverlay;
        showForm = !conf.form.hasOverlay;
        releaseEdit = true;
    }

    function docToEdit(msg) {
        currentDoc = msg.detail;
        editdoc = msg.detail;
        showList = !conf.list.hasOverlay;
        showForm = !conf.list.hasOverlay || !!conf.form.hasOverlay;
        releaseEdit = false;

        console.log("docToEdit", msg.detail);
    }

    function docSent(){
        showList = !!conf.list.hasOverlay || !conf.form.hasOverlay;
        showForm = !conf.form.hasOverlay;
        releaseEdit = true;
        currentDoc = {};

        console.log("docSent");
    }




</script>



<Hdr />



<section class="page-body">

    <div class="columns">
        <article class="column is-6">
            <List_Holder
                    config="{conf.list}"
                    {listText}
                    {fields}
                    {sort}
                    {submitted}

                    on:send-doc="{docToEdit}"/>

        </article>

        <article class="column is-6">
            <Form_Holder
                    config="{conf.form}"
                    {formText}
                    {schema}
                    {role}
                    {editdoc}
                    {directdoc}

                    on:back-to-list="{checkOverlay}"
                    on:doc-submitted="{docSent}"
            />

        </article>
    </div>

</section>
