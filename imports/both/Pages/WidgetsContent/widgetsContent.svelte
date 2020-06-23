<script>
    /**
     * @summary Layout for WidgetsContent.
     *
     * @memberof Pages:WidgetsContent
     * @function WidgetsContent
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
        import {header, page} from './widgetsContent_text'

        //** app services (getContext is often optional)
        import { setContext, getContext, onMount, onDestroy } from 'svelte';
        setContext("pageHdr", header);
        setContext("pageText", page);

        //** get the page header common component; component get gets its own translated text from "pageText" context
        import Hdr from '/imports/both/pageStructure/PageHeader.svelte'

    //* end of page boilerplate *************************************



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
