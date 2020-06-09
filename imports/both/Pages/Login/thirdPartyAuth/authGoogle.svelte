<script>
    /**
     * Google based login authentication.
     *
     * @memberof Pages:Login
     * @function authGoogle
     * @locus Client
     * @augments Login
     *
     * @param {String} label - optional string to show instead of icon
     * @param {String|Number} value - text to show in credit
     *
     */

    //* support files
    import Icon from '/imports/components/elements/icon.svelte'
    import {createEventDispatcher, setContext, getContext} from 'svelte';
    const dispatch = createEventDispatcher();

    //* convenience variables
    let serviceIcon  = "iconGoogle";
    let title = "Google";

    //* access auth service
    function authService() {
        Meteor.loginWithGoogle({}, function (err) {
            dispatch("on-auth", {err: err, auth: !err});
        });
    }

</script>



<div class="level-item">
    <a class="button is-info login-circle" on:click="{authService}" {title}>
        <Icon icon={getContext(serviceIcon)} class="text-2dot0rem"/>
    </a>
</div>



<style>

    .login-circle {
        height: 4rem;
        width: 4rem;
        border-radius: 50%;
        font-size: 2rem;
    }

</style>
