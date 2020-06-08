<script>
    /**
     * Row drag and drop component.
     *
     * @memberof Components:Blocks
     * @function rowDragDrop
     * @locus Client
     *
     * @param {Array} list - array of objects to sort
     * @param {String} key - object key to use
     *
     * @emits: 'sort' - {Array} newList
     *
     * @see Adapted from {@link https://github.com/brunomolteni/svelte-sortable-list|svelte-sortable-list}
     *
     */

    //* common props
    export let list;
    export let key;

    //* local variables
    let isOver = false;

    //* support functions
    import { quintOut } from "svelte/easing";
    import { crossfade } from "svelte/transition";
    import { flip } from "svelte/animate";
    import { createEventDispatcher} from "svelte";
    const dispatch = createEventDispatcher();


    //** flip animation
    const [send, receive] = crossfade({
        duration: d => Math.sqrt(d * 200),
        fallback(node, params) {
            const style = getComputedStyle(node);
            const transform = style.transform === "none" ? "" : style.transform;
            return {
                duration: 600,      // causes a hesitation during route change!  need to add "|local" to send/receive
                easing: quintOut,
                css: t => `transform: ${transform} scale(${t}); opacity: ${t}`
            };
        }
    });

    //** drag and drop
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

    //**  dispatch reorder
    const reorder = ({ from, to }) => {
        let newList = [...list];
        newList[from] = [newList[to], (newList[to] = newList[from])][0];
        dispatch("sort", newList);
    };

    //* utils
    const getKey = item => (key ? item[key] : item);

</script>





{#if list && list.length}
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
                    in:receive|local={{ key: getKey(item) }}
                    out:send|local={{ key: getKey(item) }}
                    animate:flip={{ duration: 300 }}
                    class:over={getKey(item) === isOver}>

                <slot {item} {index}>
                    <p>{getKey(item)}</p>
                </slot>
            </li>
        {/each}
    </ul>
{/if}





<!--
{#if list && list.length}
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
                    <p>{getKey(item)}</p>
                </slot>

            </li>

        {/each}
    </ul>
{/if}
-->



<style>
    ul {
        list-style: none;
        padding: 0;
    }

    li {
        transition: border 0.1s linear;
        cursor: grabbing;
    }

    .over {
        border-color: rgba(48, 12, 200, 0.2);
    }
</style>
