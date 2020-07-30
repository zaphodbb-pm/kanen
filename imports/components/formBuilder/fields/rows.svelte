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
    //resetRow(fieldsArray);

    list[0] = initialRow(fieldsArray);


    console.log("initial list", list);

    //** when editing a form document, load value from document
    $: setValue(field.value);


    //* functions that mutate local variables
    function setValue(val){
        list = val ? val : [];
    }

    function sortList(ev){
        let newList = ev.detail;
        updateList(newList)
    }

    function updateList(newList){

        let updated = newList.map( (nl, idx) =>  {
            nl.id = idx + 1;
            return nl;
        });

        list = updated;

        console.log("updateList", newList, list);

        //dispatch('on-inputentry', {value: list, error: false});
    }



    function fieldsUpdate(row, msg) {
        //let change = msg.detail;

        console.log("fieldsUpdate", row, msg);

        rowValues[msg.field] = msg.value;

        list[row] =  rowValues;

        console.log("rowValues", rowValues, list);

    }


    function addRow() {
        let idx = list && list.length ? list.length + 1 : 1;     // default "id" value
        list = [...list, {id: idx, info: rowValues}];

        updateList(list);
        //resetRow(fieldsArray);
    }



    /*
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
    */




    /*
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
    */


    /*
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
    */


/*
    function deleteRow(rowid) {
        let temp = list
        temp = temp.filter(row => row.id !== rowid);
        list = temp;

        updateList(list);
    }

 */


    function deleteRow(rowid) {
        let newList = list;
        newList = newList.filter(row => row.id !== rowid);
        updateList(newList)
    }


    function resetRow(fieldArray){
        let fa = deepClone(fieldArray);

        rowValues = {};
        Object.entries(fa).forEach( (fa) => {
            rowValues[ fa[0] ] = fa[1].defaultValue;
        });

        rowDefault = Object.values(fa);
    }



    function initialRow(fieldArray){
        let fa = deepClone(fieldArray);

        let rowVal = {};

        Object.entries(fa).forEach( (fa, idf) => {
            //rowVal[ fa[0] ] = fa[1].defaultValue;

            rowVal[ fa[0] ] = fa[1];
            rowVal[ fa[0] ].id = idf;

        });

        return rowVal;
    }








    //* event handlers





    /*
    function updateElement(item, prop, value) {
        item[prop] = value;
        updateList(list);
    }
*/






</script>



<fieldset class="box field-rows">

    <button class="button btn-rounded is-primary mb-3" on:click|preventDefault="{addRow}">
        <Icon icon='{getContext("iconRowAdd")}' class="text-1dot5rem"/>
    </button>


    <Sortable
            bind:list={list}
            key={field.params.key}
            on:sort={sortList}
            let:item={item}>

        <div class="d-flex justify-content-between align-items-center my-4">

            <div class="row-id">
                {item.id}
            </div>

            <div class="d-flex justify-content-between align-items-center">
                {#each item as field, idf (field.field)}
                    <Field_Wrapper class="mx-1" field="{field}" on:field-changed="{e => fieldsUpdate(item.id, e.detail) }"/>
                {/each}
            </div>

            <div class="add-cursor" on:click="{() => deleteRow(item.id)}">
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
