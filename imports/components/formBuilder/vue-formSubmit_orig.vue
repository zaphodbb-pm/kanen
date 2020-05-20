<template>

    <div>
        <div class="d-flex">

            <div class="button"
                 v-bind:class="btnColor"
                 v-on:click="submit">
                {{formBtn}}
            </div>

            <button class="button is-info ml-5"
                    v-if="btnBackShow"
                    v-on:click="backToCaller">
                {{btnBack}}
            </button>

        </div>

        <p class="has-text-danger" v-if="btnInvalid">{{btnInvText.prefix}} {{btnCount}} {{invalidMsg}}</p>
    </div>

</template>


<script>
    /**
     * @summary Vue based submit button for form.
     *
     * @memberof Components_Form
     * @function vue-formSubmit
     * @augments vue-formHolder
     * @locus Client
     * @isTemplate true
     *
     * @param {String}   btnEdit
     * @param {String}   btnCreate
     * @param {Boolean}  btnState
     * @param {Boolean}  btnInvalid
     * @param {Object}   btnInvText
     * @param {Number}   btnCount
     *
     * @return nothing - emits: submit-btn
     *
     */

    export default {

        props: {
            btnEdit: String,
            btnCreate: String,
            btnBack: String,
            btnBackShow: Boolean,

            btnState: Boolean,
            btnInvalid: Boolean,
            btnInvText: Object,
            btnCount: Number,
        },

        data: function () {
            return {
                formBtn: this.btnCreate,
                formBtnColor: kanen.constants.BG_BUTTON,
                formBtnColorAlt: kanen.constants.BG_BUTTON_ALT,

                btnColor: kanen.constants.BG_BUTTON,
            }
        },

        methods: {
            submit() {
                this.$emit('submit-btn', true);
            },

            backToCaller() {
                this.$emit('back-btn', true);
            }
        },

        computed: {
            invalidMsg() {
                return this.btnCount === 1 ? this.btnInvText.suffix1 : this.btnInvText.suffixn;
            }
        },

        watch: {
            btnState() {
                this.formBtn = this.btnState ? this.btnEdit : this.btnCreate;
                this.btnColor = this.btnState ? this.formBtnColorAlt : this.formBtnColor;
            }
        }
    }

</script>