<script>
    /**
     * Layout for Template page.
     *
     * @memberof Pages:Template
     * @function template
     * @locus Client
     *
     * @notes
     *      1. Main code for page control: page boilerplate and page body sections.
     *      2. Common page boilerplate has two props: currentRoute and params from spa-router for rendering.
     *      3. Common page boilerplate injects language responsive text into "pageHdr" and "pageText" contexts.
     *      4. Common page boilerplate injects page component configs into "pageConfig" context.
     *      5. Common page boilerplate imports common page header component
     *      6. Page-body contains specific code and html for this page's functionality.
     */


    //* page set-up boilerplate *************************************

        //** setup props to receive route data
        export let currentRoute;
        export let params;

        //** get page text information and set contexts for children components
        import {i18n} from '/imports/functions/i18n'
        import {lang} from '/imports/client/systemStores'
        import {header, page} from './template_text'

        //** app services (getContext is often optional)
        import { setContext, getContext, onMount, onDestroy } from 'svelte';
        setContext("pageHdr", header);
        setContext("pageText", page);

        //** (optional) get component configuration information and set contexts for children components
        import pageConfig from './template_config'
        setContext("pageConfig", pageConfig);

        //** get the page header common component; component get gets its own translated text from "pageText" context
        import Hdr from '/imports/both/pageStructure/PageHeader.svelte'

    //* end of page boilerplate *************************************



    //* page-body support **************************

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
