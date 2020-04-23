
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

<script>
    import Route from 'svelte-router-spa/src/components/route.svelte'

    export let currentRoute;

    import Icon from 'svelte-awesome';
    import { getContext } from 'svelte';

    let out = getContext("iconMark");


    console.log("currentRoute", currentRoute);




</script>
