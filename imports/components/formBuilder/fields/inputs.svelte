<script>
    /**
     * Field component for html input tags.
     *
     * @memberof Components:Form
     * @function inputs
     * @locus Client
     * @augments fieldWrapper
     *
     * @param {Object} field
     *
     * @emits: 'on-inputentry' {value: value, error: errorVal} with text, number or other types
     *
     */

    //* common props from parent
    export let field = {};

    //* support functions
    import {validateEmail} from '/imports/functions/validateEmail'
    import {validatePhone} from '/imports/functions/validatePhone'
    import Icon from '/imports/components/elements/icon.svelte'
    import {createEventDispatcher, getContext} from 'svelte';
    const dispatch = createEventDispatcher();

    //* local reactive variable
    let inValue = "";
    let checkValue = "";
    let attributes = field.attributes;
    let hasShow = field.attributes && field.attributes.type && field.attributes.type === "password";
    let isText = true;
    let showTitles = field.tag ? field.tag : {};


    $: setValue(field.value);



    //* functions that mutate local variables
    function setValue(val){
        inValue = val;
    }

    //* event handlers
    function checkInput(){
        let test = formatField(inValue, field.attributes);

        if(test){
            inValue = test.value;
            checkValue = test.error ? "field-input-error" : "";
            dispatch('on-inputentry', test );
        }
    }

    function checkShow(msg){
        if(hasShow){
            attributes.type = isText ? "text" : "password";
            isText = !isText;
        }
    }

    //* pure functions
    function formatField(val, attr){
        let value = val;
        let errorVal = false;

        switch (true) {
            case (attr && attr.type === "email"):
                errorVal = value.length > 0 && !validateEmail(value);
                break;

            case attr && attr.type && (attr.type === "number"):
                if (value || value === 0) {
                    value = parseFloat(value);

                    if (attr.step && Number.isInteger(attr.step)) {
                        value = Math.round(value);
                    }

                    //** check if user input is within range bounds; note that a value of zero is consider as false
                    value = attr.min && value < attr.min ? attr.min : value;
                    value = attr.max && value >= attr.max ? attr.max : value;
                } else {
                    value = "";
                }
                break;

            case attr && attr.type && (attr.type === "tel"):
                let validate = validatePhone(value);
                errorVal = value.length > 0 && !validate.test;
                value = validate.filter
                break;
        }

        return {value: value, error: errorVal};
    }

</script>



<div id="{field.field}" class="field has-addons">
    <div class="control is-expanded">
        <input class="input {checkValue}"
               {...attributes}
               bind:value={inValue}
               on:keyup="{checkInput}">
    </div>

    {#if hasShow}
        <div class="control">
            <a class="button has-text-grey" on:click={checkShow}>
                {#if isText}
                    <span title="{showTitles.show}">
                        <Icon icon='{getContext("iconShowText")}' class="text-1dot5rem" />
                    </span>
                {:else}
                    <span title="{showTitles.hide}">
                        <Icon icon='{getContext("iconHideText")}' class="text-1dot5rem"  />
                    </span>
                {/if}
            </a>
        </div>
    {/if}
</div>
