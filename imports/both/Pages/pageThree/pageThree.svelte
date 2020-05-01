<script>
    /**
     * @summary Layout for Page Three.
     *
     * @memberof Pages:PageThree
     * @function pageThree
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
    import pageText from './pageThree_text'
    setContext("pageText", pageText);

    //* get page text information and set contexts for children components
    import pageConfig from './pageThree_config'
    setContext("pageConfig", pageConfig);

    //* get the page header common component and
    import Hdr from '/imports/client/structure/PageHeader.svelte'



    //* page body support **************************
    import Infobox from '/imports/components/widgets/infobox.svelte'

    let payload = {
        values: [110],
        maxValues: [120]
    };

</script>



<Hdr hdrtext={pageText.header} lang={lng} />


<section class="page-body">

    <div class="columns">

        <div class="column">
            page three insert
            <pre>{JSON.stringify(pageConfig.widgets.infobox, null, 4)} </pre>
        </div>

        <div class="column">
            <Infobox config={pageConfig.widgets.infobox} {payload}/>
        </div>

        <div class="column">

        </div>

    </div>

</section>
