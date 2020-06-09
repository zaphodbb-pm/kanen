<script>
    /**
     * My Profile icon and activator for User Profile Page.
     *
     * @memberof Components:Elements
     * @function userProfile
     * @locus Client
     * @augments Navbar
     *
     * @param {String} title - profile link text
     * @param {String} signIn - text
     * @param {String} logOut - text
     * @param {String} changePassword - text
     *
     */


    /*
    import {Session} from "meteor/session";

    import {Meteor} from 'meteor/meteor'

    import {FlowRouter} from 'meteor/ostrio:flow-router-extra';

    import Vue from 'vue/dist/vue'

    import VueMeteorTracker from 'vue-meteor-tracker'

    import {buildNavLinkObjects} from '/imports/client/functions/func-buildNavLinkObjects'

    Vue.use(VueMeteorTracker);

     */

    //** event handlers
    import { getContext } from 'svelte';
    import {createEventDispatcher} from 'svelte';
    const dispatch = createEventDispatcher();

    import Icon from '/imports/components/elements/icon.svelte'

    //* component controls
    let text = getContext("navbar").userProfile;


    //* local reactive variables
    let defaultImg = "img"; //kanen.icons.SIGN_IN,
    let defaultAvatar = "";
    let showImg = false;
    let userName = "";

    let loggedIn = false;
    let logUser = null;


    let title = "Title";
    let userImg = "";
    let signIn = "sign in";
    let logOut = "log out";
    let changePassword = "change password";



    function logout() {
        Meteor.logout(function () {
            //Session.set("userExtras", {});
            //buildNavLinkObjects(null);

            //FlowRouter.go("/loginForm");

            console.log("logout");
        });
    }



    /*

    export default {

        props: {
            title: String,
            signIn: String,
            logOut: String,
            changePassword: String
        },

        data() {
            return {
                defaultImg: kanen.icons.SIGN_IN,
                defaultAvatar: "",
                showImg: false,
                userName: "",

                loggedIn: false,
                logUser: null,
            }
        },

        components: {},

        methods: {


        },

        meteor: {
            userImg() {
                let out = "";
                let user = Meteor.user();

                if (user) {
                    this.showImg = true;
                    this.defaultAvatar = "";

                    if (user.profile && user.profile.image && user.profile.image.src) {
                        out = user.profile.image.src;
                    } else {
                        out = "/avatar.png";
                        this.defaultAvatar = "avatarDefault"
                    }

                    let logUser = {
                        event: "login",
                        description: "User log in",

                        user: user.username,
                        name: user.profile && user.profile.name ? user.profile.name : "",
                        city: user.profile && user.profile.city ? user.profile.city : "",
                        since: user.createdAt ? user.createdAt : "",
                    };

                    this.userName = user.profile && user.profile.name ? user.profile.name : user.username;

                    // Meteor.call("writeLogs", "LogsSystem", logUser);

                } else {

                    this.showImg = false;
                }

                return out;
            }
        }
    }

     */

</script>


<div class="user-profile navbar-item has-dropdown is-hoverable">

    {#if showImg}

        <a class="navbar-link is-arrowless" style="height: 100%;">
            <div class="has-text-white" title="{title}">
                <div class="image is-32x32">
                    <img src="{userImg}"
                         class="is-rounded {defaultAvatar}"
                         style="max-height: 3rem;"
                         alt="avatar"/>
                </div>
            </div>
        </a>

        <div class="navbar-dropdown is-right has-text-weight-semibold">

            <a href="/empProfile" class="navbar-item">{userName} {text.toProfile}</a>

            <hr class="navbar-divider">

            <a href="/changePassword" class="navbar-item">{changePassword}</a>
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
    }

    .dropdown-adjust {
        margin-top: 0.5rem;
    }

</style>
