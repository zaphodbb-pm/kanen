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


    //* props
    export let icon  = "";
    export let title = "";
    export let service = ""

    //* support files
    import Icon from '/imports/components/elements/icon.svelte'
    import {createEventDispatcher, getContext} from 'svelte';
    const dispatch = createEventDispatcher();


    //* access auth service
    function authService() {

        if(service){
            Meteor[service]({}, function (err) {
                dispatch("on-auth", {service: title, err: err, auth: !err});
            });
        }
    }

</script>

<div class="level-item">
    <a class="button is-info login-circle" on:click="{authService}" {title}>
        <Icon icon={getContext(icon)} class="text-2dot0rem"/>
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
