<script>
    /**
     * Layout for Colours page.
     *
     * @memberof Pages:Colours
     * @function Icons
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
        import {header, page} from './colours_text'

        //** app services (getContext is often optional)
        import { setContext, getContext, onMount, onDestroy } from 'svelte';
        setContext("pageHdr", header);
        setContext("pageText", page);

        //** get the page header common component; component get gets its own translated text from "pageText" context
        import Hdr from '/imports/both/pageStructure/PageHeader.svelte'

    //* end of page boilerplate *************************************



    //* page body support **************************
    import { colors, components, theme } from '/imports/client/setup/systemGlobals'

    let swatches = Object.entries(colors);
    let boxes = Object.entries(components);
    let themes = Object.entries(theme);

</script>



<Hdr />


<section class="page-body">
    <div class="columns">

        <div class="column buffer-large">
            <div class="title is-4">{i18n(page, "swatches", $lang)}</div>

            {#each swatches as swatch}
                <div class="tags has-addons">
                    <span class="tag is-large"
                          style="background-color: {swatch[1]}; color: whitesmoke;">
                        {swatch[1]}
                    </span>

                    <span class="tag is-large">{swatch[0]}</span>
                </div>
            {/each}
        </div>

        <div class="column buffer-large">
            <div class="title is-4">{i18n(page, "boxes", $lang)}</div>

            {#each boxes as box}
                <div class="box {box[1]}">
                    {box[0]}
                </div>
            {/each}
        </div>

        <div class="column buffer-large">
            <div class="title is-4">{i18n(page, "themes", $lang)}</div>

            {#each themes as theme}
                <div class="mb-3">
                    <button class="button is-fullwidth {theme[1]}">
                        {theme[0]}
                    </button>
                </div>
            {/each}
        </div>

    </div>
</section>
