<script>
    /**
     * @summary Layout for ListForm page.
     *
     * @memberof Pages:ListForm
     * @function pageListForm
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
    import pageText from './listForm_text'
    setContext("pageText", pageText);

    // get component configuration information and set contexts for children components
    import pageConfig from './listForm_config'
    setContext("pageConfig", pageConfig);

    // get the page header common component; component get gets its own translated text from "pageText" context
    import Hdr from '/imports/both/pageStructure/PageHeader.svelte'

    //****************************************************************



    //* page-body support **************************
    import {onMount, onDestroy} from 'svelte'
    import {i18n} from '/imports/functions/func-i18n'
    import TabContent from '/imports/components/widgets/tabbedContent.svelte'

    let message = "";

    onMount( () => {
        message = "<b>listForm page</b> mounted";
    });

    onDestroy( () => {
        console.log("listForm page destroyed");
    });

</script>



<Hdr />



<section class="page-body">

    <article class="mb-5">
        <div>{message}</div>
        <div>{@html message}</div>
    </article>

    <div class="columns">
        <article class="column is-6">
            <div class="box">
                {@html i18n(pageText.components, "box", $lang)}
            </div>
        </article>

        <article class="column is-6">
            <TabContent text="example1" tabSettings="is-boxed is-fullwidth" />
        </article>

    </div>

</section>
