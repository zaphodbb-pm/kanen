<script>
    /**
     * Layout for LogsSystem page.
     *
     * @memberof Pages:logsSystem
     * @function logsSystem_page
     * @locus Client
     *
     */


    //* page set-up boilerplate *************************************

    // setup props to receive route data
    export let currentRoute;
    export let params;

    // app services (getContext is often optional)
    import { onMount, onDestroy, setContext } from 'svelte';
    //import { getContext } from 'svelte';

    // get the user language preference from store (optional)
    import {lang} from '/imports/client/systemStores'

    // get page text information and set contexts for children components
    import {header, page} from './logsSystem_text'

    setContext("pageHdr", header);
    setContext("pageText", page);

    // get component configuration information and set contexts for children components
    import pageConfig from './logsSystem_config'
    setContext("pageConfig", pageConfig);

    // get the page header common component; component get gets its own translated text from "pageText" context
    import Hdr from '/imports/both/pageStructure/PageHeader.svelte'

    //****************************************************************



    //* page-body support **************************
    import config from './logsSystem_config'
    import List_Holder from '/imports/components/listCollections/listHolder.svelte'
    import listArray from './logsSystem_list'

    import {i18n} from '/imports/functions/i18n'
    let listText = i18n(page, "list", $lang);

    let conf = config;
    let sort = listArray.sort;
    let fields = listArray.fields;
    let releaseEdit = false;

</script>



<Hdr />


<section class="page-body">
    <div class="columns">

        <article class="column">
            <List_Holder
                    config="{conf.list}"
                    {listText}
                    {fields}
                    {sort}
                    submitted="{releaseEdit}"/>

        </article>

    </div>
</section>
