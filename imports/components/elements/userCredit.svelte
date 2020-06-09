<script>
    /**
     * @summary Credit widget to display user information.
     *
     * @memberof Components:Elements
     * @function userCredit
     * @locus Client
     * @augments Navbar
     *
     * @param {String} label - optional string to show instead of icon
     * @param {String|Number} value - text to show in credit
     *
     */

    // load top level Vue object and Vue page components
    //import Vue from 'vue/dist/vue'
    //import VueMeteorTracker from 'vue-meteor-tracker'
    //Vue.use(VueMeteorTracker);


    //* local reactive variables
    let label = "credit";
    let credit = "";

    //let count = credits()


    function creditCount(){
        //let credits = Session.get("userExtras");
        credits = {credit: 199};

        credits = credits && credits.credit ? credits.credit : 0;

        return credits.toFixed(0);
    }

</script>


<div class="user-credit navbar-item">

    <div class="tags has-addons">
        <span class="tag is-light has-text-weight-semibold is-medium">{creditCount()}</span>

        <span class="tag is-info is-medium is-hidden-mobile">
            {#if label}
                {label}
            {:else}

                icon
            {/if}

        </span>
    </div>

</div>
