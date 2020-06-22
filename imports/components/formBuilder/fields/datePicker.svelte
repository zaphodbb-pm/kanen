<script>
    /**
     * Date picker component based on Flatpickr.
     *
     * @memberof Components:Form
     * @function datePicker
     * @locus Client
     * @augments fieldWrapper
     *
     * @param {Object} field
     *
     * @emits 'on-inputentry' {value: value, error: errorVal} with text date string
     *
     * @see Based on work {@link https://flatpickr.js.org/|Flatpickr}
     *
     */

    //* common props from parent
    export let field = {};

    //* support functions
    import flatpickr from 'flatpickr';
    import 'flatpickr/dist/flatpickr.css'
    import {onMount, onDestroy, createEventDispatcher} from 'svelte';
    const dispatch = createEventDispatcher();

    //* local reactive variable
    let inValue = "";
    let fp;

    $: setValue(field.value);


    //* functions that mutate local variables
    function setValue(val){
        inValue = val;
    }

    function checkInput(selectedDates, dateStr){
        inValue = dateStr;
        dispatch('on-inputentry', {value: dateStr, error: false});
    }

    //* lifecycle states
    onMount( () => {
        let target = document.getElementById("fp_" + field.field);
        fp = flatpickr(target, field.params);
        fp.config.onChange.push(checkInput );
        fp.jumpToDate(inValue);
    });

    onDestroy( () => {
        fp.destroy();
    });

</script>


<label>
    <input type="text" id="fp_{field.field}" class="input" value="{inValue}">
</label>
