<script>
    /**
     * @summary Layout for Page Three.
     *
     * @memberof Pages:PageThree
     * @function pageThree
     * @locus Client
     *
     */

    //* setup props to receive route data
    export let currentRoute;
    export let params;

    //* get the user language preference from store
    import {i18n} from '/imports/functions/func-i18n'
    import {lang} from '/imports/client/structure/systemStores'
    let lng = $lang;

    //* app services
    import { setContext } from 'svelte';
    import { getContext } from 'svelte';

    //* get page text information and set contexts for children components
    import pageText from './pageThree_text'
    setContext("pageText", pageText);

    //* get page text information and set contexts for children components
    import pageConfig from './pageThree_config'
    setContext("pageConfig", pageConfig);

    //* get the page header common component and
    import Hdr from '/imports/client/structure/PageHeader.svelte'



    //* page body support **************************
    import Expander from '/imports/components/widgets/expanderSlot.svelte'
    let expander1Text =  i18n(pageText.components, "expander1", lng);
    let expander2Text =  i18n(pageText.components, "expander2", lng);

    import Infobox from '/imports/components/widgets/infobox.svelte'
    let infoboxText =  i18n(pageText.components, "infobox", lng);

    let payload = {
        values: [47.56],
        maxValues: [120]
    };

    import ProgBars from '/imports/components/widgets/progressBars.svelte'
    let progbarText =  i18n(pageText.components, "progExample", lng);

    let plBars = {
        values: [23, 47, 92],
        maxValues: [100, 100, 100],
    }

    import Gauge from '/imports/components/widgets/gauge.svelte'
    let guage1Text =  i18n(pageText.components, "gaugeRing", lng);
    let guage2Text =  i18n(pageText.components, "gaugePie", lng);

    let g1 = {
        values: [95],
        maxValues: [120],
    };

    let g2 = {
        values: [70],
        maxValues: [120],
    };

</script>



<Hdr hdrtext={pageText.header} lang={lng} />


<section class="page-body">

    <div class="columns">

        <div class="column buffer-large">
            <div class="title is-4">{i18n(pageText.page, "col1", lng)}</div>

            <div style="height: 210px;">
                <Infobox text={infoboxText} config={pageConfig.widgets.infobox} {payload} />
            </div>

            <div class="mt-3">
                <Expander text={expander1Text} tabSettings="has-border-maroon">
                    <pre>{JSON.stringify(payload, null, 4)}</pre>
                </Expander>
            </div>

            <div class="mt-2">
                <Expander text={expander2Text} tabSettings="has-border-teal">
                    <pre class="mt-3">{JSON.stringify(pageConfig.widgets.infobox, null, 4)}</pre>
                </Expander>
            </div>

        </div>

        <div class="column  buffer-large">
            <div class="title is-4">{i18n(pageText.page, "col2", lng)}</div>

            <div style="height: 210px;">
                <ProgBars text={progbarText} config={pageConfig.widgets.progressBars} payload={plBars} />
            </div>

            <div class="mt-3">
                <Expander text={expander1Text} tabSettings="has-border-maroon">
                    <pre>{JSON.stringify(plBars, null, 4)}</pre>
                </Expander>
            </div>

            <div class="mt-2">
                <Expander text={expander2Text} tabSettings="has-border-teal">
                    <pre class="mt-3">{JSON.stringify(pageConfig.widgets.progressBars, null, 4)}</pre>
                </Expander>
            </div>
        </div>

        <div class="column  buffer-large">
            <div class="title is-4">{i18n(pageText.page, "col3", lng)}</div>

            <div class="columns" style="height: 210px;">
                <div class="column">
                    <Gauge text={guage1Text} config={pageConfig.widgets.gauge1} payload={g1} />
                </div>

                <div class="column">
                    <Gauge text={guage2Text} config={pageConfig.widgets.gauge2} payload={g2} />
                </div>
            </div>

            <div class="mt-4">
                <Expander text={expander1Text} tabSettings="has-border-maroon">
                    <pre>{JSON.stringify(g1, null, 4)}</pre>
                </Expander>
            </div>

            <div class="mt-2">
                <Expander text={expander2Text} tabSettings="has-border-teal">
                    <pre class="mt-3">{JSON.stringify(pageConfig.widgets.gauge1, null, 4)}</pre>
                </Expander>
            </div>
        </div>

    </div>

</section>
