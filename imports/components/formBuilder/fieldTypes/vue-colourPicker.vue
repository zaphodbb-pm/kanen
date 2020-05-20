<template>

    <div class="colours">

        <input class="input"
               v-bind="attributes"
               v-bind:placeholder="cmpLabel"
               v-bind:style="{backgroundColor: selectedSwatch, color: colour }"
               v-model="inValue">

        <label class="has-float-label">{{cmpLabel}}</label>

        <div class="select-area mt-3">
            <div class="d-flex" v-for="row in swatches">
                <div class=" add-cursor" v-for="col in row">

                    <div class="swatch"
                         v-bind:style="{backgroundColor: col }"
                         v-bind:title="col"
                         v-on:click="showValue(col)">
                    </div>

                </div>
            </div>
        </div>

    </div>

</template>

<script>
    /**
     * @summary Vue radio colour picker.
     *
     * @memberof Components_Form
     * @function vue-colourPicker
     * @locus Client
     * @isTemplate true
     * @augments vue-formFields
     *
     * @requires {textColour}_from_'/imports/client/functions/func-textColour'
     *
     * @return nothing - emits: on-colourentry with string rgb value
     *
     */

    import {textColour} from '/imports/client/functions/func-textColour'

    export default {
        props: {
            value: [String, Number],
            attributes: Object,
            cmpLabel: String,
        },

        data() {
            return {
                inValue: "",

                swatches: this.buildSwatches(),
                selectedSwatch: "",
                colour: "#000"
            }
        },

        watch: {

            value() {
                this.inValue = this.value;
                this.selectedSwatch = this.value;
                this.colour = textColour(this.value);
            }
        },

        methods: {

            buildSwatches() {

                return [
                    ["rgb(255, 170, 170)", "rgb(255, 128, 128)", "rgb(255, 0, 0)", "rgb(200, 64, 64)", "rgb(128, 64, 64)"],
                    ["rgb(170, 255, 170)", "rgb(128, 255, 128)", "rgb(0, 255, 0)", "rgb(64, 200, 64)", "rgb(64, 128, 64)"],
                    ["rgb(170, 170, 255)", "rgb(128, 128, 255)", "rgb(0, 0, 255)", "rgb(64, 64, 200)", "rgb(64, 64, 128)"],

                    ["rgb(255, 255, 170)", "rgb(255, 255, 128)", "rgb(255, 255, 0)", "rgb(255, 190, 0)", "rgb(255, 128, 0)"],
                    ["rgb(255, 170, 255)", "rgb(255, 128, 255)", "rgb(255, 0, 255)", "rgb(200, 64, 200)", "rgb(128, 64, 128)"],
                    ["rgb(170, 255, 255)", "rgb(128, 255, 255)", "rgb(0, 255, 255)", "rgb(64, 200, 200)", "rgb(64, 128, 128)"],

                    ["rgb(240, 240, 240)", "rgb(170, 170, 170)", "rgb(128, 128, 128)", "rgb(64, 64, 64)", "rgb(0, 0, 0)"]
                ];
            },

            showValue(col) {
                this.selectedSwatch = col;
                this.inValue = col;
                this.colour = textColour(col);

                this.$emit('on-colourentry', this.inValue);
            }
        }
    }
</script>

<style scoped>

    .swatch {
        height: 2rem;
        width: 2rem;
        border-radius: 50%;
        margin: 0.5rem;
    }

</style>