<script>

    /**
     * Accordion content widget.
     *
     * @memberof Components:Widgets
     * @function accordion
     * @locus Client
     *
     * @param {String} tabSettings - controls button settings
     * @param {Object} eventMain - event name for clicked label of main list
     * @param {Object} eventSub - event name for clicked sublabel of list
     * @param {Object} content - input array of objects from parent
     * @param {String} content:icon - tab label icon positioned at left of tab
     * @param {String} content:label - tab label
     * @param {String} content:text - optional content to display in body of tab
     * @param {String} content:dbContent - optional content from database to display in body of tab
     * @param {Array}  content:list - optional content as a list of content objects
     *
     * @return nothing
     *
     * @notes
     * 1. Standalone component that gets a configuration object from its parent
     * 2. The content area can include html tags
     * 3. Content can only be create and controlled by administrators.
     */


    //* external props
    export let text = "";
    export let tabSettings = "";

    //* get the user language preference from store and text from context
    import { getContext } from 'svelte';
    import {lang} from '/imports/both/systemStores'
    import {i18n} from '/imports/functions/func-i18n'

    //* get accessory components
    //import {methodReturn} from "../../functions/func-methodReturn";
    import Icon from '/imports/components/elements/icon.svelte'


    //* component "tabbedContent" control
    let content = getContext("pageText").components;
    content = i18n(content, text, $lang);


    let  currTab = content && content.length > 0 ? content[0].label : "";

    function changetab(tab) {
        currTab = tab;
    }

    function setContent(sub) {
    }

    function body() {
        if (content) {
            (content).forEach(function (ct) {
                if (!ct.text && ct.dbContent) {
                    let request = {
                        coll: ct.dbContent.coll,
                        query: {name: ct.dbContent.name},
                        length: 1,
                    };

                    console.log("request", request);
                    /*
                    Meteor.call("directCollection", request, function (err, res) {
                        //methodReturn(err, res, "tabbedContent directCollection");

                        if (res) {
                            ct.text = res.contentPage;
                        }
                    });

                     */
                }
            });
        }

        return content;
    }

</script>



<div class="accordions">
    <div class="accordion">

        {#each body() as item, idx}

            <a class="button accordion-header {tabSettings}" on:click|stopPropagation={ () => changetab(item.label) }>

                {#if item.icon}
                    <span class="icon">
                        <Icon icon={getContext(item.icon)} class="text-1dot2rem"/>
                    </span>
                {/if}

                {#if item.list}
                    <span class="badge is-badge-warning is-badge-small" data-badge={item.list.length}>
                        <b class="pr-3">{item.label}</b>
                    </span>
                {:else}
                    <b>{item.label}</b>
                {/if}

            </a>


            <div class="accordion-body">

                {#if item.list}

                    <div  class="{item.label === currTab ? 'open-body' : 'close-body'}">
                        {#each item.list as sublabel, idx}
                            <div on:click={ () => setContent(sublabel.name) }>
                                <span class="accordion-list">{sublabel.name}</span>
                            </div>
                        {/each}}
                    </div>

                {:else}

                    <div class="{item.label === currTab ? 'open-body' : 'close-body'}">
                        <div class="accordion-content">{@html item.text}</div>
                    </div>

                {/if}

            </div>

        {/each}

    </div>
</div>





<style>

    .accordion {
        display: flex;
        flex-direction: column;
        margin-bottom: 0.25rem;
    }

    .accordion-header {
        text-align: left !important;
        justify-content: left !important;
    }

    .accordion-body {
        overflow-y: hidden;

        border: 1px solid #dbdbdb;
        border-radius: 4px;

        border-top-left-radius: 0;
        border-top-right-radius: 0;
        border-top: none;
    }

    .accordion-content {
        padding: .75rem;
        max-height: 30rem;
    }

    .accordion-content p {
        margin-bottom: 0.75rem;
    }

    .accordion-list {
        cursor: pointer;
        padding-left: 1rem;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }

    .open-body {
        overflow: hidden;
        max-height: 50rem;

        transition-property: all;
        transition-duration: 2s;
        transition-timing-function: cubic-bezier(0.25, 0.1, 0.25, 1);
    }

    .close-body {
        overflow: hidden;
        max-height: 0;
    }

</style>
