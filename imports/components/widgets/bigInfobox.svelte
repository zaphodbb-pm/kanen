<script>

    /**
     * Big info box widget.
     *
     * @memberof Components:Widgets
     * @function bigInfobox
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
     *      {
     *          icon: icons.SETTINGS,             // widget's icon if needed
     *          //* colour controls at selected trigger points
     *          //* if array, background colors for reactive response to values; if String, colour is fixed
     *          bgColours: [NORMAL, WARN, DANGER],
     *          bgNormal: [0, .66],             // percent range of values for normal operation
     *          bgWarning: [.66, .80],          // percent range of values for warning operation
     *      }
     *
     * text: static widget text object
     *      {
     *          prefix: "$",                    // prefix added to incoming value for display
     *          title: "Economics",             // main title for widget
     *          suffix: "%",                    // suffix added to incoming value for display
     *          link: "http://www.apple.com",   // info link only (optional)
     *          linkText: "More Info",          // info link text only (optional)
     *      }
     */

    //* get accessory components
    import { getContext } from 'svelte';
    import Icon from '/imports/components/elements/icon.svelte'

    //* support functions
    import {toDecimals} from '/imports/functions/formatNumbers'
    import {adjustHexColor} from '/imports/functions/adjustHexColor'
    import {setBackground} from '/imports/functions/setBackground'

    //* props
    export let text = {};
    export let config = {};
    export let payload = null;

    let height = config && config.height ? config.height : 6;

    function progessValue() {
        if (payload) {
            let num = payload.values ? payload.values : 0;
            num = num && Array.isArray(num) ? num[0] : num;
            return toDecimals(num, 1);
        } else {
            return 0;
        }
    }

    function styleBoxFront() {
        return `height: ${height}rem; background: ${setBG()}; font-size: ${height / 3}rem;
            color: ${adjustHexColor(setBG(), 0).text};`;
    }

    function styleIcon() {
        return `font-size: ${height / 2}rem;`
    }

    function setBG() {
        return setBackground(config, payload, progessValue() );
    }

</script>



<div class="bigInfobox style-box-front" style={styleBoxFront()}>

    <div class="style-content-box">
        <div class="info-content">
            <div class="style-number">
                <b>{text.prefix}{progessValue()}<span class="suffix">{text.suffix}</span></b>
            </div>

            <p class="style-text">{text.title}</p>
        </div>

        <div class="style-box-icon" style="{styleIcon()}">
            <Icon icon={getContext(config.icon)} />
        </div>
    </div>

    {#if text.linkText}
        <a href={text.link} class="big-box-footer">
            <div>{text.linkText}</div>

            <div class="footer-icon">
                <Icon icon={getContext("iconMoreCircle")} class="text-1dot2rem"/>
            </div>
        </a>
    {/if}

</div>



<style>

    .style-box-front {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    .style-content-box {
        position: relative;
        display: flex;
        justify-content: space-between;
        padding: 0.75rem;
    }

    .info-content {
        position: absolute;
        top: 1.5rem;
        left: 1.5rem;
        line-height: 1;
    }

    .style-box-icon {
        position: absolute;
        top: 1.5rem;
        right: 2rem;
        line-height: 1;
        color: rgba(0, 0, 0, 0.3);
        transition: all .3s linear;
    }

    .style-box-icon:hover {
        transform: scale(1.3) translate(-15%, 0);
    }

    .style-number {
        font-size: 1em;
    }

    .style-number  .suffix {
        font-size: 0.75em;
        vertical-align: top;
    }

    .style-text {
        font-size: 0.5em;
    }

    .big-box-footer {
        padding: 0.125rem;
        width: 100%;
        font-size: 0.9rem;
        color: #FFFFFF;
        background-color: rgba(0, 0, 0, 0.2);
        display: flex;
        justify-content: center;
        min-height: 0.9rem;
        align-items: center;
        line-height: 1;
    }

    .footer-icon {
        margin-left: 0.5rem;
        line-height: 1;
    }
</style>
