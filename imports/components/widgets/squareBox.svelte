<script>

    /**
     * Square message block.
     *
     * @memberof Components:Widgets
     * @function squareBox
     * @locus Client
     *
     * @param {Object}  text - widget text strings
     * @param {Object}  config - widget setup information
     * @param {Object}  payload - widget values to display
     *
     * @return nothing
     *
     * @example
     * config: Object: used to set up the widget at the start
     *         {
     *            //* static widget text
     *            title: "Square with 3 config regions",            // main title for widget
     *
     *            //* widget css related decoration
     *            height: 8,                     // widget height in "rem"
     *
     *            //* colour controls at selected trigger points
     *            //* background colors for reactive response to values; if String, colour is fixed
     *            bgColours: "#8bc34a",
     *          }
     */

    //* support functions
    import {toDecimals} from '/imports/functions/func-formatNumbers'
    import {adjustHexColor} from '/imports/functions/func-adjustHexColor'
    import {setBackground} from '/imports/functions/func-setBackground'

    //* props
    export let text = {};
    export let config = {};
    export let payload = null;


    function styleBoxFront() {
        let  height = config && config.height ? config.height : 6;

        return `height: ${height}rem; width: ${height}rem;
            background: ${setBG()}; font-size: ${height / 3}rem;
            color: ${adjustHexColor(setBG(), 0).text}`
    }

    function progessValue() {
        if (payload) {
            let num = payload.values ? payload.values : 0;
            num = num && Array.isArray(num) ? num[0] : num;
            return toDecimals(num, 1);
        } else {
            return 0;
        }
    }

    function setBG() {
        return setBackground(config, payload, progessValue() );
    }

</script>



<div class="squarebox">
    <div class="style-box-front" style="{styleBoxFront()}">

        <div style="width: 100%">
            <div class="square-triangle"></div>
        </div>

        <div class="square-card-inner">
            <div class="styleInfo">
                <span><b>{payload.values[0]}</b></span>

                {#if text.suffix2}
                    <span class="styleInfoMid">{text.suffix}</span>
                {/if}

                <span><b>{text.suffix}</b></span>
            </div>
            <div class="styleTitle">{text.description}</div>
        </div>

    </div>
</div>






<style>

    .style-box-front {
        display: flex;
        flex-direction: column;
    }

    .square-triangle {
        height: 0;
        width: 0;
        border-left: 0.25em solid transparent;
        border-right: 0.25em solid transparent;
        border-top: 0.25em solid #fff;

        margin-left: auto;
        margin-right: auto;
    }

    .square-card-inner {
        padding: 0.5rem 0.75rem 0.75rem 0.75rem;
        align-self: center;
        margin-left: auto;
        margin-right: auto;
    }

    .styleInfo {
        font-size: 0.9em;
        color: inherit;
        text-align: center;
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .styleInfoMid {
        font-size: 0.9em;
        padding: 0 0.75rem;
    }

    .styleTitle {
        font-size: 1rem;
        text-align: center;
    }
</style>
