<script>
    /**
     * Draggable item list.
     *
     * @memberof Components:Form
     * @function itemList
     * @locus Client
     * @augments fieldWrapper
     *
     * @param {Object} field
     *
     * @emits: 'on-inputentry' {value: value, error: errorVal} with text, number or other types
     *
     */

    //* common props from parent
    export let field = {};

    //* support functions
    import {getContext, createEventDispatcher} from 'svelte';
    const dispatch = createEventDispatcher();

    import { quintOut } from "svelte/easing";
    import { crossfade } from "svelte/transition";
    import { flip } from "svelte/animate";
    import Icon from '/imports/components/elements/icon.svelte'

    //* local reactive variable
    let list = [];
    let key = field.params.key;

    $: setValue(field.value);


    //* functions that mutate local variables
    function setValue(val){
        if(val && val.length > 0){
            list = val;
        }else{
            list = field.params.selects;
        }

        console.log("setValue", val, list);
    }

    function updateList(newList){
        list = newList.map( (nl, idx) =>  {
            nl.id = idx + 1;
            return nl;
        });

        console.log("updateList", list);

        dispatch('on-inputentry', {value: list, error: false});
    }

    //* drag and drop functions
    //** flip animation
    const [send, receive] = crossfade({
        duration: d => Math.sqrt(d * 200),
        fallback(node, params) {
            const style = getComputedStyle(node);
            const transform = style.transform === "none" ? "" : style.transform;
            return {
                duration: 600,
                easing: quintOut,
                css: t => `
					transform: ${transform} scale(${t});
					opacity: ${t}
				`
            };
        }
    });

    //** drag and drop
    let isOver = false;
    const getDraggedParent = node =>
            node.dataset && node.dataset.index
                    ? node.dataset
                    : getDraggedParent(node.parentNode);
    const start = ev => {
        ev.dataTransfer.setData("source", ev.target.dataset.index);
    };
    const over = ev => {
        ev.preventDefault();
        let dragged = getDraggedParent(ev.target);
        if (isOver !== dragged.id) isOver = JSON.parse(dragged.id);
    };
    const leave = ev => {
        let dragged = getDraggedParent(ev.target);
        if (isOver === dragged.id) isOver = false;
    };
    const drop = ev => {
        isOver = false;
        ev.preventDefault();
        let dragged = getDraggedParent(ev.target);
        let from = ev.dataTransfer.getData("source");
        let to = dragged.index;
        reorder({ from, to });
    };

    //** dispatch reorder
    const reorder = ({ from, to }) => {
        let newList = [...list];
        newList[from] = [newList[to], (newList[to] = newList[from])][0];
        updateList(newList);
    };

    //** utils
    const getKey = item => (key ? item[key] : item);


    //* row controls
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

    function deleteRow(rowid) {
        let newList = list;
        newList = newList.filter(row => row.id !== rowid);

        updateList(newList)
    }

    function updateRow(row){
        let newList = list;
        newList = newList.map( (r) => r.id === row.id ? row : r);

        updateList(newList);
    }

</script>


{#if list && list.length}
    <div class="box">

        <button class="button btn-rounded is-primary mb-3" on:click="{addRow}">
            <Icon icon='{getContext("iconRowAdd")}' class="text-1dot5rem"/>
        </button>

        <ul>
            {#each list as item, index (getKey(item))}
                <li
                        data-index={index}
                        data-id={JSON.stringify(getKey(item))}
                        draggable="true"
                        on:dragstart={start}
                        on:dragover={over}
                        on:dragleave={leave}
                        on:drop={drop}
                        in:receive={{ key: getKey(item) }}
                        out:send={{ key: getKey(item) }}
                        animate:flip={{ duration: 300 }}
                        class:over={getKey(item) === isOver}>

                    <slot {item} {index}>
                        <div class="level">

                            <div class="w-10">
                                <span class="row-id">{getKey(item)}</span>
                            </div>

                            <div class="w-80">
                                <textarea class="textarea"
                                          bind:value="{item.text}"
                                          on:keyup="{() => updateRow(item)}"
                                          rows="2"></textarea>
                            </div>

                            <div class="w-10">
                                <div class="add-cursor has-text-centered" on:click="{() => deleteRow(getKey(item))}">
                                    <Icon icon='{getContext("iconDelete")}' class="text-1dot5rem has-text-danger"/>
                                </div>
                            </div>

                        </div>
                    </slot>

                </li>
            {/each}
        </ul>

    </div>
{/if}


<style>
    ul {
        list-style: none;
        padding: 0;
    }

    li {
        border: 2px dotted transparent;
        transition: border 0.1s linear;
        cursor: grabbing;
    }

    .over {
        border-color: rgba(48, 12, 200, 0.2);
    }

    .btn-rounded {
        border-radius: 50%;
        padding: 0.25rem;
        width: 2.5rem;
    }

    .row-id {
        margin-top: 0.5rem;
        padding: 0.5rem 0.75rem;
        background-color: #EEE;
        border-radius: 50%;
    }
</style>
