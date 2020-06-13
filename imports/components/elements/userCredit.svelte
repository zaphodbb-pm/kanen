<script>
    /**
     * @summary Credit widget to display user information.
     *
     * @memberof Components:Elements
     * @function userCredit
     * @locus Client
     * @augments Navbar
     *
     */


    //* support files
    import {userExtras} from '/imports/client/systemStores'
    import Icon from '/imports/components/elements/icon.svelte'
    import { getContext } from 'svelte';

    //* component controls
    let text = getContext("navbar").userCredit;

    //* local reactive variables
    let credit = "";

    $: {
        let credits = $userExtras && $userExtras.credits ? $userExtras.credits : 0;
        credit = credits.toFixed(0);
    }

</script>


<div class="user-credit navbar-item">

    <div class="tags has-addons">
        <span class="tag is-light has-text-weight-semibold is-medium">{credit}</span>

        <span class="tag is-info is-medium is-hidden-mobile">
            {#if text.credits}
                {text.credits}
            {:else}
                <Icon icon={getContext("iconCredits")} class=""/>
            {/if}

        </span>
    </div>

</div>
