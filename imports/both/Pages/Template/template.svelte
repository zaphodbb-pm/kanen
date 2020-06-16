<script>
    /**
     * Layout for Template page.
     *
     * @memberof Pages:Template
     * @function template
     * @locus Client
     *
     */


    //* page set-up boilerplate *************************************

    //** setup props to receive route data
    export let currentRoute;
    export let params;

    //** app services (getContext is often optional)
    import { setContext } from 'svelte';

    //** get the user language preference from store (optional)
    import {i18n} from '/imports/functions/i18n'
    import {lang} from '/imports/client/systemStores'

    //** get page text information and set contexts for children components
    import {header, page} from './template_text'

    setContext("pageHdr", header);
    setContext("pageText", page);

    //** get component configuration information and set contexts for children components
    import pageConfig from './template_config'
    setContext("pageConfig", pageConfig);

    //** get the page header common component; component get gets its own translated text from "pageText" context
    import Hdr from '/imports/both/pageStructure/PageHeader.svelte'

    //****************************************************************



    //* page-body support **************************
    import {onMount, onDestroy} from 'svelte'
    import TabContent from '/imports/components/widgets/tabbedContent.svelte'

    let message = "";

    onMount( () => {
        message = "<b>template page</b> mounted";
    });

    onDestroy( () => {
        console.log("template page destroyed");
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
                {@html i18n(page.components, "box", $lang)}
            </div>
        </article>
    </div>

</section>
