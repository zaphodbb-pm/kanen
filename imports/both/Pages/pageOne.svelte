<div class="page-master-layout has-background-white">
    <div class="columns">

        <div class="column">
            <section class="page-layout">

                <div class="d-flex align-items-center" style="font-size: 3rem;">
                    <img src="{icon}" style="height: 1em;" alt=""/>
                    <span>Page One</span>
                </div>


                <div class="d-flex align-items-center" style="font-size: 3rem;">
                    <S_icon {icon}> </S_icon>
                    <span>component</span>
                </div>

            </section>


        </div>

    </div>
</div>


<style>

</style>

<script>

    import S_icon from '/imports/client/components/primitives/S_icon.svelte'


    let icon = kanen.icons.NOTIFICATION;


</script>
