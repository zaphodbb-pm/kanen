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

    //* support functions
    import {onMount, onDestroy, getContext} from 'svelte'
    import {createEventDispatcher} from 'svelte';
    const dispatch = createEventDispatcher();

    import {dotNotation} from '/imports/functions/dotNotation'
    import {timeAgo} from '/imports/functions/timeAgo'


    //* props
    export let config = {};
    export let labels = [];
    export let documents = {};
    export let collection = "";
    export let submitted = false

    //* local reactive variables

    //let DELETE = icons.DELETE;                           // standard trash can delete icon
    //let VIEW = icons.VIEW;                               // icon holds link to another page
    let EDIT_COLOR = "#fcf8e3";                          // set color when item is in edit mode

    let TAGS = {                                         // sets background label colour for "tag" cell
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
    let width = config && config.dispWidth ? config.dispWidth : "is-6";




    /*
                submitted() {
                if (this.submitted) {
                    this.currRow = "";
                    this.actRow = "";
                    this.inEdit = false;
                    this.submit = false;
                }
            },
     */




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

        let page = window.location.origin + "/" + this.config.target + "?q=" + id;

        window.open(page);
    }


    //* inserts table (th) header labels
    function tableLabels() {
        let start = labels;
        let labels = [];

        start.forEach(function (el) {
            if (el.label) {
                let css = el.type && el.type === "del" ? "has-text-centered" : "";
                labels.push({label: el.label, css: css});
            }
        });

        return labels;
    }

    //* build array of array of display objects
    function tableItems() {
        let out = [];
        let docs = documents;
        let fields = labels;

        //** prepare document for display listing and get info for each field to display
        docs.forEach(function (els) {
            let tr = [];
            let values = els;
            values.updatedAt = els.updatedAt;

            fields.forEach(function (el) {
                let val = dotNotation(values, el.key);

                //*** "users" is a special case
                if (this.collection === "users") {
                    if (el.key === "emails") {
                        val = val && val[0] ? val[0].address : "ex@example.com";
                    }
                }

                //*** convert timestamps to relative time string
                if (el.key === "updatedAt") {
                    val = timeAgo(val);
                }
                if (el.key === "createdAt") {
                    val = timeAgo(val);
                }
                if (el.key === "data.time") {
                    val = timeAgo(val);
                }
                if (el.key === "timeStamp") {
                    val = timeAgo(val);
                }
                if (el.key === "tag") {
                    val = values.data && values.data.event ? values.data.event : val;
                }
                if (el.type === "object") {
                    val = JSON.stringify(val).replace(/,/g, ", ");
                }

                let base = el.base ? el.base : "";

                tr.push({
                    id: values._id,
                    type: el.type,
                    value: val,
                    base: base,
                    url: base + val
                });
            });

            out.push(tr);
        });

        return out;
    }
</script>


<div>
    default grid

    <div class="columns is-multiline">
        {#each tableItems as row}
            <div class="column is-6 is-4-desktop is-3-widescreen">

                <div class="card">
                    <div class="card-content">
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
                                <div class="has-text-left">
                                    <strong>{tableLabels[idx].label}:</strong> {cell.value}
                                </div>


                            {:else if cell.type === 'object'}
                                <div>{cell.value}</div>

                            {:else if cell.type === 'boolean'}
                                <div class="text-green text-center">
                                    <span>{cell.value ? "&#10004;" : ""}</span>
                                </div>

                            {:else if cell.type === 'del'}
                                <div  on:click="{ () => deleteDoc(cell.value)}"
                                     class="add-cursor has-text-centered" style="max-width: 10%;">

                                    <span><i class="DELETE"></i></span>
                                </div>
                            {/if}}

                        {/each}
                    </div>
                </div>

            </div>
        {/each}
    </div>
</div>
