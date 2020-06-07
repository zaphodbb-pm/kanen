<script>
    /**
     * @summary Layout for WidgetsContent.
     *
     * @memberof Pages:WidgetsContent
     * @function WidgetsContent
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
    import {header, page} from './widgetsContent_text'

    setContext("pageHdr", header);
    setContext("pageText", page);



    //* get the page header common component; component get gets its own translated text
    import Hdr from '/imports/both/pageStructure/PageHeader.svelte'


    //* page body support **************************
    import TabContent from '/imports/components/widgets/tabbedContent.svelte'
    import Accordian from '/imports/components/widgets/accordian.svelte'

</script>



<Hdr />


<section class="page-body columns">

    <article class="column is-6">
        <TabContent text="tabbed" tabSettings="is-toggle is-fullwidth" />
    </article>

    <article class="column is-6">
        <Accordian text="tabbed" tabSettings="is-warning is-light"  />
    </article>

</section>
