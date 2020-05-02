<script>

    /**
     * Svelte info block.
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
     *      {
     *          decimals: 1                     // set number of decimal points to show
     *
     *          //* widget css related decoration
     *          icon: "iconPost,                // widget's icon if needed
     *          height: 12,                     // widget height in "rem"
     *
     *          //* colour controls at selected trigger points
     *          //* if array, background colors for reactive response to values; if String, colour is fixed
     *          bgColours: [NORMAL, WARN, DANGER],
     *          bgNormal: [0, .66],             // percent range of values for normal operation
     *          bgWarning: [.66, .80],          // percent range of values for warning operation
     *      }
     *
     * text: static widget text object
     *      {
     *          title: "Big Box 2",             // main title for widget
     *          barText: "",                    // if string has length, then show progress bar, else hide
     *          prefix: "$"                     // prefix added to incoming value for display
     *          suffix: "Em",                   // suffix added to incoming value for display
     *      }
     *
     * payload:
     *      {                                   // Object: incoming or outgoing flow-message format from subscribe reactive variable
     *          values: [75],                   // array of values to show
     *          maxValues: [120],               // array of max values allows for conversion to % progress
     *      },
     */


    //* get accessory components
    import { getContext } from 'svelte';
    import Icon from 'svelte-awesome/components/Icon.svelte';

    //* support functions
    import {toDecimals} from '/imports/functions/func-formatNumbers'
    import {adjustHexColor} from '/imports/functions/func-adjustHexColor'
    import {setBackground} from '/imports/functions/func-setBackground'

    //* props
    export let text = {};
    export let config = {};
    export let payload = null;

    let height = config && config.height ? config.height : 6;

    //* component controls
    function styleBox() {
        let scale = !!text.barText ? 4.9 : 3.5;
        let bg = !!text.barText ? setBG() : "#F8F8F8";

        return `background: ${bg}; color: ${adjustHexColor(bg, 0).text};
                font-size: ${Math.round(height / scale * 100) / 100}rem;`
    }

    function styleIcon() {
        return `height: ${height}rem; width: ${height}rem; background-color: ${!!text.barText ? "" : setBG()};`
    }

    function setBG() {
        return setBackground(config, payload, progessValue() );
    }

    function progessValue() {
        if (payload) {
            let num = payload.values ? payload.values : 0;
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
            let denom = payload.maxValues ? payload.maxValues : 1;
            denom = denom && Array.isArray(denom) ? denom[0] : denom;
            let pc = Math.round(progessValue() / denom * 100);
            return {width: pc + "%", style: `width: ${pc}%`}
        } else {
            return {width: 0, style: `width: 0%`};
        }
    }

</script>




<div class="infobox d-flex" style="{styleBox()}">

    <div class="style-box-icon" style="{styleIcon()}">
        <Icon data={getContext(config.icon)} scale="{height * 0.75}"/>
    </div>

    <div class="info-content">
        <div class="info-label has-text-centered"><b>{text.title}</b></div>
        <div class="info-value has-text-centered"><b>{text.prefix}{progessValue()}{text.suffix}</b></div>

        {#if text.barText}
            <div>
                <div class="progress-box">
                    <div class="progress-bar" style="{progBarVal().style}"></div>
                </div>

                <div class="progress-label">{progBarVal().width} {text.barText}</div>
            </div>
        {/if}
    </div>

</div>




<style>

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
