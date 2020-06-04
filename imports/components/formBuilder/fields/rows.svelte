<script>
    /**
     * Row container for other input types.
     *
     * @memberof Components:Form
     * @function rows
     * @locus Client
     * @augments fieldWrapper
     *
     * @param {Object} field
     *
     * @emits: 'on-inputentry' {value: value, error: errorVal} - value {Object} of field values
     *
     * @notes
     *   Field types that can bet set:
     *      td0 = input field - typically text, but can be other types
     *      td1 = input field - typically number, but can be other types
     *      td2 = input field - typically number, but can be other types
     *      td3 = switch
     *      td4 = time select widget - set for 15 minute increments
     *      td5 = static select - requires list of values
     *      td6 = static select - requires list of values
     *      td7 = dynamic select or dynamic typeahead - requires target collection to fetch list items
     *
     *   If a field item is null, then this table cell will not show.
     */


    //* common props from parent
    export let field = {};

    //* support functions
    import {generateId} from '/imports/functions/generateId'
    import Icon from '/imports/components/elements/icon.svelte'
    import Field_Wrapper from '/imports/components/formBuilder/fieldWrapper.svelte'
    import Sortable from '/imports/components/blocks/rowDragDrop.svelte'
    import {getContext,  setContext, createEventDispatcher} from 'svelte';
    const dispatch = createEventDispatcher();



    //* local reactive variable
    const fieldsArray = field.params && field.params.config ? field.params.config : {};

    console.log("params", field, fieldsArray);


    let list = [];
    let key = field.params.key;

    let rows = [];
    const rowUniq = generateId(8);

    let rowInEdit = "";
    let editing = false;



    //* set new formText context for embedded formWrapper
    let formText = getContext("formText");
    let rowText = formText[field.field] && formText[field.field].rowText ? formText[field.field].rowText : null;

    let rowTextLabels = Object.values(rowText);


    /*
    list = [
        {id: 1, info: fieldsArray},
        {id: 2, info: fieldsArray},
        {id: 3, info: fieldsArray},
    ];
    */


    if(rowText){
        setContext("formText", rowText);

        console.log("rowText", rowText);
    }

    //const params = field.params.config.config;

    /*
    let td0_value = params && params.td0 && params.td0.defaultValue ? params.td0.defaultValue  : "";
    let td1_value = params && params.td1 && params.td1.defaultValue ? params.td1.defaultValue  : "";
    let td2_value = params && params.td2 && params.td2.defaultValue ? params.td2.defaultValue  : "";
    let td3_value = params && params.td3 && params.td3.defaultValue ? params.td3.defaultValue  : false;
    let td4_value = params && params.td4 && params.td4.defaultValue ? params.td4.defaultValue  : "";
    let td5_value = params && params.td5 && params.td5.defaultValue ? params.td5.defaultValue  : {_id: "none", name: ""};
    let td6_value = params && params.td6 && params.td6.defaultValue ? params.td6.defaultValue  : {_id: "none", name: ""};
    let td7_value = params && params.td7 && params.td7.defaultValue ? params.td7.defaultValue  : {_id: "none", name: ""};
*/


    $: setValue(field.value);


    //* functions that mutate local variables
    function setValue(val){
        rows = val ? val : [];


        console.log("rows", field);
    }


    function updateList(newList){
        let updated = newList.map( (nl, idx) =>  {
            nl.id = idx + 1;
            return nl;
        });

        list = updated;
        dispatch('on-inputentry', {value: list, error: false});
    }




    /*
    import {i18n} from '/imports/client/functions/func-i18n'
    import {generateId} from '/imports/both/functions/func-generateId'

    import VueInputs from '../fieldTypes/vue-inputs'
    import VueSelects from '../fieldTypes/vue-selects'
    import VueSwitch from '../fieldTypes/vue-switch'
    import VueTimePicker from '/imports/client/components/vues-widgets/vue-timePicker'
    import VueTypeahead from '../fieldTypes/vue-typeahead'
    import VueTypeaheadSearch from '../fieldTypes/vue-typeaheadSearch'

    import {Container, Draggable} from 'vue-smooth-dnd'

     */


    function formatNumber(val, comp) {
        let value = val;
        let attr = params[comp] && params[comp].attributes ? params[comp].attributes : null;

        if (attr && attr.type && (attr.type === "number")) {
            value = parseFloat(value);

            if (attr.step && Number.isInteger(attr.step)) {
                value = Math.round(value);
            }
        }

        return value;
    }

    function formatTime(val, comp){
        //** check for valid time string
        if(typeof val !== 'string' || !val.includes(":")){
            return "";
        }

        //** convert 24 hour time to 12 hour time plus suffix for displaying only
        let ampm = params[comp] && params[comp].config && params[comp].config.hr12 ? params[comp].config.hr12 : false;

        let frag = val.split(":");
        let hr = parseInt( frag[0] );
        let min = parseInt( frag[1] );
        let suffix = ampm ? ( (hr <= 12) ? "am" : "pm" ) : "";

        if (hr > 12 && ampm) {
            hr = hr - 12;
        }

        if (hr < 10 && !ampm) {
            hr = "0" + hr.toString();
        }

        //* add leading zero to minutes
        if (min < 10) {
            min = "0" + min.toString();
        }

        return `${hr}:${min} ${suffix}`
    }




    function tdUpdate(msg) {
        console.log("tdUpdate", msg.detail);

        console.log("tdUpdate array", fieldsArray);



        //td0_value = msg;
    }






    function resetRow() {
        editing = false;

        console.log("resetRow")

        /*
        td0_value = "";
        td1_value = 0;
        td2_value = 0;
        td3_value = false;
        td4_value = "";
        td5_value = {_id: "none"};
        td6_value = {_id: "none"};
        td7_value = {_id: "none"};

         */
    }


    function setRow(id) {

        console.log("setRow")


        /*
        let out = {
            id: id,
            td0: formatNumber(td0_value, "td0"),
            td1: formatNumber(td1_value, "td1"),
            td2: formatNumber(td2_value, "td2"),
            td3: td3_value,
            td4: td4_value,
            td5: td5_value,
            td6: td6_value,
            td7: td7_value,
        };

        //** build an id from the value of an input field directed by the config file
        if (params._id) {
            out.id = out[params._id].replace(/\s+/g, '').toLowerCase();
        }

        return out;

         */
    }

    function addRow() {
        let idx = rows && rows.length ? rows.length + 1 : 1;     // default "id" value

        console.log("addRow", idx);


        /*

        rows.push(setRow(idx));
        emitValues();
        resetRow();

         */
    }

    function updateRow(msg) {
        editing = true;

        console.log("updateRow", msg);



        /*
        let test = rows.filter(row => row.id === msg);

        td0_value = formatNumber(test[0].td0, "td0");
        td1_value = formatNumber(test[0].td1, "td1");
        td2_value = formatNumber(test[0].td2, "td2");
        td3_value = test[0].td3;
        td4_value = test[0].td4;
        td5_value = test[0].td5;
        td6_value = test[0].td6;
        td7_value = test[0].td7;
        rowInEdit = test[0].id;

         */
    }

    function returnRow() {
        let edit = rowInEdit;

        console.log("returnRow", edit)


        if (edit) {
            /*
            rows = rows.map(row => {
                if (row.id === edit) {
                    return this.setRow(edit);

                } else {
                    return row;
                }
            });
            */

            emitValues();
            resetRow();
        }
    }

    function deleteRow(rowid) {

        rows = rows.filter(row => row.id !== rowid);
        emitValues();

        console.log("deleteRow", rowid, rows);
    }


    /*
    function dropRow(dropResult) {
        const {removedIndex, addedIndex, payload} = dropResult;

        if (removedIndex !== null || addedIndex !== null) {
            const result = [...rows];
            let itemToAdd = payload;

            if (removedIndex !== null) {
                itemToAdd = result.splice(removedIndex, 1)[0];
            }

            if (addedIndex !== null) {
                result.splice(addedIndex, 0, itemToAdd);
            }

            rows = result;
            emitValues();
        }
    }
*/

    /*
    function td0_update(msg) {
        td0_value = msg;
    }

    function td1_update(msg) {
        td1_value = msg;
    }

    function td2_update(msg) {
        td2_value = msg;
    }

    function td3_update(msg) {
        td3_value = msg;
    }

    function td4_update(msg) {
        td4_value = msg;
    }

    function td5_update(msg) {
        td5_value = msg;
    }

    function td6_update(msg) {
        td6_value = msg;
    }

    function td7_update(msg) {
        td7_value = msg;
    }

     */


    function emitValues() {


        console.log("emitValues");


        /*
        let out = rows.map(row => {
            return {
                id: row.id,
                td0: formatNumber(row.td0, "td0"),
                td1: formatNumber(row.td1, "td1"),
                td2: formatNumber(row.td2, "td2"),
                td3: row.td3,
                td4: row.td4,
                td5: row.td5,
                td6: row.td6,
                td7: row.td7
            }
        });

        dispatch('on-inputentry', out);

         */
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



<fieldset class="box field-rows">

    <div class="columns">
        <div class="column is-offset-2 is-9">
            <div class="level">
                {#each Object.values(rowText) as row}
                    <div class="has-text-weight-bold">{row.label}</div>
                {/each}
            </div>
        </div>
    </div>


    <Sortable
            bind:list={list}
            key={field.params.key}
            on:sort={sortList}
            let:item={item}>

        <div class="columns">
            <div class="column is-1 add-cursor has-text-info">
                <Icon icon='{getContext("iconDrag")}' class="text-1dot5rem"/>
            </div>

            <div class="column is-1 add-cursor" on:click="{() => updateRow(item.id)}">
                <Icon icon='{getContext("iconEdit")}' class="text-1dot5rem"/>
            </div>

            <div class="column">
                <div class="level">
                {#each Object.values(item.info) as field}
                    <div class="mx-2">{field.field}</div>
                {/each}
                </div>
            </div>

            <div class="column is-1 add-cursor" on:click="{() => deleteRow(item.id)}">
                <Icon icon='{getContext("iconDelete")}' class="text-1dot5rem has-text-danger"/>
            </div>
        </div>

    </Sortable>



    <div class="buffer has-background-white-ter">
        <div class="columns">

            <div class="column">
                <div class="columns">
                    {#each  Object.values(fieldsArray) as field, idf (field.field)}
                        <div class="column">
                            <Field_Wrapper field="{field}" on:field-changed="{tdUpdate}"/>
                        </div>
                    {/each}
                </div>
            </div>

            <div class="column is-1 add-cursor has-text-info" class:is-hidden={editing} on:click="{addRow}">
                <Icon icon='{getContext("iconRowAdd")}' class="text-1dot5rem"/>
            </div>

            <div class="column is-1 add-cursor has-text-success" class:is-hidden={!editing} on:click="{returnRow}">
                <Icon icon='{getContext("iconEditDone")}' class="text-1dot5rem"/>
            </div>

        </div>
    </div>

</fieldset>
