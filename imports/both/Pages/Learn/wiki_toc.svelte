<script>
    /**
     * @summary Component for displaying a wiki table of contents.
     *
     * @memberof Pages:Learn
     * @function wiki_toc
     * @locus Client
     *
     * @param {Array}   tocTitles - tiered (up to 3) list of titles
     * @param {String}  tocHeader - header text for ToC box
     * @param {String}  pageid - page id
     *
     * @returns nothing - emits "getpage" with string = id of page to fetch
     *
     */

    //* props
    export let tocHeader = "";
    export let tocTitles = [];
    export let pageid = "";

    //* support functions
    import { createEventDispatcher} from 'svelte';
    const dispatch = createEventDispatcher();

</script>


<div class="vue-wiki-toc card">

    <div class="card-header has-background-info has-text-white">
        <div class="card-header-title" style="color: inherit; font-size: inherit; font-weight: inherit;">
            {tocHeader}
        </div>
    </div>

    <div class="card-content">

        <ul class="cleanList">
            {#each tocTitles as title (title._id) }
                <li>
                    <a id="{title._id}"
                       class:active={title._id === pageid}
                       on:click="{() => dispatch('getpage', title._id)}">

                        {title.name}
                    </a>

                    {#if title.child1}

                        <ul class="cleanList ml-2">
                            {#each title.child1 as child1 (child1._id)}
                                <li class="text-bold add-cursor">

                                    <a id="{child1._id}"
                                       class:active="{child1._id === pageid}"
                                       on:click="{() => dispatch('getpage', child1._id) }">
                                        {child1.name}
                                    </a>

                                    {#if child1.child2}
                                        <ul class="cleanList ml-2">
                                            {#each child1.child2 as child2 (child2._id)}
                                                <li class=" text-bold add-cursor">
                                                    <a id="{child2._id}"
                                                       class:active="{child2._id === pageid}"
                                                       on:click="{() => dispatch('getpage', child2._id) }">
                                                        {child2.name}
                                                    </a>
                                                </li>
                                            {/each}
                                        </ul>
                                    {/if}

                                </li>
                            {/each}
                        </ul>

                    {/if}
                </li>
            {/each}
        </ul>

    </div>
</div>



<style>

    .active {
        font-weight: 600;
        color: #4a4a4a;
    }

</style>
