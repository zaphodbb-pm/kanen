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
     *      3. Common page boilerplate imports common page header component used by PageWrapper.
     *      4. Common page boilerplate injects language responsive text into "pageHdr" and "pageText" contexts by PageWrapper.
     *      5. Common page boilerplate injects page component configs into "pageConfig" context by PageWrapper.
     *      6. Page-body contains specific code and html for this page's functionality.
     */


    //* page set-up boilerplate *************************************

        //** setup props to receive route data (optional)
        export let currentRoute;
        export let params;

        //** page specific text and configuration
        import {header, page} from './template_text'
        import {pageConfig} from './template_config'

        //** app support files
        import { setContext, getContext, onMount, onDestroy } from 'svelte';
        import PageWrapper from '/imports/both/pageStructure/PageWrapper.svelte'

    //* end of page boilerplate *************************************



    //* page-body support **************************
    import {lang} from '/imports/client/systemStores'
    import {i18n} from '/imports/functions/i18n'

    let message = "";
    let text = i18n( page, "page", $lang);

    onMount(() => {
        message = "<b>template page</b> mounted";
    });

    onDestroy(() => {
        console.log("template page destroyed");
    });

</script>



<PageWrapper {header} >

    <hr />

    <div class="columns">
        <article class="column">
            <div class="title is-size-5">{text.route}</div>
            <pre>{JSON.stringify(currentRoute, null, 4)}</pre>
        </article>

        <article class="column">
            <div class="title is-size-5">{text.parms}</div>
            <pre>{JSON.stringify(params, null, 4)}</pre>
        </article>

        <article class="column">
            <div class="title is-size-5">{text.config}</div>
            <pre>{JSON.stringify(pageConfig, null, 4)}</pre>
        </article>
    </div>

    <hr />

    <div class="columns">
        <article class="column">
            <div>{message}</div>
            <div>{@html message}</div>
        </article>

        <article class="column">
            <div class="box">
                {@html i18n(page.components, "box", $lang).msg}
            </div>
        </article>
    </div>

</PageWrapper>
