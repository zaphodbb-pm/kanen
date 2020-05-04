<script>

    /**
     * @summary Simple icon display component for Fontawesome5 formatted json objects.
     *
     * @memberof Components:Elements
     * @function icon
     * @locus Client
     *
     * @return nothing
     *
     * @see {https://github.com/alphapeter/fa-svelte}
     *
     * @notes
     * 1. usage: <Icon class="extraClass" icon={iconName} />
     */

    export let icon;
    let path = [];
    let classes = "";
    let viewBox = "0 0 32 32";

    if(icon && icon.icon){
        $: viewBox = "0 0 " + icon.icon[0] + " " + icon.icon[1];
        $: classes = "fa-svelte " + ($$props.class ? $$props.class : "");
        $: path = icon.icon[4];
    }

</script>

<svg aria-hidden="true"
     class="{classes}"
     role="img"
     xmlns="http://www.w3.org/2000/svg"
     viewBox="{viewBox}">

    <path fill="currentColor" d="{path}" />
</svg>



<style>
    .fa-svelte {
        width: 1em;
        height: 1em;
        overflow: visible;
        display: inline-block;
    }
</style>
