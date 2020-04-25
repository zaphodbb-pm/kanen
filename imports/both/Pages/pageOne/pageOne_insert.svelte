<script>
    /**
     * @summary Insert Layout for Page One.
     *
     * @memberof Pages:PageOne
     * @function pageOne_insert
     * @locus Client
     * @augments pageOne
     *
     */

    //* common page setup information

        //** get required services
        import { getContext } from 'svelte';

        //** get any other components
        import Icon from 'svelte-awesome/components/Icon.svelte';
        let out = getContext("iconMark");

        //** get language preference
        export let lang = "en";

</script>


<article class="page-insert-layout">

    <div>lang: {lang}</div>

    <div class="d-flex align-items-center" style="font-size: 3rem;">

        <Icon data={out} scale="3"/>

        <span>svelte-icons</span>
    </div>


    <div class="d-flex align-items-center has-text-blue-dark">

        <Icon data={getContext("iconBeer")} class="icon"/>

        <span>Svelte-Icons</span>
    </div>

</article>

<style>
    .sv-icons {
        height: 1em;
        width: 1em;
    }

</style>
