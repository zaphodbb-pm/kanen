<template>

    <div class="field d-flex align-items-center">

        <div class="vue-switch-toggle" v-bind:class="{'has-background-primary': switchValue}" v-on:click.stop="clickSwitch">
            <div class="vue-switch-toggle-bubble" v-bind:class="{'bubble-on': switchValue}"></div>
        </div>

        <label class="vue-switch-label">{{switchLabel}}</label>

    </div>

</template>

<script>
    /**
     * @summary Vue checkbox with switch css.
     *
     * @memberof Components_Form
     * @function vue-switch
     * @locus Client
     * @isTemplate true
     * @augments vue-formFields
     *
     * @return nothing - emits: onSwitch with Boolean value
     *
     */

    export default {
        props: {
            value: Boolean,
            attributes: Object,
            switchLabel: String,
            switchField: String
        },

        data() {
            return {
                switchValue: this.value,
            }
        },

        mounted(){
            this.switchValue = !!this.value;
        },

        watch: {
            value() {
                this.switchValue = this.value;
            }
        },

        methods: {
            clickSwitch(){
                this.switchValue = !this.switchValue;
                this.$emit('on-switch', this.switchValue)
            }
        }
    }
</script>

<style scoped>
    .vue-switch-label {
        margin-left: 1rem;
    }
    .vue-switch-toggle {
        position: relative;
        height: 1.5rem;
        width: 3rem;
        border-radius: 0.75rem;
        background-color: #ccc;
        cursor: grab;
    }

    .vue-switch-toggle-bubble {
        position: absolute;
        height: 1rem;
        width: 1rem;
        border-radius: 0.5rem;
        background-color: white;
        left: 0.25rem;
        right: auto;
        top: 0.25rem;
        transform: translateX(0);
        transition-duration: 0.5s;
    }

    .vue-switch-toggle-bubble.bubble-on {
        transform: translateX(1.5rem);
        transition-duration: 0.5s;
    }

</style>
