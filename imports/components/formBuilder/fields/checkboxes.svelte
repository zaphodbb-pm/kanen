<script>
    /**
     * Basic checkboxes.
     *
     * @memberof Components:Form
     * @function checkboxes
     * @locus Client
     * @augments fieldWrapper
     *
     * @param {Object} field
     * @param {Object} field.params - {col: number, buttons: true} uses button layout instead of checkboxes
     *
     * @emits 'on-inputentry' {value: value, error: false} with array of objects
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
    let inValue = "";
    let checkValue = "";

    let isButton = !!(field.params && field.params.buttons);
    let buttons = isButton;
    let classes = isButton ? "checkbox-button" : "field";
    let inputClass = isButton ? "" : "is-checkradio is-primary has-background-color";
    let checkedNames = [];

    $: setValue(field.value);


    //* event handlers
    function emitCheckedNames(){
        //** get text for _id values
        let items = checkedNames.map( (cn) => source.find( (s) => s._id === cn ) );
        dispatch('on-inputentry', {value: items, error: false});
    }

    //* functions that mutate local variables
    function setValue(val){
        checkedNames = field.value.map( (val) => val._id);
    }

    function colWidth() {
        let cols = field.params && field.params.cols ? field.params.cols : 1;
        cols = cols === 7 ? null :  Math.round(12 / cols);
        return cols ? `is-${cols}` : "";
    }

</script>



<div class="box">
    <div class="columns is-multiline">
        {#each source as cb}
            <div class="column checkbox-field {colWidth()}">

                <div class="{classes}">
                    <input type="checkbox"
                           id="{cb.field + '_checkbox_' + cb._id}"
                           class="{inputClass}"
                           title=""

                           bind:group={checkedNames}
                           value={cb._id}
                           on:change|stopPropagation="{emitCheckedNames}">

                    {#if buttons}
                        <div class="button-label">
                            <label class="button unchecked" for="{cb.field + '_checkbox_' + cb._id}">
                                {cb.name}
                            </label>

                            <label class="button is-primary checked"
                                   for="{cb.field + '_checkbox_' + cb._id}">

                                {cb.name}
                            </label>
                        </div>
                    {:else}
                        <label for="{cb.field + '_checkbox_' + cb._id}">{cb.name}</label>
                    {/if}
                </div>

            </div>
        {/each}
    </div>
</div>


<style>

    .checkbox-field:not(last-child) {
        padding-bottom: 0;
    }

    .checkbox-field:last-child {
        padding-bottom: 0.75rem;
    }

    .checkbox-button input[type="checkbox"] {
        opacity: 0;
        cursor: none;
    }

    .checkbox-button input[type="checkbox"] + .button-label > .unchecked {
        display: inline-flex;
    }

    .checkbox-button input[type="checkbox"]:checked + .button-label > .unchecked {
        display: none;
    }

    .checkbox-button input[type="checkbox"] + .button-label > .checked {
        display: none;
    }

    .checkbox-button input[type="checkbox"]:checked + .button-label > .checked {
        display: inline-flex;
    }

    .button-label {
        margin-top: -1.25rem;
    }

</style>
