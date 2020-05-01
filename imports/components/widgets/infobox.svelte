<script>

    /**
     * @summary Svelte info block.
     *
     * @memberof Components:Widgets
     * @function infobox
     * @locus Client
     *
     * @param {Object}  config - infobox setup information
     * @param {Object}  payload - values to display
     *
     * @return nothing
     *
     * @example
     * config: Object: used to set up the widget at the start
     *         {
     *            //* static widget text
     *            title: "Big Box 2",             // main title for widget
     *            description: "Big Box",         // more detail
     *            prefix: "$"                     // prefix added to incoming value for display
     *            suffix: "Em",                   // suffix added to incoming value for display
     *            progress: "",                   // if string has length, then show progress bar, else hide
     *            decimals: 1                     // set number of deceimal points to show
     *
     *            //* widget css related decoration
     *            icon: "iconPost,     // widget's icon if needed
     *            height: 12,                     // widget height in "rem"
     *
     *            //* colour controls at selected trigger points
     *            //* background colors for reactive response to values; if String, colour is fixed
     *            bgColours: [
     *                   kanen.constants.BG_HUM,
     *                   kanen.constants.BG_WARN,
     *                   kanen.constants.BG_DANGER
     *               ],
     *            bgNormal: [0, .66],             // percent range of values for normal operation
     *            bgWarning: [.66, .80],          // percent range of values for warning operation
     *          }
     *
     *  payload: {                                      // Object: incoming or outgoing flow-message format from subscribe reactive variable
     *          values: [75],                           // array of values to show
     *          maxValues: [120],                       // array of max values allows for conversion to % progress
     *      },
     */

    //* props
    export let payload = null;
    export let config = null;

    //* get components
    import { getContext } from 'svelte';
    import Icon from 'svelte-awesome/components/Icon.svelte';
    let out = getContext("iconMark");

    //* support functions
    import {toDecimals} from '/imports/functions/func-formatNumbers'
    import {adjustHexColor} from '/imports/functions/func-adjustHexColor'
    import {setBackground} from '/imports/functions/func-setBackground'

    let height = config && config.height ? config.height : 6;

    function progessValue() {
        if (payload) {
            let vals = payload;
            let num = vals && vals.values ? vals.values : 0;
            num = num && Array.isArray(num) ? num[0] : num;

            //*** adjust number of fraction digits
            let decimals = config.decimals ? config.decimals : 1;
            decimals = num && num > 1 ? 1 : decimals;
            decimals = num && num > 100 ? 0 : decimals;

            return toDecimals(num, decimals);
        } else {
            return 0;
        }
    }


    function progBarVal() {
        if (payload) {
            let vals = payload;
            let denom = vals && vals.maxValues ? vals.maxValues : 1;
            denom = denom && Array.isArray(denom) ? denom[0] : denom;
            let pc = Math.round(progessValue() / denom * 100);
            return {width: pc + "%", style: `width: ${pc}%`}
        } else {
            return {width: 0, style: `width: 0%`};
        }
    }

    function styleBoxFront() {
        let scale = !!config.progress ? 4.9 : 3.5;
        let bg = !!config.progress ? setBG() : "#F8F8F8";

        return `background: ${bg};
                font-size: ${Math.round(height / scale *100) / 100}rem;
                color: ${adjustHexColor(bg, 0).text}`
    }

    function styleIcon() {
        return `height: ${height}rem; width: ${height}rem;
            background-color: ${!!config.progress ? "" : setBG()};`
    }

    function setBG() {
        return setBackground(config, payload, progessValue() );
    }

</script>



<div class="infobox">

    <div class="style-box-front styleBoxFront" style="{styleBoxFront()}">

        <div class="style-box-icon" style="{styleIcon()}">
            <Icon data={getContext(config.icon)} scale="{height / 2}"/>
        </div>

        <div class="info-content">
            <div class="info-label has-text-centered"><b>{config.title}</b></div>
            <div class="info-value has-text-centered"><b>{config.prefix}{progessValue()}{config.suffix}</b></div>

            {#if config.progress}
                <div>
                    <div class="progress-box">
                        <div class="progress-bar" style="{progBarVal().style}"></div>
                    </div>

                    <div class="progress-label">{progBarVal().width} {config.progress}</div>
                </div>
            {/if}
        </div>

    </div>

</div>

<!--
    <div class="vue-infobox">

        <div class="style-box-front" v-bind:style="styleBoxFront">

            <div class="style-box-icon" v-bind:style="styleIcon">
                <i v-bind:class="config.icon"></i>
            </div>

            <div class="info-content">
                <div class="info-label has-text-centered"><b>{{config.title}}</b></div>
                <div class="info-value has-text-centered"><b>{{config.prefix}}{{progessValue}}{{config.suffix}}</b>
                </div>

                <div v-if="config.progress">
                    <div class="progress-box">
                        <div class="progress-bar" v-bind:style="progBarVal"></div>
                    </div>

                    <div class="progress-label">{{progBarVal.width}} {{config.progress}}</div>
                </div>
            </div>

        </div>
    </div>

-->




<style>

    .style-box-front {
        display: flex;
    }

    .style-box-icon {
        display: flex;
        justify-content: center;
        align-items: center;
        color: #FFFFFF;
        background-color: rgba(0, 0, 0, 0.2);
    }

    .info-content {
        flex-grow: 1;
        color: inherit;
    }

    .info-label {
        font-size: calc(0.9rem + 0.1em);
        padding-left: 0.5rem;
        padding-top: 0.5rem;
        white-space: nowrap;
        overflow: hidden;
        color: inherit;
    }

    .info-value {
        padding-left: 0.5rem;
        white-space: nowrap;
        overflow: hidden;
        color: inherit;
    }

    .progress-box {
        width: 100%;
        margin-top: 0.25em;
        background-color: rgba(0, 0, 0, 0.2);
    }

    .progress-bar {
        height: 0.25rem;
        background-color: white;
    }

    .progress-label {
        font-size: calc(0.8rem + 0.1em);
        padding-top: 0.25em;
        padding-left: 0.5rem;
        white-space: nowrap;
        overflow: hidden;
        color: #FFF;
    }
</style>
