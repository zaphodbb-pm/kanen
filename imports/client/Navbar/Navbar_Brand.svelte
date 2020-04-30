<script>

    /**
     * @summary Navbar brand insert.
     *
     * @memberof Navbar
     * @function Navbar_Brand
     * @locus Client
     * @isTemplate true
     * @augments Navbar
     *
     */

    import Icon from 'svelte-awesome/components/Icon.svelte';
    import { getContext } from 'svelte';
    let logo2 = getContext("iconLogo2");

</script>


<a href="/page-one" class="navbar-brand-insert d-flex pl-4 has-text-primary">
    <Icon data={logo2} scale="3" style="align-self: center;"/>

    <img class="navbar-external-logo" src="/sweatcrew-logo.png" alt="logo">
</a>


<style>

    img.navbar-external-logo {
        height: 2.5rem;
        max-height: 2.5rem;
        align-self: center;
        border-left: 1px solid #ddd;
        padding-left: 0.5rem;
        margin-left: 0.5rem;
    }

</style>
