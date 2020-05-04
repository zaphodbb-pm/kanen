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

    //* get the user language preference from store
    import {lang} from '/imports/client/structure/systemStores'
    let lng = $lang;

    //* app services
    import { setContext } from 'svelte';
    import { getContext } from 'svelte';

    //* get page text information and set contexts for children components
    import pageText from './icons_text'
    setContext("pageText", pageText);

    //* get the page header common component and
    import Hdr from '/imports/client/structure/PageHeader.svelte'

    //* page body support **************************
    import {mainIcons} from '/imports/client/setup/systemIcons'
    import Icon from '/imports/components/elements/icon.svelte'

    let allIcons = Object.entries(mainIcons);

</script>



<Hdr hdrtext={pageText.header} lang={lng} />


<section class="page-body">

    <div class="columns is-multiline">
        {#each allIcons as icon}

            <div class="column is-6">
                <div class="d-flex align-items-center mb-3">
                    <span><b>{icon[0]}</b> is {icon[1].iconName}: </span>

                    <Icon icon={icon[1]} class="ml-2 is-size-6" />
                    <Icon icon={icon[1]} class="ml-2 is-size-4 has-text-link" />
                    <Icon icon={icon[1]} class="ml-2 is-size-2 has-text-primary" />
                </div>
            </div>

        {/each}
    </div>

</section>
