<script>
    /**
     * @summary Insert Layout for Page Three.
     *
     * @memberof Pages:PageThree
     * @function pageThree_insert
     * @locus Client
     * @augments pageThree
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

    page three insert



</article>

<style>
    .sv-icons {
        height: 1em;
        width: 1em;
    }

</style>
