<script>
    /**
     * @summary Layout insert for Home page.
     *
     * @memberof Pages:Home
     * @function home_insert
     * @locus Client
     *
     */

    //* page set-up boilerplate *************************************

        //** setup props to receive route data
        export let currentRoute;
        export let params;

        //** get page text information and set contexts for children components
        import {lang} from '/imports/client/systemStores'
        import {header, page} from './home_text'

        //** app services
        import { setContext, getContext } from 'svelte';
        setContext("pageHdr", header);
        setContext("pageText", page);

        //** get the page header common component; component get gets its own translated text
        import Hdr from '/imports/both/pageStructure/PageHeader.svelte'

    //* end of page boilerplate *************************************



    //* page body support **************************
    import {i18n} from '/imports/functions/i18n'
    let pageText = i18n(page, "page", $lang);
    import TabContent from '/imports/components/widgets/tabbedContent.svelte'


</script>



<Hdr />


<section class="page-body">

    <section class="buffer-y-large">
        <div class="columns is-vcentered">
            <div class="column">
                <div class="lead content">{@html pageText.intro}</div>
            </div>

            <div class="column">
                <figure class="mb-3 has-text-right">
                    <img src="/home-page.jpg" class="" style="max-width: 200rem;">
                </figure>
            </div>
        </div>
    </section>

    <section class="buffer-y-large">
        <article class="message">
            <div class="message-body">
                {@html pageText.quote}
            </div>
        </article>
    </section>

    <section class="buffer-y-large">
        <div class="columns">

            <div class="column">
                <div class="box content">
                    <h1 class="title is-size-4 has-text-centered has-text-info">{pageText.philosophy.title}</h1>

                    <ul>
                        {#each pageText.philosophy.body as item}
                            <li class="mb-2">
                                {item}
                            </li>
                        {/each}
                    </ul>
                </div>

                <div class="box content">
                    <h1 class="title is-size-4 has-text-centered has-text-info">{pageText.packages.title}</h1>

                    <ul>
                        {#each pageText.packages.body as item}
                            <li class="mb-2">
                                {item}
                            </li>
                        {/each}
                    </ul>
                </div>
            </div>

            <div class="column is-7">
                <div class="box content">
                    <h1 class="title is-size-4 has-text-centered has-text-info">{pageText.features.title}</h1>

                    <ul>
                        {#each pageText.features.body as item}
                            <li class="mb-2 {item ? '' : 'noDecoration'}" >
                                {item}
                            </li>
                        {/each}
                    </ul>
                </div>
            </div>
        </div>
    </section>

    <section class="buffer-y-large">
        <div class="title is-size-4 has-text-info">{pageText.explore}</div>
        <TabContent text="tabbed" tabSettings="is-fullwidth" />
    </section>

    <section class="buffer-y-large">
        <div class="title is-size-4 has-text-info">{pageText.defTitle}</div>
        <div class="content">{@html pageText.definition}</div>
    </section>

</section>


<style>
    .noDecoration {
        list-style-type: none;
        height: 1rem;
    }
</style>
