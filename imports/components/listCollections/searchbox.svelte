<script>
    /**
     * Builds a string to be used by various search mechanisms.
     *
     * @memberof Components_List
     * @function searchbox
     * @locus Client
     * @augments listHolder
     *
     * @emits 'search-changed' with {search: string, query: object}
     *
     */

    //* props
    export let fields = [];

    //** support functions
    import {getContext} from 'svelte';
    import {slide} from 'svelte/transition';
    import {quintOut} from 'svelte/easing';
    import Icon from '/imports/components/elements/icon.svelte'
    import {createEventDispatcher} from 'svelte';
    const dispatch = createEventDispatcher();

    import {buildQuery} from './func-buildQuery'
    import {i18n} from '/imports/functions/i18n'
    import searchBoxText from '/imports/client/setup/textSearch'

    //* local reactive variables
    let helpText = i18n(searchBoxText, "helpText");
    let label = i18n(searchBoxText, "label");
    let searchchars = "";
    let showIcon = !!helpText;
    let showHelp = false;


    function changesearch() {
        searchchars = searchchars.replace(/ /g, '');            // remove all white spaces
        if (searchchars.length > 2) {                           // need at least three characters to start a query
            let query = buildQuery(searchchars, fields);
            dispatch('search-changed', {search: searchchars, query: query});
        }else{
            dispatch('search-changed', {search: searchchars, query: {}});
        }
    }

    function toggleHelp() {
        showHelp = !showHelp;
    }

</script>


<div class="field has-addons">
    <div class="control">
        <a class="button is-static">
            <Icon icon='{getContext("iconSearch")}' class="text-1dot5rem"/>
        </a>
    </div>

    <div class="control is-expanded">
        <input type="text"
               class="input"
               on:keyup="{changesearch}"
               bind:value="{searchchars}"
               aria-label="input field"
               title="search input">
    </div>

    <div class="control">
        {#if showIcon}
            <a class="button is-info is-outlined" on:click="{toggleHelp}">

                <Icon icon='{getContext("iconHelp")}' class="text-1dot5rem"/>
            </a>
        {/if}
    </div>
</div>


{#if showHelp}
    <div transition:slide="{{delay: 100, duration: 300, easing: quintOut }}">
        <p class="is-family-secondary">{@html helpText}</p>
    </div>
{/if}
