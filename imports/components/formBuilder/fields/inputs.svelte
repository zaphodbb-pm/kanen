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
    import {createEventDispatcher} from 'svelte';
    const dispatch = createEventDispatcher();

    //* local reactive variable
    let inValue = "";
    let checkValue = "";

    $: setValue(field.value);


    //* functions that mutate local variables
    function setValue(val){
        inValue = val;
    }

    function checkInput(){
        let test = formatField(inValue, field.attributes);

        if(test){
            inValue = test.value;
            checkValue = test.error ? "field-input-error" : "";
            dispatch('on-inputentry', test );
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


<label id="{field.field}">
    <input class="input {checkValue}"
           {...field.attributes}
           bind:value={inValue}
           on:keyup="{checkInput}">
</label>
