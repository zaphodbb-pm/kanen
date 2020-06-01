<script>
    /**
     * Api key builder.
     *
     * @memberof Components:Form
     * @function apikey
     * @locus Client
     * @isTemplate true
     * @augments formWrapper
     *
     * @emits: {String} newApikey
     *
     * @notes
     * 1. Restricted to use by administrator to set api keys for users
     * 2. Uses window.crypto capability of modern browsers
     *
     */

    //* common props from parent
    export let field = {};

    //* support functions
    import Icon from '/imports/components/elements/icon.svelte'
    import {getContext, createEventDispatcher} from 'svelte';
    const dispatch = createEventDispatcher();

    //* local reactive variable
    let keyValue = "";

    $: setValue(field.value);

    //* functions that mutate local variables
    function setValue(val){
        keyValue = val;
    }

    //* event handlers
    function setkey() {

        //** Own version of a character selector in order to keep all code contained within in this component
        let choices = "abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        let out = [];

        let arr = new Uint8Array(field.params && field.params.length || 24);
        window.crypto.getRandomValues(arr);

        arr.forEach(function (item) {
            let pos = Math.round(item / 255 * choices.length);
            out.push(choices.charAt(pos));
        });

        keyValue = out.join("");
        dispatch('on-inputentry', {value: keyValue, error: false}  );
    }

</script>



<div class="field has-addons">
    <div class="control">
        <a class="button is-primary" on:click="{setkey}">
            <Icon icon='{getContext("iconApiKey")}' class="text-1dot5rem"/>
        </a>
    </div>

    <div class="control is-expanded">
        <input type="text" class="input"
               {...field.attributes}
               bind:value="{keyValue}">
    </div>
</div>
