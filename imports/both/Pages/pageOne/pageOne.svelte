<script>
    /**
     * @summary Layout for Page One.
     *
     * @memberof Pages:PageOne
     * @function pageOne
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
    import pageText from './pageOne_text'
    setContext("pageText", pageText);

    //* get the page header common component and
    import Hdr from '/imports/client/structure/PageHeader.svelte'

    //* page body support **************************
    import Icon from 'svelte-awesome/components/Icon.svelte';
    let out = getContext("iconMark");



</script>



<Hdr lang={lng} />


<section class="page-body">
    <div>lang: {lng}</div>

    <div class="d-flex align-items-center" style="font-size: 3rem;">
        <Icon data={out} scale="3"/>
        <span>svelte-icons</span>
    </div>

    <div class="d-flex align-items-center has-text-blue-dark">
        <Icon data={getContext("iconNotify")} class="icon"/>
        <span>Svelte-Icons</span>
    </div>

</section>
