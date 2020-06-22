<script>
    /**
     * Builds row selector and documents count.
     *
     * @memberof Components:List
     * @function rowSize
     * @locus client
     * @augments listHolder
     *
     * @param  {Object} config - decoration for row selector
     * @param  {String} label
     *
     * @emits 'row-changed' - {row: initval}
     *
     */

    //** support functions
    import {getContext} from 'svelte';
    import Icon from '/imports/components/elements/icon.svelte'
    import {createEventDispatcher} from 'svelte';
    const dispatch = createEventDispatcher();

    //* local reactive variables
    let opts = [10, 15, 20, 30, 50, 100];           // sets the row length per page selection
    let initval = 10;                               // set initial rows / page


    //* event handlers
    function changerow() {
        dispatch('row-changed', {
            row: initval
        });
    }

</script>


<div class="field has-addons">
    <div class="control">
        <a class="button is-static">
            <Icon icon='{getContext("iconRows")}' class="text-1dot5rem"/>
        </a>
    </div>

    <div class="control">
        <span class="select">
            <select bind:value="{initval}" on:change="{changerow}">
                {#each opts as option}
                    <option>{option}</option>
                {/each}
            </select>
        </span>
    </div>
</div>
