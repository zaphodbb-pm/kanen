<script>
    /**
     * Basic radio group.
     *
     * @memberof Components:Form
     * @function radios
     * @locus Client
     * @augments formWrapper
     *
     * @param {Object} field
     * @param {Object} field.params - {col: number}
     *
     * @emits: 'on-inputentry' {value: value, error: false} with array of objects
     *
     */

    //* common props from parent
    export let field = {};

    //* support functions
    import {createEventDispatcher} from 'svelte';
    const dispatch = createEventDispatcher();
    import {getContext} from 'svelte'
    let formText = getContext("formText");
    let source = formText[field.field] && formText[field.field].selects ? formText[field.field].selects : [];

    //* local reactive variable
    let radValue = "";

    $: setValue(field.value);


    //* event handlers
    function emitRadio(selId){
        //** get text for _id values
        let item = source.find( (s) => s._id === selId )
        dispatch('on-inputentry', {value: item, error: false});
    }

    //* functions that mutate local variables
    function setValue(val){
        radValue = val._id;
    }

    function colWidth() {
        let cols = field.params && field.params.cols ? field.params.cols : 1;
        cols = cols === 7 ? null :  Math.round(12 / cols);
        return cols ? `is-${cols}` : "";
    }

</script>



<div class="box">
    <div class="columns is-multiline">
        {#each source as rad, index}
            <div class="column radio-field {colWidth()}">

                <input type="radio"
                       id="{rad.field + '_radio_' + index}"
                       class="is-checkradio"
                       title=""
                       {...field.attributes}
                       bind:group={radValue}
                       value={rad._id}
                       on:change|stopPropagation="{() => emitRadio(rad._id)}">

                <label for="{rad.field + '_radio_' + index}">{rad.name}</label>
            </div>
        {/each}
    </div>

</div>
