<script>
    /**
     * Complex row container that can contain other form field types.
     *
     * @memberof Components:Form
     * @function rows
     * @locus Client
     * @augments fieldWrapper
     *
     * @param {Object} field
     *
     * @emits 'on-inputentry' {value: value, error: errorVal} - value {Object} of field values
     *
     * @notes
     *   1. Any field types in FormHolder can used as sub-fields in this component.
     *      Common types are "input", "select", "typeahead" and "switch".
     *      Other types are not practical in this type of arrangement.
     *
     *   2. Returned value is {Array} of objects:
     *      {
     *          id: 2,
     *          info: {
     *              field1: "try two",
     *              field2: 0,
     *              field3: 1,
     *              field4: true
     *          }
     *      }
     *
     */


    //* common props from parent
    export let field = {};

    //* support functions
    import {deepClone} from '/imports/functions/deepClone'
    import {generateId} from '/imports/functions/generateId'
    import Icon from '/imports/components/elements/icon.svelte'
    import Field_Wrapper from '/imports/components/formBuilder/fieldWrapper.svelte'
    import Sortable from '/imports/components/elements/rowDragDrop.svelte'
    import {getContext,  setContext, createEventDispatcher} from 'svelte';
    const dispatch = createEventDispatcher();


    //* local reactive variable
    let list = [];
    let key = field.params.key;

    const rowUniq = generateId(8);
    let editing = false;
    let rowInEdit = null;

    //** get field set-up and prepare out going object that contains first default values and user entry values
    const fieldsArray = field.params && field.params.config ? field.params.config : {};
    let rowDefault ={};
    let rowValues = {};

    //** set new formText context for embedded formWrapper
    let formText = getContext("formText");
    let rowText = formText[field.field] && formText[field.field].rowText ? formText[field.field].rowText : null;
    let rowTextLabels = Object.values(rowText);


    if(rowText){
        setContext("formText", rowText);
    }

    //** reset input row section to default
    resetRow(fieldsArray);

    //** when editing a form document, load value from document
    $: setValue(field.value);


    //* functions that mutate local variables
    function setValue(val){
        list = val ? val : [];
    }

    function sortList(ev){
        list = ev.detail;
        updateList(list);
    }

    function updateList(newList){
        let updated = newList.map( (nl, idx) =>  {
            nl.id = idx + 1;
            return nl;
        });

        dispatch('on-inputentry', {value: updated, error: false});
    }

    function fieldsUpdate(msg) {
        let change = msg.detail;
        rowValues[change.field] = change.value;
    }

    function addRow() {
        let idx = list && list.length ? list.length + 1 : 1;     // default "id" value
        list = [...list, {id: idx, info: rowValues}];

        updateList(list);
        resetRow(fieldsArray);
    }

    function editRow(msg) {
        editing = true;
        let test = list.find(row => row.id === msg);
        rowInEdit = msg;

        if(test){
            let temp = rowDefault;
            temp.forEach(row => row.value = test.info[row.field] );
            rowDefault = temp;
            rowValues = test.info;
        }
    }

    function returnRow(msg) {
        let test = list.find(row => row.id === rowInEdit);
        let idx = list.findIndex(row => row.id === rowInEdit);

        if(test){
            list[idx].info = rowValues;
        }

        updateList(list);
        resetRow(fieldsArray);
        editing = false;
    }

    function deleteRow(rowid) {
        let temp = list
        temp = temp.filter(row => row.id !== rowid);
        list = temp;

        updateList(list);
    }

    function resetRow(fieldArray){
        let fa = deepClone(fieldArray);

        rowValues = {};
        Object.entries(fa).forEach( (fa) => {
            rowValues[ fa[0] ] = fa[1].defaultValue;
        });

        rowDefault = Object.values(fa);
    }

</script>



<fieldset class="box field-rows">

    <div class="d-flex" style="margin-left: 10%; margin-right: 5%;">
        {#each Object.values(rowText) as row}
            <div class="has-text-weight-bold has-text-right" style="width: {100 / rowTextLabels.length}%;">
                {row.tag && (typeof row.tag === "string") ? row.tag : row.label}
            </div>
        {/each}
    </div>


    <Sortable
            bind:list={list}
            key={field.params.key}
            on:sort={sortList}
            let:item={item}>

        <div class="d-flex">
            <div class="add-cursor has-text-info" style="width: 5%;">
                <Icon icon='{getContext("iconDrag")}' class="text-1dot5rem"/>
            </div>

            <div class="cadd-cursor" style="width: 5%;" on:click="{() => editRow(item.id)}">
                <Icon icon='{getContext("iconEdit")}' class="text-1dot5rem"/>
            </div>

            <div class="d-flex" style="width: 85%;">
                {#each Object.values(item.info) as field}
                    <div class="has-text-right" style="width: {100 / rowTextLabels.length}%;">

                        {#if typeof field === 'boolean'}
                            {#if field}
                                <Icon icon='{getContext("iconStatus")}' class="text-1dot5rem has-text-success"/>
                            {/if}
                        {:else if typeof field === 'object'}
                            {field.name}
                        {:else}
                            {field}
                        {/if}

                    </div>
                {/each}
            </div>

            <div class="add-cursor has-text-right" style="width: 5%;" on:click="{() => deleteRow(item.id)}">
                <Icon icon='{getContext("iconDelete")}' class="text-1dot5rem has-text-danger"/>
            </div>
        </div>

    </Sortable>



    <div class="has-border-top pt-3 mt-5">
        <div class="columns is-vcentered">

            <div class="column">
                <div class="columns">
                    {#each rowDefault as field, idf (field.field)}
                        <div class="column">
                            <Field_Wrapper class="" field="{field}" on:field-changed="{fieldsUpdate}"/>
                        </div>
                    {/each}
                </div>
            </div>

            <div class="column is-1 add-cursor has-text-info align-items-center" class:is-hidden={editing} on:click="{addRow}">
                <Icon icon='{getContext("iconRowAdd")}' class="is-size-3"/>
            </div>

            <div class="column is-1 add-cursor has-text-success align-items-center" class:is-hidden={!editing} on:click="{returnRow}">
                <Icon icon='{getContext("iconEditDone")}' class="is-size-3"/>
            </div>

        </div>
    </div>

</fieldset>
