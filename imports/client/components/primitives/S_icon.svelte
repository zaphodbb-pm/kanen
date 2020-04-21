<script>

    /**
     * Main entry point for client code.
     * All common routines are imported here.
     *
     * @memberof Components:Primitives
     * @function S-icon
     * @locus Client*
     *
     * @notes
     *      1.
     *
     */

    export let icon = undefined

</script>

{#if icon}
    <img src="{icon}" class="icon-config" alt=""/>
{:else}
    <span></span>
{/if}


<style>
    .icon-config {
        height: 1em;
        width: 1em;
    }

</style>
