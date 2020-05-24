<script>

    /**
     * Progress bar block vertical or horizontal.
     *
     * @memberof Components:Widgets
     * @function progressBars
     * @locus Client
     *
     * @param {Object}  text - widget text strings
     * @param {Object}  config - widget setup information
     * @param {Object}  payload - widget values to display
     *
     *
     * @return nothing
     *
     * @example
     * config: Object: used to set up the widget at the start
     *         {
     *            //* static widget text
     *            suffix: "%",                    // suffix added to incoming value for display
     *
     *            //* widget css related decoration
     *            height: 12,                     // widget height in "rem" for vertical bars
     *            orient: "horz",                 // show bars horizontally
     *            barSize:  "1rem",               // progress bar height ot width
     *
     *          //* colour controls at selected trigger points
     *          //* if array, background colors for reactive response to values; if String, colour is fixed
     *          bgColours: [NORMAL, WARN, DANGER],
     *          bgNormal: [0, .66],             // percent range of values for normal operation
     *          bgWarning: [.66, .80],          // percent range of values for warning operation
     *          }
     *
     */

    //* support functions
    import {toDecimals} from '/imports/functions/formatNumbers'
    import {adjustHexColor} from '/imports/functions/adjustHexColor'
    import {setBackground} from '/imports/functions/setBackground'

    //* props
    export let text = {};
    export let config = {};
    export let payload = null;

    let height = config && config.height ? config.height : 6;

    let vert = config && config.orient === "vert";

    let bars = barsBuilder();

    function barsBuilder(){
        //** get decorative items or apply defaults
        let bg = "#F8F8F8";
        let suffix = config.suffix ? config.suffix : "";
        let bgBar = config.bgColours ? config.bgColours : [bg];
        let size = config.barSize ? config.barSize : "0.5rem";
        let height = config.height ? config.height : 8;

        if (payload && payload.values) {
            let values = payload.values;
            let maxVals = payload.maxValues;
            let labels = text.labels ? text.labels : ["no label"];

            return labels.map(function (item, idx) {
                let value = values[idx] ? values[idx] : 0;
                let maxVal = maxVals[idx] ? maxVals[idx] : value;
                let background = bgBar[idx] ? bgBar[idx] : bgBar[0];
                let bar = Math.round(value / maxVal * 100);

                if (vert) {
                    return {
                        height: height + "rem",
                        label: item,
                        value: bar,
                        bar: `height: ${bar}%; width: ${size}; background-color: ${background}`,
                        barRest: `height: (100 - ${bar})%; width: ${size}; background-color: ${bg}`,
                        barLabel: `text-align: "center";`,
                        suffix: suffix,
                    }
                } else {
                    return {
                        label: item,
                        value: bar,
                        bar: `width: ${bar}%; height: ${size}; background-color: ${background}`,
                        barRest: `width: (100 - ${bar})%; height: ${size}; background-color: ${bg}`,
                        barLabel: `margin-right: 0.5rem; width: 20%; overflow: hidden; text-align: right`,
                        suffix: suffix,
                    }
                }
            });
        }else{
            return [{}];
        }
    }

</script>



<div class="progress-bars" class:bars-vert={vert}>
    {#each bars as bar, idx}

        {#if vert}
            <div class="bar-display" style="height: {bar.height}">
                <div style={bar.barLabel}>{bar.label}</div>
                <div class="bar-meter" style={bar.bar}></div>
                <div class="bar-meter" style={bar.barRest}></div>

                {#if bar.suffix}
                    <div class="bar-suffix">{bar.value}{bar.suffix}</div>
                {/if}
            </div>

        {:else}

            <div>{bar.label}</div>

            <div class="progress-bar">
                <div class="bar-meter" style={bar.bar}></div>
                <div class="bar-meter" style={bar.barRest}></div>

                {#if bar.suffix}
                    <div class="bar-suffix">{bar.value}{bar.suffix}</div>
                {/if}
            </div>

        {/if}

    {/each}
</div>



<style>

    .progress-bars {
        width: 100%;
    }

    .bars-vert {
        display: flex;
        justify-content: center;
    }

    .bar-display {
        height: 12rem;
        display: flex;
        flex-direction: column-reverse;
        align-items: center;
        padding: 0 0.5rem;
    }

    .progress-bar {
        width: 100%;
        display: flex;
        margin: 0 0 1rem 0;
        align-items: center;
        line-height: 1em;
        font-size: 1em;
    }

    .bar-suffix {
        margin-left: 0.5rem;
    }

</style>
