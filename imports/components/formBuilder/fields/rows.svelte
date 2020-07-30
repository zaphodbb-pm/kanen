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
     *   2. Returned value is [Array] of {objects}:
     *      {
     *          row: 2,
     *          fields: {
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
    import Icon from '/imports/components/elements/icon.svelte'
    import Field_Wrapper from '/imports/components/formBuilder/fieldWrapper.svelte'
    import Sortable from '/imports/components/elements/rowDragDrop.svelte'
    import {getContext,  setContext, createEventDispatcher} from 'svelte';
    const dispatch = createEventDispatcher();


    //* local reactive variable
    let list = [];
    const key = field.params.key;

    //** get field set-up and prepare out going object that contains first default values and user entry values
    const fieldsArray = field.params && field.params.config ? field.params.config : {};

    //** set new formText context for embedded formWrapper
    let formText = getContext("formText");
    let rowText = formText[field.field] && formText[field.field].rowText ? formText[field.field].rowText : null;

    if(rowText){
        setContext("formText", rowText);
    }

    //** reset input row section to default
    list = initialRow(1, fieldsArray);

    //** when editing a form document, load value from document
    $: setValue(field.value);


    //* functions that mutate local variables
    function setValue(val){
        if(val && Array.isArray(val) && val.length > 0){
            list = val.map( (v) =>  initialRow(v.row, fieldsArray, v.fields)[0] );
        }else{
            list = initialRow(1, fieldsArray, null);
        }
    }

    function updateList(newList){
        let updated = newList.map( (nl, idx) =>  {
            nl.row = idx + 1;
            return nl;
        });

        list = updated;

        let out = newList.map( (nl) => {
            let values = {};
            let fld = nl.fields;

            for(let field in fld){
                if( fld.hasOwnProperty(field) ){
                    values[field] = fld[field] ? fld[field].value : fld[field].defaultValue;
                }
            }

            return {
                row: nl.row,
                fields: values
            }
        } )

        dispatch('on-inputentry', {value: out, error: false});
    }


    //* event handlers
    function fieldsUpdate(row, msg) {
        let newList = list;
        let updateIdx = newList.findIndex( (item) => item.row === row);
        newList[updateIdx].fields[msg.field] = msg;

        updateList(newList);
    }

    function addRow() {
        let row = list && list.length ? list.length + 1 : 1;     // default "row" value
        let newList = [...list, initialRow(row, fieldsArray, null)[0] ];

        updateList(newList);
    }

    function deleteRow(rowid) {
        let newList = list;
        newList = newList.filter(row => row.row !== rowid);

        updateList(newList);
    }

    function sortList(ev){
        updateList(ev.detail);
    }


    //* support functions
    function initialRow(idx, fieldArray, value){
        let fa = deepClone(fieldArray);

        for(let field in fa){
            if( fa.hasOwnProperty(field) ){
                fa[field].value = value && ( value[field] || typeof value[field] === "boolean") ? value[field] : fa[field].defaultValue;
            }
        }

        return [{row: idx, fields: fa}];
    }

</script>



<fieldset class="box field-rows">

    <button class="button btn-rounded is-primary mb-3" on:click|preventDefault="{addRow}">
        <Icon icon='{getContext("iconRowAdd")}' class="text-1dot5rem"/>
    </button>


    <Sortable
            bind:list={list}
            {key}
            on:sort={sortList}
            let:item={item}>

        <div class="d-flex justify-content-between align-items-center my-4">
            <div class="row-id">
                {item.row}
            </div>

            <div class="d-flex justify-content-between align-items-center">
                {#each Object.values(item.fields) as field, idf (field.field + item.row)}
                    <Field_Wrapper class="mx-1" field="{field}" on:field-changed="{e => fieldsUpdate(item.row, e.detail) }"/>
                {/each}
            </div>

            <div class="add-cursor" on:click="{() => deleteRow(item.row)}">
                <Icon icon='{getContext("iconDelete")}' class="text-1dot5rem has-text-danger"/>
            </div>
        </div>

    </Sortable>

</fieldset>


<style>

    .row-id {
        display: inline-flex;
        padding: 0.25rem;
        background-color: #EEE;
        border-radius: 50%;
        min-width: 2rem;
        margin-right: 0.5rem;
        justify-content: center;
        align-items: center;
    }

    .btn-rounded {
        border-radius: 50%;
        padding: 0.25rem;
        width: 2.5rem;
    }

</style>
