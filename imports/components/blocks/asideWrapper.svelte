<script>

    /**
     * @summary Component block: aside wrapper.
     *
     * @memberof Components:Blocks
     * @function asideWrapper
     * @locus Client
     * @isTemplate true
     *
     */

    //** event handlers
    import {createEventDispatcher} from 'svelte';
    const dispatch = createEventDispatcher();

    function footEvent(id, key, label){
        dispatch("footEvent", {item: id, key: key, label: label} );
    }


    let aside = {
        pushEl: "page-layout",

        cancel: "X",
        side: "left",
        size: {
            width: "15rem",
            height: "12rem",
        },
        move: "close",
        header: '64px'
    };

</script>

<div class="asideWrapper">

    <aside role="complementary"
           class="aside-offcanvas-common"
           style="{aside.size}">

        <div class="close-aside" v-on:click="closeAside">
            <i>X</i>
        </div>

        <slot> </slot>

    </aside>
</div>


<style>





</style>
