<script>
    /**
     * Grid to list documents and fields for docs.
     *
     * @memberof Components:List
     * @function listGrid
     * @locus Client
     * @isTemplate true
     *
     * @param  {Object} config - decoration for table
     * @param  {Array}  labels
     * @param  {Array}  documents
     * @param  {String} collection
     * @param  {Boolean} submitted
     *
     * @returns nothing
     *
     */

    //* props
    export let config = {};
    export let labels = [];
    export let documents = {};
    export let collection = "";
    export let submitted = false

    //* support functions
    import {onMount, onDestroy, getContext} from 'svelte'
    import Icon from '/imports/components/elements/icon.svelte'
    import {elements} from '/imports/client/setup/systemGlobals'
    import {createEventDispatcher} from 'svelte';
    const dispatch = createEventDispatcher();

    import {dotNotation} from '/imports/functions/dotNotation'
    import {timeAgo} from '/imports/functions/timeAgo'


    //* local reactive variables
    let EDIT_COLOR = elements.EDIT_COLOR;               // set color when item is in edit mode

    let TAGS = {                                        // sets background label colour for "tag" cell
        Image: "label-success",
        Trigger: "label-info",
        Message: "label-primary",
        Logs: "label-warning",
        System: "label-danger",
        Default: "label-default",
    };


    let inEdit = false;
    let bgEdit = "";
    let currRow = "";
    let actRow = "";
    let submit = submitted;
    //let width = config && config.dispWidth ? config.dispWidth : "is-6";

    let width =  "is-6";
    let notice = "default grid"

    function deleteDoc(id) {
        dispatch('item-delete', {
            id: id,
        });
    }

    function editDoc(id) {
        let same = (id === actRow);
        actRow = same ? actRow : id;
        inEdit = !inEdit;

        if (same) {
            currRow = inEdit ? id : "";
        } else {
            currRow = id;
            inEdit = true;
        }

        dispatch('item-edit', {
            id: currRow,
            edit: inEdit
        });
    }

    function launchPage(id) {
        console.log("launchPage", id, config.target, window.location);

        let page = window.location.origin + config.target + "?q=" + id;
        window.open(page);
    }

    //* build array of array of display objects
    function tableItems(coll, fields, docs) {
        let out = [];

        //** prepare document for display listing and get info for each field to display
        docs.forEach(function (els) {
            let tr = [];
            let values = els;
            values.updatedAt = els.updatedAt;

            fields.forEach(function (el) {
                let val = dotNotation(values, el.key);

                switch(true){

                    //*** "users" is a special case
                    case coll === "users" && el.key === "emails":
                        val = val && val[0] ? val[0].address : "ex@example.com";
                        break;

                    case el.key === "tag":
                        val = values.data && values.data.event ? values.data.event : val;
                        break;

                    case ["updatedAt", "createdAt", "data.time", "timeStamp"].includes(el.key):
                        val = timeAgo(val);
                        break;

                    case el.type === "object":
                        val = JSON.stringify(val).replace(/,/g, ", ");
                        break;
                }

                let base = el.base ? el.base : "";

                tr.push({
                    id: values._id,
                    type: el.type,
                    value: val,
                    base: base,
                    url: base + val,
                    keyName: el.label,
                });
            });

            out.push(tr);
        });

        return out;
    }

</script>


<div>
    <div class="columns is-multiline">
        {#each tableItems(collection, labels, documents) as row, idx}
            <div class="column {width}">

                <div class="card">
                    <div class="card-content">
                        {#if notice}
                            <div class="p-1 has-background-white-ter">{notice}</div>
                        {/if}

                        {#each row as cell, idx}
                            {#if cell.type === 'pict'}
                                <div class="card-image" style="margin: -1.5rem -1.5rem 1.5rem -1.5rem">
                                    <figure class="image is-2by1">
                                        <img src="{cell.url}"  alt="image">
                                    </figure>
                                </div>

                            {:else if cell.type === 'edit'}
                                <div on:click="{ () => editDoc(cell.id) }"
                                     style="word-wrap: break-word; word-break: break-all;"
                                     class="add-cursor has-text-info has-text-weight-semibold text-left">

                                    {cell.value}
                                </div>

                            {:else if cell.type === 'newpage'}
                                <div on:click="{ () => launchPage(cell.id) }"
                                     style="word-wrap: break-word; word-break: break-all;"
                                     class="add-cursor has-text-info has-text-weight-semibold text-left">

                                    {cell.value}
                                </div>

                            {:else if cell.type === 'text'}
                                <div class="has-text-left is-size-7">
                                    <strong>{cell.keyName}:</strong> {cell.value}
                                </div>

                            {:else if cell.type === 'object'}
                                <div>{cell.value}</div>

                            {:else if cell.type === 'boolean'}
                                <div class="text-green text-center">
                                    <span>{cell.value ? "&#10004;" : ""}</span>
                                </div>

                            {:else if cell.type === 'del'}
                                <div on:click="{ () => deleteDoc(cell.value)}"
                                     class="add-cursor has-text-right" style="max-width: 100%;">

                                    <span>
                                        <Icon icon='{getContext("iconDelete")}' class="text-1dot5rem has-text-danger"/>
                                    </span>
                                </div>

                            {:else}
                                <div>n/a</div>
                            {/if}

                        {/each}
                    </div>
                </div>

            </div>
        {/each}
    </div>
</div>
