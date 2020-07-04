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

        //** setup props to receive route data (optional)
        export let currentRoute;
        export let params;

        //** page specific text and configuration
        import {header, page} from './colours_text'

        //** app support files
        import PageWrapper from '/imports/both/pageStructure/PageWrapper.svelte'

    //* end of page boilerplate *************************************


    //* page body support **************************
    import {i18n} from '/imports/functions/i18n'
    import {lang} from '/imports/client/systemStores'

    import { colors, components, theme } from '/imports/both/systemGlobals'

    let swatches = Object.entries(colors);
    let boxes = Object.entries(components);
    let themes = Object.entries(theme);

</script>




<PageWrapper {header} >

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

</PageWrapper>
