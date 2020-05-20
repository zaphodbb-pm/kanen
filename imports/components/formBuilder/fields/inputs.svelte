<script>
    /**
     * Field component for html input tags.
     *
     * @memberof Components:Form
     * @function inputs
     * @locus Client
     * @augments formFields
     *
     * @return nothing - emits: onInputs with text, number or other types
     *
     */


    //* props
    export let value;
    export let attributes;
    export let cmpLabel;

    //* support functions
    import {onMount, onDestroy, setContext, getContext} from 'svelte'
    import {createEventDispatcher} from 'svelte';
    const dispatch = createEventDispatcher();

    //* local reactive variable
    let inValue = "";

    onMount( () => {

        inValue = value;
        inValue = formatField(inValue, attributes);

    });


    function formatField(val, attr) {
        let value = val;

        if (attr && attr.type && (attr.type === "number")) {
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
        }

        if (attr && attr.type && (attr.type === "phone")) {
            value = ('' + value).replace(/\D/g, '');                // Filter only numbers from the input
        }

        return value;
    }

    function checkInput() {
        dispatch('on-inputentry', inValue);
    }

</script>


<div>
    <input
            class="input"
            {...attributes}
            placeholder="{cmpLabel}"
            bind:value={inValue}
            on:keyup="{checkInput}">

    <label class="has-float-label">{cmpLabel}</label>
</div>
