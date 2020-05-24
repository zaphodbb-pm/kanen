<script>

    /**
     * Simple box container with slot for any type of content.
     * Use as a template for building components
     *
     * @memberof Components:Elements
     * @function box
     * @locus Client
     *
     * @return nothing
     *
     */


    //* component set-up boilerplate *************************************

    // external props (if needed)
    //export let text = "";
    //export let tabSettings = "";

    // get the user language preference from store and text from context
    import { getContext } from 'svelte';
    import {lang} from '/imports/both/systemStores'
    import {i18n} from '/imports/functions/i18n'

    // get accessory components
    import Icon from '/imports/components/elements/icon.svelte'

    //***************************************************************



    //* component controls **************************
    //let content = getContext("pageText").components;
    //content = i18n(content, text, $lang);

</script>


<div class="box">

    <slot> </slot>

</div>
