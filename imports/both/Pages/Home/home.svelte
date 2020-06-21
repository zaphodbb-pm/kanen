<script>
    /**
     * @summary Layout insert for Home page.
     *
     * @memberof Pages:Home
     * @function home_insert
     * @locus Client
     *
     */


    //* setup props to receive route data
    export let currentRoute;
    export let params;

    //* app services
    import { setContext } from 'svelte';
    import { getContext } from 'svelte';

    //* get the user language preference from store
    import {lang} from '/imports/client/systemStores'

    //* get page text information and set contexts for children components
    import {header, page} from './home_text'

    setContext("pageHdr", header);
    setContext("pageText", page);


    //* get the page header common component; component get gets its own translated text
    import Hdr from '/imports/both/pageStructure/PageHeader.svelte'




    //* page body support **************************
    import {i18n} from '/imports/functions/i18n'
    let pageText = i18n(page, "page", $lang);

    import Icon from '/imports/components/elements/icon.svelte'
    let out = getContext("iconMark");



</script>



<Hdr />


<section class="page-body">

    <div class="d-flex justify-content-around align-items-center">
        <p class="lead mr-5">{@html pageText.intro}</p>

        <figure class="ml-5">
            <img src="/home-page.jpg" class="" style="max-width: 200rem;">
        </figure>
    </div>


    <article class="message mt-5 mb-5">
        <div class="message-body">
            {@html pageText.quote}
        </div>
    </article>


    <div class="columns mt-5">

        <div class="column">
            <div class="box">
                <h1 class="title has-text-centered">{pageText.philosophy.title}</h1>

                <ul>
                    {#each pageText.philosophy.body as item}
                        <li class="mb-2">
                            {item}
                        </li>
                    {/each}
                </ul>
            </div>
        </div>

        <div class="column">
            <div class="box">
                features
            </div>
        </div>

        <div class="column">
            <div class="box">
                performance
            </div>
        </div>
    </div>

</section>
