<script>
    /**
     * Field component for colour picker.
     *
     * @memberof Components:Form
     * @function colourPicker
     * @locus Client
     * @augments fieldWrapper
     *
     * @param {Object} field
     *
     * @emits: 'on-inputentry' {value: value, error: errorVal} with object
     *
     */

    //* common props from parent
    export let field = {};

    //* support functions
    import {createEventDispatcher} from 'svelte';
    const dispatch = createEventDispatcher();

    import {textColour} from '/imports/functions/textColour'

    //* local reactive variable
    let inValue = "";

    let swatches = buildSwatches();
    let selectedSwatch = "";
    let colour = "#000";

    $: setValue(field.value);


    //* functions that mutate local variables
    function setValue(val){
        inValue = val;
        selectedSwatch = val;
        colour = textColour(val);
    }

    function showValue(col) {
        selectedSwatch = col;
        inValue = col;
        colour = textColour(col);

        dispatch('on-inputentry', {value: inValue, error: false});
    }

    //* pure functions
    function buildSwatches() {

        return [
            ["rgb(255, 170, 170)", "rgb(255, 128, 128)", "rgb(255, 0, 0)", "rgb(200, 64, 64)", "rgb(128, 64, 64)"],
            ["rgb(170, 255, 170)", "rgb(128, 255, 128)", "rgb(0, 255, 0)", "rgb(64, 200, 64)", "rgb(64, 128, 64)"],
            ["rgb(170, 170, 255)", "rgb(128, 128, 255)", "rgb(0, 0, 255)", "rgb(64, 64, 200)", "rgb(64, 64, 128)"],

            ["rgb(255, 255, 170)", "rgb(255, 255, 128)", "rgb(255, 255, 0)", "rgb(255, 190, 0)", "rgb(255, 128, 0)"],
            ["rgb(255, 170, 255)", "rgb(255, 128, 255)", "rgb(255, 0, 255)", "rgb(200, 64, 200)", "rgb(128, 64, 128)"],
            ["rgb(170, 255, 255)", "rgb(128, 255, 255)", "rgb(0, 255, 255)", "rgb(64, 200, 200)", "rgb(64, 128, 128)"],

            ["rgb(240, 240, 240)", "rgb(170, 170, 170)", "rgb(128, 128, 128)", "rgb(64, 64, 64)", "rgb(0, 0, 0)"]
        ];
    }

</script>



<div class="colours">

    <label>
        <input class="input"
               {...field.attributes}
               bind:value={inValue}
               style="background-color: {selectedSwatch}; color: {colour}">
    </label>

    <div class="select-area mt-3">
        {#each swatches as row}
            <div class="d-flex">

                {#each row as col}
                    <div class=" add-cursor">

                        <div class="swatch"
                             style="background-color: {col}"
                             title="{col}"
                             on:click="{ () => showValue(col)}">
                        </div>

                    </div>
                {/each}

            </div>
        {/each}
    </div>

</div>



<style scoped>

    .swatch {
        height: 2rem;
        width: 2rem;
        border-radius: 50%;
        margin: 0.5rem;
    }

</style>
