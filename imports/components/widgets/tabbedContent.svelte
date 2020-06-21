<script>
    /**
     * Tabbed content widget.
     *
     * @memberof Components:Widgets
     * @function tabbedContent
     * @locus Client
     *
     * @param {String} tabSettings - tab label icon positioned at left of tab
     * @param {Object} content - input array of objects from parent
     * @param {String} content:icon - tab label icon positioned at left of tab
     * @param {String} content:label - tab label
     * @param {String} content:text - optional content to display in body of tab
     * @param {String} content:list - optional sub content to display in a a tab
     * @param {Object} content:dbContent - dbContent: {coll: "", name: ""} optional content from database to display in body of tab
     *
     * @return nothing
     *
     * @see bulma.io documentation for {https://bulma.io/documentation/components/tabs/|tabs}
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
    import {lang} from '/imports/client/systemStores'
    import {i18n} from '/imports/functions/i18n'

    //* get accessory components
    //import {methodReturn} from "../../functions/func-methodReturn";
    import Icon from '/imports/components/elements/icon.svelte'


    //* component controls
    let content = getContext("pageText").components;
    content = i18n(content, text, $lang);

    let  currTab = content && content.length > 0 ? content[0].label : "";

    function changetab(tab) {
        currTab = tab;
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



<div class="tabbed-content">

    <div class="tabs {tabSettings}">
        <ul>
            {#each body() as item}
                <li aria-label="{item.label}"
                    class:is-active={item.label === currTab}
                    on:click={ () => changetab(item.label) }>

                    <a>
                        {#if item.icon}
                            <span class="icon">
                                <Icon icon={getContext(item.icon)} class="text-1dot2rem"/>
                            </span>
                        {/if}

                        <span class="is-hidden-touch">{item.label}</span>
                    </a>
                </li>
            {/each}
        </ul>
    </div>

    {#each body() as tab}
        <div class:is-hidden={!(tab.label === currTab)}>
            {#if Array.isArray(tab.text)}
                <ul>
                    {#each tab.text as item}
                        <li class="mb-2">{@html item}</li>
                    {/each}
                </ul>

            {:else}
                {@html tab.text}
            {/if}
        </div>
    {/each}

</div>
