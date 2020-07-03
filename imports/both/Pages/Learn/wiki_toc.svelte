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
     * @emits 'getpage' with string = id of page to fetch
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

    <div class="card-header has-background-info">
        <div class="card-header-title has-text-white">
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

                    {#if title.children}

                        <ul class="cleanList ml-2">
                            {#each title.children as children (children._id)}
                                <li class="text-bold add-cursor">

                                    <a id="{children._id}"
                                       class:active="{children._id === pageid}"
                                       on:click="{() => dispatch('getpage', children._id) }">
                                        {children.name}
                                    </a>

                                    {#if children.children}
                                        <ul class="cleanList ml-2">
                                            {#each children.children as children (children._id)}
                                                <li class=" text-bold add-cursor">
                                                    <a id="{children._id}"
                                                       class:active="{children._id === pageid}"
                                                       on:click="{() => dispatch('getpage', children._id) }">
                                                        {children.name}
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
