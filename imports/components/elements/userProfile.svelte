<script>
    /**
     * My Profile icon and activator for User Profile Page.
     *
     * @memberof Components:Elements
     * @function userProfile
     * @locus Client
     * @augments Navbar
     *
     */


    //** support functions
    import {userExtras} from '/imports/both/systemStores'
    import {userLoggedIn} from '/imports/both/systemStores'
    import {logUser} from '/imports/functions/logUser'
    import { navigateTo } from 'svelte-router-spa/src/spa_router'
    import { getContext } from 'svelte';
    import {createEventDispatcher} from 'svelte';
    const dispatch = createEventDispatcher();

    import Icon from '/imports/components/elements/icon.svelte'

    //* component controls
    let text = getContext("navbar").userProfile;

    //* local reactive variables
    let showImg = false;
    let user = {};
    let userName = "";

    $: {
        user = $userLoggedIn;
        showImg = !!user;

        if(showImg){
            userName = user.profile && user.profile.name ? user.profile.name : user.username;
        }
    }


    //* functions that mutate variables
    function logout() {
        Meteor.logout(function () {
            logUser(user, "logOut");
            $userExtras = {};
            $userLoggedIn = null;
            navigateTo("/login");
        });
    }

</script>


<div class="user-profile navbar-item has-dropdown is-hoverable">

    {#if user && user.profile}

        <a class="navbar-link is-arrowless" style="height: 100%;">
            <div class="" title="{text.title}">
                <div class="image is-32x32">
                    {#if user.profile.image && user.profile.image.src}
                        <img src="{user.profile.image.src}" class="defaultAvatar" alt="avatar"/>
                    {:else}
                        <Icon icon={getContext("iconDefaultUser")} class="is-size-3"/>
                    {/if}
                </div>
            </div>
        </a>

        <div class="navbar-dropdown is-right has-text-weight-semibold">

            <a href="/myProfile" class="navbar-item">{userName} {text.toProfile}</a>

            <hr class="navbar-divider">

            <a href="/changePassword" class="navbar-item">{text.changePassword}</a>
            <a class="navbar-item" on:click="{logout}">{text.logOut}</a>
        </div>

    {:else}

        <div class="navbar-item">
            <a href="/login" class="has-text-centered">
                <div class="d-flex align-items-center">
                    <Icon icon={getContext("iconSignIn")} class="text-1dot5rem"/>
                    <span class="is-hidden-touch">{text.signIn}</span>
                </div>
            </a>
        </div>

    {/if}

</div>




<style>

    .avatarDefault {
        background-color: #FFF;
        max-height: 3rem;
        border-radius: 50%;
    }

    .dropdown-adjust {
        margin-top: 0.5rem;
    }

</style>
