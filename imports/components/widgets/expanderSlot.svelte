<script>
    /**
     * Expander box with slot for html content.
     *
     * @memberof Components:Widgets
     * @function expanderSlot
     * @locus Client
     *
     * @param {String} tabSettings - controls button settings
     * @param {Object} text - input object from parent
     * @param {String} text:icon - tab label icon positioned at left of tab
     * @param {String} text:logo - alternative logo data uri
     * @param {String} text:title - tab label
     * @param {String} text:subTitle - tab by-line
     *
     * @return nothing
     */


    //* external props
    export let text = "";
    export let tabSettings = "";

    //* get the user language preference from store and text from context
    import { getContext } from 'svelte';
    import {lang} from '/imports/client/systemStores'
    import {i18n} from '/imports/functions/i18n'

    //* get accessory components
    import Icon from '/imports/components/elements/icon.svelte'


    //* component controls
    let content = getContext("pageText").components;
    content = i18n(content, text, $lang);

    let toggle = false;
    let rotate = "close-box";

    function changeToggle() {
        toggle = !toggle;
        rotate = rotate === "close-box" ? "open-box" : "close-box";
    }

</script>





<div class="expander-with-slot">

    <div class="expander-header {tabSettings}">
        <div class="expander-label">
            {#if content.icon}
                <div class="label-icon">
                    <Icon icon={getContext(content.icon)} class="text-1dot5rem"/>
                </div>
            {/if}

            {#if content.logo}
                <div class="label-icon">
                    <img src="{content.logo}" alt="logo">
                </div>
            {/if}

            <div>
                <b>{content.title}</b>
                {#if content.subTitle}
                    <div class="text-0dot9rem">{content.subTitle}</div>
                {/if}
            </div>
        </div>

        <div class="add-cursor {rotate}" on:click|stopPropagation={ () => changeToggle()}>
           <Icon icon={getContext("iconMore")} />
        </div>
    </div>

    <div class="expander-body"
         class:open-body={toggle}
         class:close-body={!toggle}>

        <slot> </slot>
    </div>

</div>







<style>

    .expander-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;

        font-size: 1rem;
        padding: 0.5rem;

        border-radius: 0;
        border-bottom-width: 3px;
        border-bottom-style: solid;
        border-bottom-color: inherit;
    }

    .expander-label {
        display: flex;
        justify-content: start;
        align-items: center;
    }

    .label-icon {
        font-size: 1.2rem;
        margin-right: 0.5rem;
        height: 1.5rem;
        width: 1.5rem;
    }


    /* animate icon */
    @keyframes open {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(90deg);
        }
    }

    @keyframes close {
        from {
            transform: rotate(90deg);
        }
        to {
            transform: rotate(0deg);
        }
    }

    .open-box {
        animation: open 0.5s;
        transform: rotate(90deg);
    }

    .close-box {
        animation: close 1s;
        transform: rotate(0deg);
    }

    /* animate box body open and close */
    .expander-content {
        padding: .75rem;
        max-height: 200rem;
    }

    .expander-content p {
        margin-bottom: 0.75rem;
    }

    .open-body {
        overflow: hidden;
        max-height: 200rem;

        transition-property: all;
        transition-duration: 2s;
        transition-timing-function: cubic-bezier(0.25, 0.1, 0.25, 1);
    }

    .close-body {
        overflow: hidden;
        max-height: 0;

        transition-property: all;
        transition-duration: 1s;
        transition-timing-function: cubic-bezier(0.25, 0.1, 0.25, 1);
    }

</style>
