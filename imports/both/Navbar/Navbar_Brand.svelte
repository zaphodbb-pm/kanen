<script>

    /**
     * @summary Navbar brand insert.
     *
     * @memberof Navbar
     * @function Navbar_Brand
     * @locus Client
     * @augments Navbar
     *
     */

    import {layout} from '/imports/client/setup/systemGlobals'

    import Icon from '/imports/components/elements/icon.svelte'
    import { getContext } from 'svelte';
    let logo = getContext("iconLogo");

</script>


<a href="/home" class="navbar-brand-insert d-flex align-items-center pl-4 has-text-primary">
    <div class="main-logo">
        <Icon icon={logo} />
    </div>

    {#if layout.SECONDARY_LOGO}
        <img class="navbar-external-logo" src="/sweatcrew-logo.png" alt="logo">
    {/if}
</a>


<style>
    .main-logo {
        font-size: 3rem;
        line-height: 0;
    }

    img.navbar-external-logo {
        height: 2.5rem;
        max-height: 2.5rem;
        align-self: center;
        border-left: 1px solid #ddd;
        padding-left: 0.5rem;
        margin-left: 0.5rem;
    }

</style>
