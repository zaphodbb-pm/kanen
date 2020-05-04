<script>

    /**
     * @summary Circular gauge widget.
     *
     * @memberof Components:Widgets
     * @function gauge
     * @locus Client
     *
     * @param {Object}  text - widget text
     * @param {Object}  config - widget setup information
     * @param {Number}  payload - value to display
     *
     * @return nothing
     *
     * @example
     * config: Object: used to set up the widget at the start
     *      {
     *          suffix: "%",                    // suffix added to incoming value for display
     *
     *          //* widget css related decoration
     *          height: 16,                     // widget height in "rem"
     *          style: "pie",                   // "ring" or "pie"
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
     *            title: "Gauge",                 // main title for widget
     *            description: "Circular gauge",  // more detail
     *      }
     *
     *  payload: {                                      // Object: incoming or outgoing flow-message format from subscribe reactive variable
     *          values: [75],                           // array of values to show
     *          maxValues: [120],                       // array of max values allows for conversion to % progress
     *      },
     */

    //* support functions
    import {toDecimals} from '/imports/functions/func-formatNumbers'
    import {adjustHexColor} from '/imports/functions/func-adjustHexColor'
    import {setBackground} from '/imports/functions/func-setBackground'

    //* props
    export let text = {};
    export let config = {};
    export let payload = null;

    let bar = barBuilder();

    function progessValue() {
        if (payload) {
            let num = payload.values ? payload.values : 0;
            num = num && Array.isArray(num) ? num[0] : num;
            return toDecimals(num, 1);
        } else {
            return 0;
        }
    }

    function barBuilder() {
        //** get decorative items or apply defaults
        let style = config.style ? config.style : "ring"; // ring or pie
        let labels = config.title ? [config.title] : [""];
        let suffix = config.suffix ? config.suffix : "";
        let height = config.height ? config.height : 8;
        let font = height / 5 + "rem";

        if (payload && payload.values) {
            let values = payload.values[0];
            let maxVals = payload.maxValues[0];
            let background = setBackground(config, payload, progessValue() );

            let value = values ? values : 0;
            let maxVal = maxVals ? maxVals : value;
            value = value < maxVal ? value : maxVal;

            let bar = Math.round(value / maxVal * 100);
            let bgBar = style === "ring" ? "#dde3e7" : "#FFF";

            return {
                label: labels[0],
                value: bar,
                suffix: suffix,
                style: style,
                ring: `background: conic-gradient(${background} ${bar}%, ${bgBar} 0%);
                    font-size: ${font}; height: ${height}rem; width: ${height}rem`
            }
        } else {
            return {
                label: "",
                value: 0,
                suffix: "%",
                style: "pie",
                ring: `font-size: ${font}; height: ${height}rem; width: ${height}rem`
            }
        }
    }

</script>



<div class="gauge">
    <div class="gauge-wrapper">

        <div class="gauge" style={bar.ring}>
            <div class="center {bar.style}">
                <div class="value">{bar.value}<span class="suffix">{bar.suffix}</span></div>
            </div>
        </div>

        <div class="label">{text.title}</div>
        <div class="description">{text.description}</div>

    </div>
</div>



<style>

    .gauge-wrapper {
        height: 100%;
        width: 100%;

        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .gauge-wrapper .gauge {
        clip-path: circle(47%);
    }

    .gauge-wrapper .gauge .center {
        position: relative;
        clip-path: circle(47%);
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bolder;
    }

    .gauge .ring {
        color: #6f7c7d;
        height: 80%;
        width: 80%;
        top: 10%;
        left: 10%;
        background-color: #FFF;
    }

    .gauge .pie {
        color: #FFF;
        height: 75%;
        width: 75%;
        top: 12.5%;
        left: 12.5%;
        background-color: #484848;
    }

    .gauge-wrapper .gauge .center .suffix {
        font-size: 0.5em;
        vertical-align: super;
    }

    .gauge-wrapper .label {
        text-align: center;
        padding: 0.75rem 0 0 0;
        margin: 0;
    }

    .gauge-wrapper .description {
        text-align: center;
        font-size: 0.9em;
        font-style: italic;
        margin: 0;
    }

</style>
