<template>

    <div class="field has-addons">

        <div class="control">
            <a class="button is-primary" v-on:click="setkey">
                <i v-bind:class="icon" title=""></i>
            </a>
        </div>

        <div class="control is-expanded">
            <input type="text" class="input"
                   v-bind="attributes"
                   v-bind:placeholder="ph"
                   v-bind:value="val"
                   v-on:input="$emit('on-apikey', $event.target.val)">
        </div>

        <label class="has-float-label adjust-label">{{cmpLabel}}</label>

    </div>

</template>


<script>
    /**
     * @summary Vue based api key builder.
     *
     * @memberof Components_Form
     * @function vue-apikey
     * @locus Client
     * @isTemplate true
     * @augments vue-formFields
     *
     * @return nothing - emits: newApikey
     *
     * @notes
     * 1. Restricted to use by administrator to set api keys for users
     * 2. Uses window.crypto capability of modern browsers
     *
     */

    export default {

        props: {
            ph: String,
            parms: Object,
            value: String,
            attributes: Object,
            cmpLabel: String
        },

        data: function () {
            return {
                icon: kanen.icons.APIKEY,
                val: this.value
            };
        },

        methods: {
            setkey() {

                //** Own version of a character selector in order to keep all code contained within in this component
                let choices = "abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
                let out = [];

                let arr = new Uint8Array(this.parms.length || 24);
                window.crypto.getRandomValues(arr);

                arr.forEach(function (item) {
                    let pos = Math.round(item / 255 * choices.length);
                    out.push(choices.charAt(pos));
                });

                this.val = out.join("");
                this.$emit("on-apikey", this.val);
            },
        },

        watch: {
            value() {
                this.val = this.value;
            }
        }
    }
</script>