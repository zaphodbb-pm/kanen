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

        //** setup props to receive route data (optional)
        export let currentRoute;
        export let params;

        //** page specific text and configuration
        import {header, page} from './widgetsContent_text'

        //** app support files
        import { setContext} from 'svelte';
        import PageWrapper from '/imports/both/pageStructure/PageWrapper.svelte'

    //* end of page boilerplate *************************************



    //* page body support **************************
    setContext("pageText", page);

    import TabContent from '/imports/components/widgets/tabbedContent.svelte'
    import Accordian from '/imports/components/widgets/accordian.svelte'

</script>



<PageWrapper {header} >

    <div class="columns">
        <article class="column is-6">
            <TabContent text="tabbed" tabSettings="is-toggle is-fullwidth" />
        </article>

        <article class="column is-6">
            <Accordian text="tabbed" tabSettings="is-warning is-light"  />
        </article>
    </div>

</PageWrapper>
