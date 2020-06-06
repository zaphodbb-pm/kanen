<script>
    /**
     * @summary Builds pagination bar.
     *
     * @memberof Components:List
     * @function pagination
     * @locus Client
     * @augments listHolder
     *
     * @param  {Number} rows
     * @param  {Number} totalDocs
     *
     * @emits {Object} 'page-changed'
     *
     */

    //* props
    export let rows = 10;
    export let totalDocs = 0;

    //** support functions
    import {createEventDispatcher} from 'svelte';
    const dispatch = createEventDispatcher();


    //* local reactive variables
    let more= false;
    let showPages= true;
    let pages= 1;
    let items= [];
    let currPage= 1;
    let pagesLength= 5                  // sets the number of pagination targets


    let totPages = Math.ceil(totalDocs / rows);
    let len = totPages < pagesLength ? totPages : pagesLength;

    pages = totPages;
    items = [...Array(len).keys()].map(x => ++x);
    more = totPages > pagesLength;
    showPages = (totPages > 1);

    //* functions that mutate local variables
    function changepager(page) {
        currPage = page;
        dispatch('page-changed', {
            page: page
        });
    }

    function prev() {
        if (currPage > 1) {
            currPage = currPage - 1;
            changepager(currPage);

            if (currPage >= pagesLength) {
                items.pop();
                items.unshift(currPage + 1 - pagesLength);
            }
        }
    }

    function next() {
        if (currPage < pages) {
            currPage = currPage + 1;
            changepager(currPage);

            if (currPage > pagesLength) {
                let maxPage = currPage < pages ? currPage : pages;

                items.shift();
                items.push(maxPage);
            }
        }
    }

</script>

<nav class="pagination is-centered is-small mt-2" role="navigation" aria-label="pagination">
    {#if showPages}

        <ul class="pagination-list">
            {#if more}
                <li>
                    <a on:click="{prev}" class="pagination-link" aria-label="prev">&lt;</a>
                </li>
            {/if}

            {#each items as item}
                <li>
                    <a class="pagination-link { item === currPage ? 'is-current':  ''}" on:click="{() => changepager(item) }">
                        {item}
                    </a>
                </li>
            {/each}

            {#if more}
                <li>
                    <a on:click="{next}" class="pagination-link" aria-label="next">&gt;</a>
                </li>
            {/if}
        </ul>

    {/if}
</nav>
