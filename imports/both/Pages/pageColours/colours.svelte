<script>
    /**
     * @summary Layout for Icons page.
     *
     * @memberof Pages:Icons
     * @function icons
     * @locus Client
     *
     */



    //* setup props to receive route data
    export let currentRoute;
    export let params;

    //* app services
    import { setContext } from 'svelte';
    import { getContext } from 'svelte';

    //* get the user language preference from store
    import {i18n} from '/imports/functions/func-i18n'
    import {lang} from '/imports/both/systemStores'

    //* get page text information and set contexts for children components
    import pageText from './colours_text'
    setContext("pageText", pageText);



    //* get the page header common component and
    import Hdr from '/imports/both/pageStructure/PageHeader.svelte'

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
            <div class="title is-4">{i18n(pageText.page, "swatches", $lang)}</div>

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
            <div class="title is-4">{i18n(pageText.page, "boxes", $lang)}</div>

            {#each boxes as box}
                <div class="box {box[1]}">
                    {box[0]}
                </div>
            {/each}
        </div>

        <div class="column buffer-large">
            <div class="title is-4">{i18n(pageText.page, "themes", $lang)}</div>

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
