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

    //* app services
    import { setContext } from 'svelte';
    import { getContext } from 'svelte';

    //* get page text information and set contexts for children components
    import {lang} from '/imports/both/systemStores'
    import pageText from './widgetsContent_text'
    setContext("pageText", pageText);

    //* get component configuration information and set contexts for children components
    import pageConfig from './widgetsContent_config'
    setContext("pageConfig", pageConfig);



    //* get the page header common component; component get gets its own translated text
    import Hdr from '/imports/both/pageStructure/PageHeader.svelte'


    //* page body support **************************
    import {i18n} from '/imports/functions/i18n'
    import TabContent from '/imports/components/widgets/tabbedContent.svelte'
    import Accordian from '/imports/components/widgets/accordian.svelte'

    let tabText = i18n(pageText.components, "tabbed", $lang);

</script>



<Hdr />


<section class="page-body columns">

    <article class="column is-6">
        <TabContent text="tabbed" tabSettings="is-toggle is-fullwidth" />
    </article>

    <article class="column is-6">
        <Accordian content="{tabText}" tabSettings="is-warning is-light"  />
    </article>

</section>
