<script>
    /**
     * Grid to list documents and fields for docs.
     *
     * @memberof Pages:Starter
     * @function starter_grid
     * @locus Client
     * @augments starter_list
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

    // get the user language preference from store
    import {lang} from '/imports/client/systemStores'

    //* support functions
    import {onMount, onDestroy, getContext} from 'svelte'
    import Icon from '/imports/components/elements/icon.svelte'
    import {elements} from '/imports/both/systemGlobals'
    import {createEventDispatcher} from 'svelte';
    const dispatch = createEventDispatcher();

    import {i18n} from '/imports/functions/i18n'
    import {dotNotation} from '/imports/functions/dotNotation'
    import {timeAgo} from '/imports/functions/timeAgo'


    //* local reactive variables
    let calendar = i18n( getContext("commonText"), "calendar", $lang);
    let width =  "is-6-tablet is-4-desktop is-3-widescreen";
    let notice = "starter grid"

    let inEdit = false;
    let bgEdit = "";
    let currRow = "";
    let actRow = "";
    let submit = submitted;

    let items = [];

    $: items = tableItems(collection, labels, documents);

    //* event handlers
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

    function formatDate(isoDate ,cal) {
        let date = new Date();
        if (isoDate) {
            date = new Date(isoDate);
        }

        //** get common calendar text and adjust for language preference
        return `${cal.months[date.getMonth()].name} ${date.getDate()}, ${date.getFullYear()}`;
    }

    //* build array of array of display objects
    function tableItems(coll, fields, docs) {
        let out = [];

        //** prepare document for display listing and get info for each field to display
        docs.forEach(function (els) {
            let tr = {};
            let values = els;
            values.updatedAt = els.updatedAt;

            fields.forEach(function (el) {
                let val = dotNotation(values, el.key);

                //*** "users" is a special case
                if (coll === "users") {
                    if (el.key === "emails") {
                        val = val && val[0] ? val[0].address : "ex@example.com";
                    }
                }

                //*** convert timestamps to relative time string
                switch(el.key){
                    case "updatedAt":
                    case "createdAt":
                    case "data.time":
                    case "timeStamp":
                        val = timeAgo(val);
                        break;

                    case "tag":
                        val = values.data && values.data.event ? values.data.event : val;
                        break;

                    case "object":
                        val = JSON.stringify(val).replace(/,/g, ", ");
                        break;

                }

                tr[el.key] = {
                    id: values._id,
                    type: el.type,
                    value: val,
                    keyName: el.label,
                };
            });

            out.push(tr);
        });

        return out;
    }

</script>


<div>
    <div class="columns is-multiline">

        {#each items as row, idx}
            <div class="column {width}">

                <div class="card" style="overflow: hidden;">

                    {#if row.startImage &&  row.startImage.value && row.startImage.value.src}
                        <div class="card-image" >
                            <figure class="image is-3by1">
                                <img src="{row.startImage.value.src}"  alt="image">
                            </figure>
                        </div>

                    {:else}
                        {#if notice}
                            <div class="mb-3 pl-2 has-background-white-ter">{notice}</div>
                        {/if}
                    {/if}

                    <div class="card-content">
                        {#each  Object.values(row) as cell, idx}

                            {#if cell.type === 'edit'}
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

                            {:else if cell.type === 'text' || cell.type === 'select' || cell.type === 'timeStamp'}
                                <div class="has-text-left">
                                    {cell.prefix ? cell.prefix : ""}{cell.value}{cell.suffix ? cell.suffix : ""}
                                </div>

                            {:else if cell.type === 'date' }
                                <div class="has-text-left list-date">
                                    {formatDate(cell.value, calendar)}
                                </div>


                            {:else if cell.type === 'address'}
                                <div class="d-flex">
                                    {#if typeof cell.value === "string"}
                                        <strong>{cell.keyName}:</strong> {cell.value}
                                    {:else}

                                        {#if cell.value && cell.value.coordinates}
                                            <strong>{cell.keyName}:</strong>
                                            <div>
                                                <div>{cell.value.coordinates[0]}, </div>
                                                <div>{cell.value.coordinates[1]}</div>
                                            </div>
                                        {/if}
                                    {/if}
                                </div>

                            {:else if cell.type === 'boolean'}
                                <div class="text-green text-center">
                                    <strong>{cell.keyName}:</strong> <span>{cell.value ? "&#10004;" : ""}</span>
                                </div>

                            {:else if cell.type === 'del' }

                            {:else if cell.type === 'cardImage' }

                            {:else}
                                <strong>{cell.keyName}:</strong> <span>n/a</span>
                            {/if}

                        {/each}
                    </div>
                </div>

            </div>
        {/each}
    </div>
</div>
