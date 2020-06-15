<script>
    /**
     * Static and dynamic select field.
     *
     * @memberof Components:Form
     * @function selects
     * @locus Client
     * @augments formWrapper
     *
     * @param {Object} field
     * @param {Object} field.params1 - {type: "staticSelect", colours: true}
     * @param {Object} field.params2 - {type: "dynamicSelect", coll: "starter", filter: {fields: {name: 1}}, options: {sort: {name: 1}} }
     *
     * @emits: 'on-inputentry' {value: value, error: false} with array of objects
     *
     * @notes
     *  params- {type, coll, field, filter} object provides behaviour information:
     *      params: {type: "staticSelect"} - uses array of objects from the associated text file
     *
     *      params: {type: "dynamicSelect", coll: "companies", query: {}, filter: {fields: {name: 1}, sort: {name: 1}} }
     *          - retrieves all "companies" name field as an array for the select operation
     *
     *      params: {type: "dynamicSelectArray", coll: "companies", query: {}, field: "departments, filter: {fields: {departments: 1}} }
     *          - finds one document from "companies" and extracts the field and builds an array for the select operation
     *          - note that the retrieval will automatically query with {tenantId: user.tenantId}
     *
     *      params: {type: "dynamicSelectRow", coll: "companies", query: {}, field: "locations, filter: {fields: {locations: 1}} }
     *          - finds one document from "companies" and extracts the field row and builds an array for the select operation
     *          - note that the retrieval will automatically query with {tenantId: user.tenantId}
     *
     */


    //* common props from parent
    export let field = {};

    //* support functions
    import {getDocs} from '/imports/functions/getDocs'
    import Icon from '/imports/components/elements/icon.svelte'
    import {getContext, createEventDispatcher} from 'svelte';
    const dispatch = createEventDispatcher();
    let formText = getContext("formText");
    let source = formText[field.field] && formText[field.field].selects ? formText[field.field].selects : [];
    let firstOption = formText[field.field] && formText[field.field].tag ? formText[field.field].tag : "";


    //* local reactive variable
    let selValue = "";
    let showColours = !!(field.params && field.params.colours);
    let activeColour = "#dbdbdb";

    let selects = [];
    setSelects();

    $: setValue(field.value);


    //* event handlers
    function emitSelect(selId) {
        let item = source.find( (s) => s._id === selId );       // get text for _id values
        let colour = item && item.colour ? item.colour : null;
        let out = colour ? {_id: item._id, name: item.name, colour: colour} : {_id: item._id, name: item.name};

        activeColour = colour;
        dispatch('on-inputentry', {value: out, error: false}  );
    }

    //* functions that mutate local variables
    function setValue(val){
        selValue = val._id;
        activeColour = val && val.colour ? val.colour : "#dbdbdb";
    }

    function setSelects() {
        let type = field.params && field.params.type ? field.params.type : false;
        let filter = field.params && field.params.filter ? field.params.filter : {};
        let query = field.params && field.params.query ? field.params.query : {};

        switch (true) {
                //** a database dip has a long latency; use promises / await to synchronize updates
                //** async functions in Vue do NOT play happily with normal code
            case (type && type === "dynamicSelect"):
                getSelects(field.params.coll, query, filter);
                break;

            case (type && type === "dynamicSelectArray"):
                getSelectsField(field.params.coll, query, filter, "array");
                break;

            case (type && type === "dynamicSelectRow"):
                getSelectsField(field.params.coll, query, filter, "row");
                break;

            default:
                selects = source ? source : [];
        }
    }


    async function getSelects(coll, query, filter) {
        let out = await getDocs(coll, "select", query, filter);

        if (out) {
            out = out.map(function (s) {
                if (coll === "users") {
                    return {_id: s._id, name: s.username};
                } else {
                    return {_id: s._id, name: s.name};
                }
            });
        }

        let prepend = field.params && field.params.prepend ? field.params.prepend : null;
        if(prepend){
            out.unshift(prepend)
        }

        selects = out ? out : [];
        source = out ? out : [];
    }

    async function getSelectsField(coll, query, filter, type) {
        let field = field.params && field.params.field ? field.params.field : null;
        let docs = await getDocs(coll, "oneAllFields", query, filter);

        if (field) {
            if (type && type === "array") {
                source = docs[field];
            }

            if (type && type === "row") {
                source = docs[field].map((r) => {
                    return {_id: r.id, name: r.td0}
                });
            }
        }
    }

</script>


<div class="select {field.css}">
    <select class="{showColours ? 'has-status-icon' : ''}"
            {...field.attributes}
            bind:value="{selValue}"
            on:change="{() => emitSelect(selValue) }">


        <option disabled value="{firstOption._id}">{firstOption.name}</option>

        {#each selects as optSelect}
            <option value="{optSelect._id}">
                {optSelect.name}
            </option>
        {/each}

    </select>

    {#if showColours}
        <div class="is-status-icon" style="color: {activeColour};">
            <Icon icon='{getContext("iconStatus")}' class="text-1dot5rem"/>
        </div>
    {/if}

</div>




<style>

    .has-status-icon {
        padding-left: 2.25em;
    }

    .is-status-icon {
        display: inline-flex;
        justify-content: center;
        align-items: center;
        z-index: 4;

        height: 2.5em;
        pointer-events: none;
        position: absolute;
        top: 0;
        left: 0;
        width: 2.5em;
    }

</style>
