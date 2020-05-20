<template>

    <div>
        <input
                class="input"
                v-bind="attributes"
                v-bind:placeholder="cmpLabel"
                v-model="inValue"
                v-on:keyup="checkInput">

        <label class="has-float-label">{{cmpLabel}}</label>
    </div>

</template>

<script>
    /**
     * @summary Vue component for html input tags.
     *
     * @memberof Components_Form
     * @function vue-inputs
     * @locus Client
     * @isTemplate true
     * @augments vue-formFields
     *
     * @return nothing - emits: onInputs with text, number or other types
     *
     */


    export default {
        props: {
            value: [String, Number],
            attributes: Object,
            cmpLabel: String,
        },

        data() {
            return {
                inValue: ""
            }
        },

        watch: {

            value() {
                this.inValue = this.value;
            },

            inValue() {
                this.inValue = this.formatField(this.inValue, this.attributes);
            }
        },

        mounted(){
            this.inValue = this.value;
        },

        methods: {
            formatField(val, attr) {
                let value = val;

                if (attr && attr.type && (attr.type === "number")) {
                    if (value || value === 0) {
                        value = parseFloat(value);

                        if (attr.step && Number.isInteger(attr.step)) {
                            value = Math.round(value);
                        }

                        //** check if user input is within range bounds; note that a value of zero is consider as false
                        value = attr.min && value < attr.min ? attr.min : value;
                        value = attr.max && value >= attr.max ? attr.max : value;
                    } else {
                        value = "";
                    }
                }

                if (attr && attr.type && (attr.type === "phone")) {
                    value = ('' + value).replace(/\D/g, '');                // Filter only numbers from the input
                }

                return value;
            },

            checkInput() {
                this.$emit('on-inputentry', this.inValue);
            }
        }
    }
</script>
