<script>
    /**
     * @summary Layout for Page Widgets.
     *
     * @memberof Pages:Widgets
     * @function widgets
     * @locus Client
     *
     */


    //* page set-up boilerplate *************************************

        //** setup props to receive route data (optional)
        export let currentRoute;
        export let params;

        //** page specific text and configuration
        import {header, page} from './widgets_text'
        import {pageConfig} from './widgets_config'

        //** app support files
        import { setContext, getContext, onMount, onDestroy } from 'svelte';
        import PageWrapper from '/imports/both/pageStructure/PageWrapper.svelte'

    //* end of page boilerplate *************************************



    //* page body support **************************
    import {lang} from '/imports/client/systemStores'
    import {i18n} from '/imports/functions/i18n'
    let lng = $lang;
    setContext("pageText", page);
    setContext("pageConfig", pageConfig);

    import Expander from '/imports/components/widgets/expanderSlot.svelte'
    let expander1Text =  i18n(page.components, "expander1", lng);
    let expander2Text =  i18n(page.components, "expander2", lng);

    import Infobox from '/imports/components/widgets/infobox.svelte'
    let infoboxText =  i18n(page.components, "infobox", lng);
    let infoboxText2 =  i18n(page.components, "infobox2", lng);

    let payload = {
        values: [47.56],
        maxValues: [120]
    };

    import ProgBars from '/imports/components/widgets/progressBars.svelte'
    let progbarText =  i18n(page.components, "progExample", lng);

    let plBars = {
        values: [23, 47, 92],
        maxValues: [100, 100, 100],
    }

    import Gauge from '/imports/components/widgets/gauge.svelte'
    let guage1Text =  i18n(page.components, "gaugeRing", lng);
    let guage2Text =  i18n(page.components, "gaugePie", lng);

    let g1 = {
        values: [95],
        maxValues: [120],
    };

    let g2 = {
        values: [70],
        maxValues: [120],
    };

    import SquareBox from '/imports/components/widgets/squareBox.svelte'
    let sbText =  i18n(page.components, "squarebox", lng);
    let sb = {values: [95]};

    import BigBox from '/imports/components/widgets/bigInfobox.svelte'
    let bigText =  i18n(page.components, "bigInfobox", lng);
    let bigPayload = {values: [55], maxValues: [120],};

</script>



<PageWrapper {header} >

    <div class="columns is-desktop mt-5">

        <div class="column buffer-large">
            <div class="title is-4">{i18n(page.page, "col1", lng)}</div>

            <div class="columns">
                <div class="column">
                    <div class="set-height">
                        <Infobox text={infoboxText2} config={pageConfig.widgets.infobox2} {payload} />
                    </div>

                    <div class="mt-2">
                        <Expander text="expander1" tabSettings="has-border-maroon">
                            <pre>{JSON.stringify(payload, null, 4)}</pre>
                        </Expander>
                    </div>

                    <div class="mt-2">
                        <Expander text="expander2" tabSettings="has-border-teal">
                            <pre class="mt-3">{JSON.stringify(pageConfig.widgets.infobox2, null, 4)}</pre>
                        </Expander>
                    </div>
                </div>

                <div class="column">
                    <div class="set-height">
                        <Infobox text={infoboxText} config={pageConfig.widgets.infobox} {payload} />
                    </div>

                    <div class="mt-2">
                        <Expander text="expander1" tabSettings="has-border-maroon">
                            <pre>{JSON.stringify(payload, null, 4)}</pre>
                        </Expander>
                    </div>

                    <div class="mt-2">
                        <Expander text="expander2" tabSettings="has-border-teal">
                            <pre class="mt-3">{JSON.stringify(pageConfig.widgets.infobox, null, 4)}</pre>
                        </Expander>
                    </div>
                </div>
            </div>
        </div>

        <div class="column buffer-large">
            <div class="title is-4">{i18n(page.page, "col4", lng)}</div>

            <div class="columns">
                <div class="column">
                    <div class="set-height">
                        <SquareBox text={sbText} config={pageConfig.widgets.squarebox} payload={sb} />
                    </div>

                    <div class="mt-2">
                        <Expander text="expander1" tabSettings="has-border-maroon">
                            <pre>{JSON.stringify(sb, null, 4)}</pre>
                        </Expander>
                    </div>

                    <div class="mt-2">
                        <Expander text="expander2" tabSettings="has-border-teal">
                            <pre class="mt-3">{JSON.stringify(pageConfig.widgets.squarebox, null, 4)}</pre>
                        </Expander>
                    </div>

                </div>

                <div class="column">
                    <div class="set-height">
                        <BigBox text={bigText} config={pageConfig.widgets.biginfo} payload={bigPayload} />
                    </div>

                    <div class="mt-2">
                        <Expander text="expander1" tabSettings="has-border-maroon">
                            <pre>{JSON.stringify(bigPayload, null, 4)}</pre>
                        </Expander>
                    </div>

                    <div class="mt-2">
                        <Expander text="expander2" tabSettings="has-border-teal">
                            <pre class="mt-3">{JSON.stringify(pageConfig.widgets.biginfo, null, 4)}</pre>
                        </Expander>
                    </div>
                </div>
            </div>

        </div>

    </div>


    <div class="columns is-desktop mt-5">
        <div class="column buffer-large">
            <div class="title is-4">{i18n(page.page, "col3", lng)}</div>

            <div class="columns">
                <div class="column">
                    <div class="set-height">
                        <Gauge text={guage1Text} config={pageConfig.widgets.gauge1} payload={g1} />
                    </div>

                    <div class="mt-2">
                        <Expander text="expander1" tabSettings="has-border-maroon">
                            <pre>{JSON.stringify(g1, null, 4)}</pre>
                        </Expander>
                    </div>

                    <div class="mt-2">
                        <Expander text="expander2" tabSettings="has-border-teal">
                            <pre class="mt-3">{JSON.stringify(pageConfig.widgets.gauge1, null, 4)}</pre>
                        </Expander>
                    </div>

                </div>

                <div class="column">
                    <div class="set-height">
                        <Gauge text={guage2Text} config={pageConfig.widgets.gauge2} payload={g2} />
                    </div>

                    <div class="mt-2">
                        <Expander text="expander1" tabSettings="has-border-maroon">
                            <pre>{JSON.stringify(g2, null, 4)}</pre>
                        </Expander>
                    </div>

                    <div class="mt-2">
                        <Expander text="expander2" tabSettings="has-border-teal">
                            <pre class="mt-3">{JSON.stringify(pageConfig.widgets.gauge2, null, 4)}</pre>
                        </Expander>
                    </div>
                </div>
            </div>
        </div>

        <div class="column buffer-large">
            <div class="title is-4">{i18n(page.page, "col2", lng)}</div>

            <div class="columns">
                <div class="column">
                    <div class="set-height">
                        <ProgBars text={progbarText} config={pageConfig.widgets.progressBars} payload={plBars} />
                    </div>

                    <div class="mt-2">
                        <Expander text="expander1" tabSettings="has-border-maroon">
                            <pre>{JSON.stringify(plBars, null, 4)}</pre>
                        </Expander>
                    </div>

                    <div class="mt-2">
                        <Expander text="expander2" tabSettings="has-border-teal">
                            <pre class="mt-3">{JSON.stringify(pageConfig.widgets.progressBars, null, 4)}</pre>
                        </Expander>
                    </div>
                </div>

                <div class="column">
                    <div class="set-height">
                        <ProgBars text={progbarText} config={pageConfig.widgets.progressBars2} payload={plBars} />
                    </div>

                    <div class="mt-2">
                        <Expander text="expander1" tabSettings="has-border-maroon">
                            <pre>{JSON.stringify(plBars, null, 4)}</pre>
                        </Expander>
                    </div>

                    <div class="mt-2">
                        <Expander text="expander2" tabSettings="has-border-teal">
                            <pre class="mt-3">{JSON.stringify(pageConfig.widgets.progressBars2, null, 4)}</pre>
                        </Expander>
                    </div>
                </div>
            </div>
        </div>

    </div>

</PageWrapper>


<style>

    .set-height {
        height: 12rem;
    }

</style>
