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
    import {deepClone} from '/imports/functions/deepClone'
    import {generateId} from '/imports/functions/generateId'
    import Icon from '/imports/components/elements/icon.svelte'
    import Field_Wrapper from '/imports/components/formBuilder/fieldWrapper.svelte'
    import Sortable from '/imports/components/blocks/rowDragDrop.svelte'
    import {getContext,  setContext, createEventDispatcher} from 'svelte';
    const dispatch = createEventDispatcher();


    //* local reactive variable

    //** get field set-up and prepare out going object that contains first default values and user entry values
    const fieldsArray = field.params && field.params.config ? field.params.config : {};
    let rowDefault ={};
    let rowValues = {};

    resetRow(fieldsArray);

    let list = [];
    let key = field.params.key;

    const rowUniq = generateId(8);
    let editing = false;

    //* set new formText context for embedded formWrapper
    let formText = getContext("formText");
    let rowText = formText[field.field] && formText[field.field].rowText ? formText[field.field].rowText : null;
    let rowTextLabels = Object.values(rowText);

    if(rowText){
        setContext("formText", rowText);
    }

    $: setValue(field.value);


    //* functions that mutate local variables
    function resetRow(fieldArray){
        let fa = deepClone(fieldArray);

        rowValues = {};
        Object.entries(fa).forEach( (fa) => {
            rowValues[ fa[0] ] = fa[1].defaultValue;
        });

        rowDefault = Object.values(fa);
    }


    function setValue(val){
        list = val ? val : [];

        console.log("setValue", list);
    }

    function updateList(newList){
        let updated = newList.map( (nl, idx) =>  {
            nl.id = idx + 1;
            return nl;
        });

        list = updated;
        dispatch('on-inputentry', {value: list, error: false});
    }

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


    function updateElement(item, prop, value) {
        item[prop] = value;
        updateList(list);
    }


    function sortList(ev){
        let newList = ev.detail;
        updateList(newList)
    }



    function fieldsUpdate(msg) {
        let change = msg.detail;
        rowValues[change.field] = change.value;
    }

    function addRow() {
        let idx = list && list.length ? list.length + 1 : 1;     // default "id" value
        list = [...list, {id: idx, info: rowValues}];
        resetRow(fieldsArray);
    }

    function editRow(msg) {
        editing = true;
        let test = list.find(row => row.id === msg);

        if(test){
            let temp = rowDefault;
            temp.forEach(row => row.value = test.info[row.field] );
            rowDefault = temp;
            rowValues = test.info;
        }
    }

    function returnRow(msg) {
        let test = list.find(row => row.id === msg.detail);

        if(test){
            list[msg.detail - 1].info = rowValues;
        }
        resetRow(fieldsArray);
        editing = false;
    }

    function deleteRow(rowid) {
        let temp = list
        temp = temp.filter(row => row.id !== rowid);
        list = temp;
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

            <div class="column is-1 add-cursor" on:click="{() => editRow(item.id)}">
                <Icon icon='{getContext("iconEdit")}' class="text-1dot5rem"/>
            </div>

            <div class="column">
                <div class="level">

                {#each Object.values(item.info) as field}
                    <div class="mx-2">{field}</div>
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
                    {#each rowDefault as field, idf (field.field)}
                        <div class="column">
                            <Field_Wrapper field="{field}" on:field-changed="{fieldsUpdate}"/>
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
