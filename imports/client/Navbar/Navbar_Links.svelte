<script>

    /**
     * @summary Navbar brand insert.
     *
     * @memberof Navbar-Section
     * @function Navbar_Brand
     * @locus Client
     * @isTemplate true
     * @augments Navbar
     *
     */


    import Navigate from 'svelte-router-spa/src/components/navigate.svelte'

    import Icon from 'svelte-awesome';
    import { getContext } from 'svelte';

</script>



<nav class="navbar-start" style="height: 100%;">

    <a class="navbar-item navbar-hover" style="height: 100%; align-items: center" href="/page-one">
        <div  class="has-text-centered">
            <Icon data={getContext("iconHome")} scale="1.5" label="home"/>
            <div class="text-0dot9rem has-text-centered is-hidden-touch" style="line-height: 1.2;">Link 1</div>
        </div>
    </a>

    <a class="navbar-item navbar-hover" style="height: 100%; align-items: center" href="/page-two">
        <div class="has-text-centered">
            <Icon data={getContext("iconPost")} scale="1.5" label="home"/>
            <div class="text-0dot9rem has-text-centered is-hidden-touch" style="line-height: 1.2;">Link 2</div>
        </div>
    </a>

    <a class="navbar-item navbar-hover" style="height: 100%; align-items: center" href="/page-three">
        <div class="has-text-centered">
            <Icon data={getContext("iconLearn")} scale="1.5" label="home"/>
            <div class="text-0dot9rem has-text-centered is-hidden-touch" style="line-height: 1.2;">Link 3</div>
        </div>
    </a>



    <!--
    <div class="navbar-item navbar-hover" style="height: 100%; align-items: center">
        <Navigate to="/page-one" >
            <div class="has-text-centered">
                <Icon data={getContext("iconLearn")} scale="1.5" label="home"/>
                <div class="text-0dot9rem has-text-centered is-hidden-touch" style="line-height: 1.2;">Link 3</div>
            </div>
        </Navigate>
    </div>
    -->





</nav>

<style>

    .is-nav-active,
    .navbar-hover:hover {
        background-color: #eee !important;
    }

    .is-subnav-active {
        background-color: #e0f8f4
    }

</style>
