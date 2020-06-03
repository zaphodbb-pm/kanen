<script>
    /**
     * Draggable item list.
     *
     * @memberof Components:Form
     * @function itemList
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
    import Icon from '/imports/components/elements/icon.svelte'
    import Sortable from '/imports/components/blocks/rowDragDrop.svelte'
    import {getContext, createEventDispatcher} from 'svelte';
    const dispatch = createEventDispatcher();

    //* local reactive variable
    let list = [];
    let key = field.params.key;
    let uniqueId = Math.random();

    $: setValue(field.value);


    //* functions that mutate local variables
    function setValue(val){
        list = val;
    }

    function updateList(newList){
        let updated = newList.map( (nl, idx) =>  {
            nl.id = idx + 1;
            return nl;
        });

        list = updated;
        dispatch('on-inputentry', {value: list, error: false});
    }

    //* event handlers
    function addRow(){
        let newList = list;
        let addItem = {
            id: list.length + 1,
            check: "",
            text: "",
        };

        newList.push(addItem);
        updateList(newList)
    }

    function deleteRow(rowid) {
        let newList = list;
        newList = newList.filter(row => row.id !== rowid);
        updateList(newList)
    }

    function updateElement(item, prop, value) {
        item[prop] = value;
        updateList(list);
    }

    function sortList(ev){
        let newList = ev.detail;
        updateList(newList)
    }

</script>



<div class="box">

    <button class="button btn-rounded is-primary mb-3" on:click="{addRow}">
        <Icon icon='{getContext("iconRowAdd")}' class="text-1dot5rem"/>
    </button>

    <Sortable
        bind:list={list}
        key={field.params.key}
        on:sort={sortList}
        let:item={item}>

        <div class="level mb-2">
            <div class="w-10">
                <span class="row-id">{item.id}</span>
            </div>

            {#if field.params.showCheck}
                <div class="mr-3" style="height: 1.5rem; width: 1.5rem;">
                    <input type="checkbox"
                           class="is-checkradio is-info has-background-color"
                           title=""
                           id="{'checkbox_' + uniqueId + '_' + item.id}"
                           checked="{item.check}"
                           on:change="{e => updateElement(item, 'check', e.target.checked)}">

                    <label for="{'checkbox_' + uniqueId + '_' + item.id}"></label>
                </div>
            {/if}

            <div class="w-80">
                <textarea class="textarea"
                          value="{item.text}"
                          on:input="{e => updateElement(item, 'text', e.target.value)}"
                          rows="2"></textarea>
            </div>

            <div class="w-10">
                <div class="add-cursor has-text-centered" on:click="{() => deleteRow(item.id)}">
                    <Icon icon='{getContext("iconDelete")}' class="text-1dot5rem has-text-danger"/>
                </div>
            </div>
        </div>

    </Sortable>

</div>



<style>
    .btn-rounded {
        border-radius: 50%;
        padding: 0.25rem;
        width: 2.5rem;
    }

    .row-id {
        margin-top: 0.5rem;
        padding: 0.5rem 0.75rem;
        background-color: #EEE;
        border-radius: 50%;
    }
</style>
