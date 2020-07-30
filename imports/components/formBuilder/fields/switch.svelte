<script>
    /**
     * @summary Checkbox with switch css.
     *
     * @memberof Components:Form
     * @function switch
     * @locus Client
     * @augments fieldWrapper
     *
     * @param {Object} field with field.params.isCheck ? true = checkbox : else = toggle
     *
     * @emits 'on-inputentry' {value: value, error: errorVal} with boolean
     *
     */

    //* common props from parent
    export let field = {};

    //* support functions
    import {generateId} from '/imports/functions/generateId';
    import {createEventDispatcher} from 'svelte';
    const dispatch = createEventDispatcher();
    import {getContext} from 'svelte'
    let formText = getContext("formText");

    //* local reactive variable
    let inValue = false;
    const tag = formText[field.field] && formText[field.field].tag ? formText[field.field].tag : "";
    const label = formText[field.field] && formText[field.field].label ? formText[field.field].label : "";
    const isCheck = !!(field.params && field.params.isCheck);
    const uniqueId = generateId(6);

    $: setValue(field.value);


    //* functions that mutate local variables
    function setValue(val){
        inValue = val;
    }

    function clickSwitch(){
        inValue = !inValue;
        dispatch('on-inputentry', {value: inValue, error: false} );
    }

</script>


<div class="input d-flex align-items-center" style="{label ? 'padding: 1.5rem' : ''}">

    {#if isCheck}

        <div>
            <input type="checkbox"
                   id="{field.field + '_checkbox_' + uniqueId}"
                   class="is-checkradio is-primary has-background-color"
                   title=""
                   {...field.attributes}
                   bind:checked={inValue}
                   on:click|stopPropagation="{clickSwitch}">

            <label for="{field.field + '_checkbox_' + uniqueId}">{tag}</label>
        </div>

    {:else}

        <div class="switch-toggle  {inValue ? 'has-background-primary': ''}"  on:click|stopPropagation="{clickSwitch}">
            <div class="switch-toggle-bubble {inValue ? 'bubble-on': ''}"></div>
        </div>

        <label class="switch-label">{tag}</label>

    {/if}

</div>


<style>

    .switch-label {
        margin-left: 1rem;
    }

    .switch-toggle {
        position: relative;
        height: 1.5rem;
        width: 3rem;
        border-radius: 0.75rem;
        background-color: #ccc;
        cursor: grab;
    }

    .switch-toggle-bubble {
        position: absolute;
        height: 1rem;
        width: 1rem;
        border-radius: 0.5rem;
        background-color: white;
        left: 0.25rem;
        right: auto;
        top: 0.25rem;
        transform: translateX(0);
        transition-duration: 0.5s;
    }

    .switch-toggle-bubble.bubble-on {
        transform: translateX(1.5rem);
        transition-duration: 0.5s;
    }

</style>
