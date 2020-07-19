<script>
    /**
     * Table to list documents and fields for docs.
     *
     * @memberof Components:List
     * @function listTable
     * @locus Client
     * @augments listHolder
     *
     * @param  {Object} config - decoration for table
     * @param  {Array}  labels
     * @param  {Array}  documents
     * @param  {String} collection
     * @param  {Boolean} submitted
     *
     * @returns nothing
     *
     * @notes
     *      Column types:
     *              "check" - checkbox
     *              "tag" - coloured box with label
     *              "id" - has document id
     *              "link" - active url to new page
     *              "edit" - sends doc info to be edited
     *              "modal" - sends doc info to modal for detailed display
     *              "modalUser" - sends doc info to then fetch user info
     *              "text" - plain text display
     *              "select" - gets "name" field value
     *              "date" - formatted date display text
     *              "phone" - formatted phone number with link to phone application
     *              "email" - formatted email with link to email application
     *              "status" - dot and text status display
     *              "newpage" - launch new page in new tab
     *              "object" - stringified display of object
     *              "boolean" - check character if true
     *              "pict" - thumbnail picture
     *              "del" - trash can and docid of document to delete
     *
     */

    //* props
    export let config = {};
    export let labels = [];
    export let documents = [];
    export let collection = "";
    export let submitted = false;

    // get the user language preference from store
    import {lang} from '/imports/client/systemStores'

    //** support functions
    import {sysConfig, sysDebug} from '/imports/client/systemStores'
    import {getContext} from 'svelte';
    import Icon from '/imports/components/elements/icon.svelte'
    import {elements} from '/imports/both/systemGlobals'
    import {createEventDispatcher} from 'svelte';
    const dispatch = createEventDispatcher();

    import {i18n} from '/imports/functions/i18n'
    import {dotNotation} from '/imports/functions/dotNotation'
    import {timeAgo} from '/imports/functions/timeAgo'


    //* local reactive variables
    let calendar = i18n( getContext("commonText"), "calendar", $lang);
    let deleteText = i18n( getContext("commonText"), "confirmDelete", $lang);

    let EDIT_COLOR = elements.EDIT_COLOR;
    let tagColour = "is-info";                          // default tag colour
    let inEdit = false;
    let bgEdit = "";
    let currRow = "";
    let actRow = "";
    let submit = submitted;

    let confirmDelete = !!$sysConfig.confirmDelete;
    let confirm = null;

    let TAGS = {
        // sets background label colour for "tag" cell
        login: "is-info",
        logout: "is-warning",
        system: "is-danger",
        startup: "is-danger",
        default: "is-info",
    };

    $: releaseItem(submitted);


    //* event handlers
    function modalDoc(msg) {
        let showDoc = documents.find( (doc) =>  doc._id === msg);
        dispatch('item-modal', showDoc);
    }

    function modalUserDoc(msg) {
        let showDoc = documents.find( (doc) =>  doc._id === msg);
        dispatch('item-modal-user', showDoc);
    }

    function launchPage(msg) {
        let page = window.location.origin + config.target + "?q=" + msg.detail;
        window.open(page);
    }

    function confirmDel(msg) {
        confirm = msg;
    }

    function cancelDelete(){
        confirm = null;
    }

    function deleteDoc(msg) {
        dispatch('item-delete', {id: msg});
    }

    function releaseItem(msg){
        if(msg){
            hasSubmitted();
        }
    }


    //* functions that mutate local variables
    function hasSubmitted() {
        if (submitted) {
            currRow = "";
            actRow = "";
            inEdit = false;
            submit = false;
        }
    }

    function editDoc(msg) {
        let same = (msg === actRow);
        actRow = same ? actRow : msg;
        inEdit = !inEdit;

        if (same) {
            currRow = inEdit ? msg : "";
        } else {
            currRow = msg;
            inEdit = true;
        }

        dispatch('item-edit', {
            id: currRow,
            edit: inEdit
        });
    }


    //* pure functions
    function formatDate(isoDate ,cal) {
        let date = new Date();
        if (isoDate) {
            date = new Date(isoDate);
        }

        //** get common calendar text and adjust for language preference
        return `${cal.months[date.getMonth()].name} ${date.getDate()}, ${date.getFullYear()}`;
    }

    function formatPhoneNumber(str) {
        let cleaned = ('' + str).replace(/\D/g, '');                // Filter only numbers from the input
        let match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);  // Check if the input is of correct
        let out = "";

        if (match) {
            let intlCode = (match[1] ? '+1 ' : '');                  //Remove matched extension code and change to format for any country code.
            out = [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('');
        }

        return out;
    }

    function createInitials(name) {
        let parts = name.trim().split(" ");
        let part1a = parts[0] ? parts[0].charAt(0).toUpperCase() : "";
        let part1b = parts[0] ? parts[0].charAt(1) : "";
        let part2 = parts[1] ? parts[1].charAt(0).toUpperCase() : "";

        return part1a + (part2 ? part2 : part1b);
    }

    function tableLabels(start) {
        let labels = [];

        start.forEach(function (el) {
            if (el.label &&  !el.label.toLowerCase().includes("geo")) {
                let css = el.type && el.type === "del" ? "has-text-centered" : (el.css ? el.css : "");
                labels.push({label: el.label, css: css});
            }
        });

        return labels;
    }

    //* build array of array of display objects
    function tableItems(coll, fields, docs) {
        let out = [];

        //** prepare document for display listing and get info for each field to display
        docs.forEach(function (els) {
            let tr = [];
            let values = els;
            values.updatedAt = els.updatedAt;

            //*** create a set of initials if a "name" field exists
            let name = "az";
            if (els.name) {
                name = createInitials(els.name);
            }

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
                        val = val ? JSON.stringify(val).replace(/,/g, ", ") : "";
                        break;
                }

                let base = el.base ? el.base : "";

                tr.push({
                    id: values._id,
                    type: el.type,
                    value: val,
                    base: base,
                    url: base + val,
                    prefix: el.prefix ? el.prefix : "",
                    suffix: el.suffix ? el.suffix : "",
                    name: name,
                });

            });

            out.push(tr);
        });
        return out;
    }

</script>


<div class="table-container">

    <table class="table is-striped is-narrow is-hoverable is-fullwidth mt-3">
        <thead>
            <tr class="">
                {#each tableLabels(labels) as tl}
                    <th class="{tl.css}">{tl.label}</th>
                {/each}
            </tr>
        </thead>

        <tbody>
            {#each tableItems(collection, labels, documents) as row, idx}
                <tr  class="{row[0] && row[0].id && (currRow === row[0].id) ? 'EDIT_COLOR' : ''}" style="position: relative;">

                    {#each row as cell}

                        {#if cell.type === 'check'}
                            <td>
                                <input type="checkbox" class="checkbox" title="cell.value">
                            </td>

                        {:else if cell.type === 'tag' }
                            <td>
                                <span class="buffer-small">
                                    <span class="tag is-medium {TAGS[cell.value]}">
                                        <b>{cell.value}</b>
                                    </span>
                                </span>
                            </td>

                        {:else if cell.type === 'id' }
                            <td data-id="{cell.value}"></td>

                        {:else if cell.type === 'link' }
                            <td class="add-cursor">
                                <a href="{cell.url}" target="_blank">
                                    <span class="">
                                        <Icon icon='{getContext("iconView")}' class="text-1dot5rem"/>
                                    </span>
                                </a>
                            </td>

                        {:else if cell.type === 'edit' }
                            <td on:click="{ () => editDoc(cell.id) }"
                                style="word-wrap: break-word; word-break: break-all;"
                                class="add-cursor has-text-info has-text-weight-semibold text-left">

                                {cell.value}
                            </td>

                        {:else if cell.type === 'modal' }
                            <td on:click="{() => modalDoc(cell.id) }"
                                style="word-wrap: break-word; word-break: break-all;"
                                class="add-cursor has-text-link has-text-weight-semibold text-left">

                                {cell.value}
                            </td>

                        {:else if cell.type === 'modalUser' }
                            <td on:click="{ () => modalUserDoc(cell.id) }"
                                style="word-wrap: break-word; word-break: break-all;"
                                class="add-cursor has-text-link has-text-weight-semibold text-left">

                                {cell.value}
                            </td>

                        {:else if cell.type === 'text' || cell.type === 'select' || cell.type === 'timeStamp'}
                            <td class="has-text-left">
                                {cell.prefix}{cell.value}{cell.suffix}
                            </td>

                        {:else if cell.type === 'currency' }
                            <td class="has-text-right">
                                {cell.prefix}{cell.value.toFixed(2)}{cell.suffix}
                            </td>

                        {:else if cell.type === 'date' }
                            <td class="has-text-left list-date">
                                {formatDate(cell.value, calendar)}
                            </td>

                        {:else if cell.type === 'phone' }
                            <td class="has-text-left list-date">
                                <a href="'tel:' + {cell.value}">{formatPhoneNumber(cell.value)}</a>
                            </td>

                        {:else if cell.type === 'email' }
                            <td class="has-text-left list-date">
                                <a href="'mailTo:' + {cell.value}">{cell.value}</a>
                            </td>

                        {:else if cell.type === 'status' }
                            <td class="has-text-left list-status">
                                <span style="{cell.value && cell.value.colour ? 'color: ' + cell.value.colour : ''}">
                                    <Icon icon='{getContext("iconStatus")}' class="text-1dot5rem"/>
                                </span>
                                {cell.value && cell.value.name ? cell.value.name : '' }
                            </td>


                        {:else if cell.type === 'newpage' }
                            <td on:click="{() => launchPage(cell.id)}"
                                style="word-wrap: break-word; word-break: break-all;"
                                class="add-cursor has-text-info has-text-weight-semibold text-left">

                                {cell.value}
                            </td>

                        {:else if cell.type === 'object' }
                            <td>{cell.value}</td>

                        {:else if cell.type === 'boolean' }
                            <td class="has-text-success text-center text-1dot4rem"
                                style="padding-bottom: 0; padding-top: 0">
                                {#if cell.value}
                                    <span>&#9679;</span>
                                {/if}
                            </td>

                        {:else if cell.type === 'pict' }
                            <td class="pict pictSmall">
                                {#if cell.value && cell.value.src}
                                    <div>
                                        <img src="{cell.value.src}" class="list-thumbnail" alt="thumbnail"/>
                                    </div>
                                {:else}
                                    <div class="alt-pict">
                                        <div class="alt-pict-text">{cell.name}</div>
                                    </div>
                                {/if}
                            </td>

                        {:else if cell.type === 'del' }

                            {#if confirmDelete}
                                <td on:click="{() => confirmDel(cell.value)}"
                                    class="add-cursor has-text-centered"
                                    style="max-width: 10%;">

                                    {#if confirm === cell.value}
                                        <div class="confirm-delete depth-1 d-flex justify-content-between has-text-left align-items-center">
                                            <button class="button is-small is-danger" on:click|stopPropagation="{() => deleteDoc(cell.value)}">
                                                {deleteText.btnRemove}
                                            </button>

                                            <p class="mx-3 has-text-centered text-0dot8rem">{deleteText.msg}</p>

                                            <button class="button is-small is-primary is-outlined" on:click|stopPropagation="{cancelDelete}">
                                                {deleteText.btnCancel}
                                            </button>
                                        </div>

                                    {:else}

                                        <span>
                                            <Icon icon='{getContext("iconDelete")}' class="text-1dot5rem has-text-danger"/>
                                        </span>
                                    {/if}
                                </td>

                            {:else}
                                <td on:click="{() => deleteDoc(cell.value)}"
                                    class="add-cursor has-text-centered"
                                    style="max-width: 10%;">

                                    <span>
                                        <Icon icon='{getContext("iconDelete")}' class="text-1dot5rem has-text-danger"/>
                                    </span>
                                </td>
                            {/if}

                        {/if}

                    {/each}
                </tr>

            {/each}
        </tbody>
    </table>

</div>


<style>
    td {
        vertical-align: middle;
    }

    .pict {
        margin: 0.5rem;
    }

    .alt-pict {
        width: 3rem;
        height: 3rem;
        border-radius: 50%;
        background-color: #555;
        display: flex;
    }

    .alt-pict-text {
        color: #FFF;
        font-size: 1.5rem;
        margin: auto; /* Important */
        text-align: center;
    }

    .list-thumbnail {
        width: 3rem;
        border-radius: 50%;
        background-color: #eee;
    }

    .confirm-delete {
        position: absolute;
        right: 1.5rem;

        margin-top: -1.5rem;
        min-height: 3rem;
        width: 90%;
        padding: 0.5rem;
        background-color: whitesmoke;
        border: solid 1px #c0c0c0;
    }

</style>
