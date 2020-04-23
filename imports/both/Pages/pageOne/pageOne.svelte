<script>
    /**
     * @summary Layout for Page One.
     *
     * @memberof Pages:PageOne
     * @function pageOne
     * @locus Client
     *
     */

    //* get the user language preference
    import {lang} from '/imports/client/structure/systemStores'

    let lang_val;
    lang.subscribe( value => { lang_val = value; } )


    console.log("lang_val", lang_val);


    import pageText from './pageOne_text'



    import Route from 'svelte-router-spa/src/components/route.svelte'

    export let currentRoute;

    import Icon from 'svelte-awesome';
    import { getContext } from 'svelte';

    let out = getContext("iconMark");


    console.log("currentRoute", currentRoute);


</script>



<div class="columns">

    <div class="column">
        <section class="page-layout">

            <div class="d-flex align-items-center" style="font-size: 3rem;">

                <Icon data={out} scale="3"/>

                <span>svelte-icons</span>
            </div>


            <div class="d-flex align-items-center has-text-blue-dark">

                <Icon data={getContext("iconBeer")} class="icon"/>

                <span>Svelte-Icons</span>
            </div>

        </section>


    </div>

</div>



<style>
    .sv-icons {
        height: 1em;
        width: 1em;
    }

</style>
