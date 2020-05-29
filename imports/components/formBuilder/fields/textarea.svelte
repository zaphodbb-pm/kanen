<script>
    /**
     * Basic textarea box.
     *
     * @memberof Components:Form
     * @function textarea
     * @locus Client
     * @augments formWrapper
     *
     * @param {Object} field
     *
     * @emits: 'on-inputentry' {value: value, error: errorVal} with string
     *
     */

    //* common props from parent
    export let field = {};

    //* support functions
    import {createEventDispatcher} from 'svelte';
    const dispatch = createEventDispatcher();

    //* local reactive variable
    let inValue = "";
    let checkValue = "";

    $: setValue(field.value);


    //* functions that mutate local variables
    function setValue(val){
        if(typeof val === 'object'){
            inValue =  JSON.stringify(val);
        }else{
            inValue = val;
        }
    }

    function checkInput(){
        let out = "";
        if(typeof field.value === 'object'){
            try{
                out =  JSON.parse(inValue);
            }catch{
                out = field.value;
            }

        }else{
            out = inValue;
        }

        dispatch('on-inputentry', {value: out, error: false} )
    }

</script>


<label id="{field.field}">
    <textarea class="textarea"
              bind:value={inValue}
              {...field.attributes}
              on:keyup="{checkInput}"></textarea>
</label>
