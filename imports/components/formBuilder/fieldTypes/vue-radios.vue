<template>

    <div class="columns is-multiline">
        <div class="column radio-field" v-bind:class="classWidth" v-for="(rad, index) in source" v-bind:key="index">

            <input type="radio"
                   class="is-checkradio"
                   v-bind:id="radField + 'radio' + index"
                   v-bind:name="radField + 'radio'"
                   v-bind="attributes"
                   v-bind:value="rad._id"

                   v-model="radValue._id"
                   v-on:change.stop="emitRadio(radValue._id)">

            <label v-bind:for="radField + 'radio' + index"><span>{{ rad.name }}</span></label>

        </div>

        <label class="has-float-label">{{radLabel}}</label>
    </div>

</template>

<script>
    /**
     * @summary Vue basic radios.
     *
     * @memberof Components_Form
     * @function vue-radios
     * @locus Client
     * @isTemplate true
     * @augments vue-formFields
     *
     * @return nothing - emits: onRadios with string value
     *
     */

    export default {
        props: {
            value: Object,
            attributes: Object,
            radLabel: String,
            radField: String,
            parms: Object,

            source: {
                type: Array,
                default: () => {
                    return []
                },
                required: true
            }
        },

        data() {
            return {
                radValue: this.value
            }
        },

        computed: {
            classWidth() {
                let cols = this.parms && this.parms.cols ? this.parms.cols : 1;
                let width = Math.floor(12 / cols);
                return `is-${width}`;
            }
        },

        watch: {

            value() {
                this.radValue = this.value;
            }
        },
        methods: {
            emitRadio(selId){
                let item = _.findWhere(this.source, {_id: selId});
                this.$emit('on-radios', item);
            }
        }
    }
</script>
