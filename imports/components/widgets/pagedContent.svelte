<script>
    /**
     * @summary Vue based accordion content add in structured for displaying jsdoc information.
     *
     * @memberof Components:Widgets
     * @function pagedContent
     * @locus Client
     * @isTemplate true
     *
     * @param {String} newCategory - event name for clicked sidebar category label
     * @param {String} newTopic - event name for clicked sidebar sub topic label to scroll to
     * @param {Object} content - input array of objects from parent
     * @param {Array}  content:list - list of content objects
     *
     * @return nothing
     *
     * @notes
     * 1. Standalone component that gets a configuration object from its parent
     * 2. The content area can include html tags
     * 3. Content can only be create and controlled by administrators.
     */

    export let content = [];
    export let newCategory = "";
    export let newTopic = "";

</script>



<div class="pagedContent">
    {#each content as item, idx}
        <div class="pagedContent">
            {#if item.list && item.list.length > 0}
                {#each item.list as subtopic, ids}

                    {#if newCategory === item.label}
                        {#if subtopic.info}
                            <div class="card border-0 mb-4">
                                <div id="{subtopic.name}" class="card-header has-background-warning"
                                     style="font-size: 1.25em; font-weight: bold">
                                    <h5 class="card-header-title m-0">{subtopic.name}</h5>
                                </div>

                                <div class="card-content">
                                    <div class="content">{@html subtopic.info} </div>
                                </div>
                            </div>
                        {:else}
                            <div class="card mb-4">

                                <div style="background-color: #eee; padding: 0.75rem;">
                                    <div id="{subtopic.name}">
                                        <span class="" style="font-size: 1.25em; font-weight: bold">{subtopic.name}</span>
                                        <span class="" style="float: right; font-style: italic">{subtopic.locus}</span>
                                    </div>

                                    <div>
                                        <span class="">{subtopic.import}</span>
                                        <span class="">(line {subtopic.lineno})</span>
                                    </div>
                                </div>

                                <div class="card-content">

                                    <div class="lead">{subtopic.description}</div>

                                    {#if subtopic.augments}
                                        <div><i>Augments: {subtopic.augments}</i></div>
                                    {/if}

                                    {#if subtopic.params && subtopic.params.length > 0}
                                        <div class="mt-4 mb-1">
                                            <p class="text-1dot1em text-secondary">Input Parameters</p>

                                            {#each subtopic.params as param}
                                                <p class="ml-3">
                                                    <span><b>{param.name}</b></span>
                                                    <span> - {`{${param.typeString} }`}</span>
                                                    <span>{@html param.description}</span>
                                                </p>
                                            {/each}
                                        </div>
                                    {/if}

                                    {#if subtopic.returns && subtopic.returns.length > 0}
                                        <div class="mt-4 mb-1">
                                            <p class="text-1dot1em text-secondary">Returned Value</p>

                                            {#each subtopic.returns as returns}
                                                <p class="ml-3">
                                                    <span>{`{${returns.typeString} }`}</span>
                                                    <span>{returns.description}</span>
                                                </p>
                                            {/each}
                                        </div>
                                    {/if}

                                    {#if subtopic.eventActivity}
                                        <div class="mt-4 mb-1">
                                            <p class="text-1dot1em text-secondary">Event Activity</p>

                                            {#each subtopic.fires as fires}
                                                <div class="ml-3">Fires: {fires}</div>
                                            {/each}

                                            {#each subtopic.listens as listens}
                                                <div class="ml-3">Listens: {listens}</div>
                                            {/each}
                                        </div>
                                    {/if}

                                    {#if subtopic.requires  && subtopic.requires.length > 0}
                                        <div class="mt-4 mb-1">
                                            <p class="text-1dot1em text-secondary">Required Support Files</p>

                                            {#each subtopic.requires as require}
                                                <div class="ml-3">{require}</div>
                                            {/each}
                                        </div>
                                    {/if}

                                    {#if subtopic.todo  && subtopic.todo.length > 0}
                                        <div class="mt-4 mb-1">
                                            <p class="text-1dot1em text-secondary">To Do</p>

                                            {#each subtopic.todo as td}
                                                <div class="ml-3">{td}</div>
                                            {/each}
                                        </div>
                                    {/if}

                                    {#if subtopic.see  && subtopic.see.length > 0}
                                        <div class="mt-4 mb-1">
                                            <p class="text-1dot1em text-secondary">Other Documentation</p>

                                            {#each subtopic.seeString as see}
                                                <div class="ml-3">
                                                    {#if see.link}
                                                        <div>
                                                            <span>{see.prefix} </span>
                                                            <span><a href="{see.link}">{see.linkName}</a></span>
                                                            <span> {see.suffix}</span>
                                                        </div>
                                                    {:else}
                                                        <div>
                                                            {see.linkName}
                                                        </div>
                                                    {/if}
                                                </div>
                                            {/each}
                                        </div>
                                    {/if}

                                    {#if subtopic.notes}
                                        <div class="mt-4 mb-1">
                                            <p class="text-1dot1em text-secondary">Notes</p>
                                            <div class="ml-3 p-0">
                                                <pre class="m-0 text-1dot0em" style="font-family: sans-serif;">
                                                    {@html subtopic.notes}
                                                </pre>
                                            </div>
                                        </div>
                                    {/if}

                                    {#if subtopic.examples && subtopic.examples.length > 0}
                                        <div class="mt-4 mb-1">
                                            <p class="text-1dot1em text-secondary">Examples</p>

                                            {#each subtopic.examples as example}
                                                <div class="bg-light ml-3 p-3">
                                                    <pre>{@html example}</pre>
                                                </div>
                                            {/each}
                                        </div>
                                    {/if}
                                </div>
                            </div>
                        {/if}
                    {/if}

                {/each}
            {/if}
        </div>
    {/each}
</div>
