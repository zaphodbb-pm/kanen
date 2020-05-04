<script>
    /**
     * @summary Layout for WidgetsContent.
     *
     * @memberof Pages:WidgetsContent
     * @function widgetsContent
     * @locus Client
     *
     */


    //* setup props to receive route data
    export let currentRoute;
    export let params;

    //* get the user language preference from store
    import {lang} from '/imports/client/structure/systemStores'
    let lng = $lang;

    //* app services
    import { setContext } from 'svelte';
    import { getContext } from 'svelte';

    //* get page text information and set contexts for children components
    import pageText from './widgetsContent_text'
    setContext("pageText", pageText);

    //* get page text information and set contexts for children components
    import pageConfig from './widgetsContent_config'
    setContext("pageConfig", pageConfig);

    //* get the page header common component and
    import Hdr from '/imports/client/structure/PageHeader.svelte'



    //* page body support **************************
    import {i18n} from '/imports/functions/func-i18n'
    import TabContent from '/imports/components/widgets/tabbedContent.svelte'

    let tabText = i18n(pageText.components, "tabbed", lng);

</script>



<Hdr hdrtext={pageText.header} lang={lng} />


<section class="page-body columns">

    <article class="column is-6">
        <TabContent tabSettings="is-toggle is-fullwidth" content={tabText}/>
    </article>

    <article class="column is-6">

        article two

    </article>

</section>
