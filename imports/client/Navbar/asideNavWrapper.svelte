<script>

    /**
     * @summary Aside slide wrapper for side navigation.
     *
     * @memberof Navbar
     * @function asideNavWrapper
     * @locus Client
     * @isTemplate true
     *
     */

    //** get required services
    import { getContext } from 'svelte';

    //** get any other components
    import Icon from 'svelte-awesome/components/Icon.svelte';

    //** event handlers
    import {createEventDispatcher} from 'svelte';
    const dispatch = createEventDispatcher();

    //** props populated by immediate parent
    export let open = false;
    export let side = "left";
    export let theme = "light";

</script>


<aside class="asideNavWrapper"
       class:wrapper-dark={theme === "dark"}
       class:wrapper-light={theme === "light"}
       class:wrap-right={side === "right"}
       class:wrap-left={side === "left"}
       class:left={side === "left" && open}
       class:right={side === "right" && open}>


    <div on:click={ () => open = false} class="close-aside">
        <Icon data={getContext("iconCancel")} scale="2"/>
    </div>

    <slot> </slot>

</aside>


<style>
    /* misc parts */
    .asideNavWrapper {
        position: absolute;
        padding-top: 3rem;
        width: 12rem;
        min-height: 15rem;
        top: 4.125rem;
        z-index: 1000;
        opacity: 95%;
    }

    .wrap-left {
        left: -100%;
        transition: left 0.6s ease-in-out;
    }

    .wrap-right {
        right: -100%;
        transition: right 0.6s ease-in-out;
    }

    .wrapper-light {
        background-color: whitesmoke;
        color: #555;
    }

    .wrapper-dark {
        background-color: #333;
        color: whitesmoke;
    }

    .left{
        left: 0;
    }

    .right{
        right: 0;
    }

    .close-aside {
        position: absolute;
        top: 0.5rem;
        right: 0;
        font-size: 1.5rem;
        cursor: pointer;
        z-index: 1010;
    }

</style>
