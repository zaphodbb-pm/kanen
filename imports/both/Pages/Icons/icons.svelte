<script>
    /**
     * Layout for Icons page.
     *
     * @memberof Pages:Icons
     * @function Icons
     * @locus Client
     *
     */


    //* page set-up boilerplate *************************************

        //** setup props to receive route data (optional)
        export let currentRoute;
        export let params;

        //** page specific text and configuration
        import {header, page} from './icons_text'

        //** app support files
        import PageWrapper from '/imports/both/pageStructure/PageWrapper.svelte'

    //* end of page boilerplate *************************************


    //* page body support **************************
    import {i18n} from '/imports/functions/i18n'
    import {lang} from '/imports/client/systemStores'

    import {mainIcons} from '/imports/client/setup/systemIcons'
    import Icon from '/imports/components/elements/icon.svelte'

    //** get list of Icons and sort list ascending
    let allIcons = Object.entries(mainIcons);
    allIcons = allIcons.sort( (a,b) => a[0] > b[0] ? 1 : (a[0] < b[0] ? -1 : 0) );

</script>



<PageWrapper {header} >

    <div class="content is-family-secondary">{i18n(page.page, "count", $lang) + allIcons.length}</div>

    <div class="columns is-mobile is-multiline">
        {#each allIcons as icon}

            <div class="column is-half-mobile is-one-quarter-tablet is-narrow-desktop">
                <div class="buffer">
                    <div><b>{icon[0]}</b></div>

                    <div class="d-flex align-items-center">
                        <Icon icon={icon[1]} class="ml-2 is-size-6" />
                        <Icon icon={icon[1]} class="ml-2 text-1dot2rem has-text-info" />
                        <Icon icon={icon[1]} class="ml-2 is-size-4 has-text-link" />
                        <Icon icon={icon[1]} class="ml-2 is-size-2 has-text-primary" />
                    </div>

                    <div>{icon[1].iconName + ".json"}</div>
                </div>
            </div>

        {/each}
    </div>

</PageWrapper>
