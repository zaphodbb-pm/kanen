<script>
    /**
     * @summary Layout for Page Three.
     *
     * @memberof Pages:PageThree
     * @function pageThree
     * @locus Client
     *
     */

    //* common page setup information

    //** get the user language preference from store
    import {lang} from '/imports/client/structure/systemStores'
    let lng = $lang;

    //** app services
    import { setContext } from 'svelte';

    //** get page text information and set contexts for children components
    import pageText from './pageThree_text'
    setContext("pageText", pageText);

    //** get the page header common component and
    //** page specific insert component (does all of the real work for the page)
    import Hdr from '/imports/client/structure/PageHeader.svelte'
    import PageInsert from './pageThree_insert.svelte'

    //** setup props to receive route data
    export let currentRoute;
    export let params;

</script>



<Hdr lang={lng} />

<section class="page-insert-layout">
    <PageInsert lang={lng} />
</section>
