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
     *            height: 8,                    // widget height in "rem"
     *            bgColours: "#8bc34a",         // fixed background colour
     *          }
     *
     * text: static widget text object
     *      {
     *          title: "Square Box",            // main title for widget
     *          suffix: "%",                    // suffix added to incoming value for display
     *      }
     *
     * payload:
     *      {                                   // Object: incoming or outgoing flow-message format from subscribe reactive variable
     *          values: [75],                   // array of values to show
     *      },
     */

    //* support functions
    import {toDecimals} from '/imports/functions/formatNumbers'
    import {adjustHexColor} from '/imports/functions/adjustHexColor'
    import {setBackground} from '/imports/functions/setBackground'

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



<div class="squarebox style-box-front" style="{styleBoxFront()}">

    <div style="width: 100%">
        <div class="square-triangle"></div>
    </div>

    <div class="square-card-inner">
        <div class="styleInfo">
            <div><b>{payload.values[0]}</b></div>
            <div><b class="suffix">{text.suffix}</b></div>
        </div>
        <div class="styleTitle">{text.title}</div>
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

    .styleTitle {
        font-size: 1rem;
        text-align: center;
    }

    .styleInfo  .suffix {
        font-size: 0.75em;
        vertical-align: text-bottom;
    }
</style>
