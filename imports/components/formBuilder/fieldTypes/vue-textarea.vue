<template>

    <div>
        <textarea
                class="textarea"
                v-bind:class="id"
                v-bind="attributes"
                v-bind:placeholder="cmpLabel"
                v-model="taValue"
                v-on:keyup="hasKeyup(taValue)"
                v-on:input="hasInput(taValue)">
        </textarea>

        <label class="has-float-label">{{cmpLabel}}</label>
    </div>

</template>

<script>
    /**
     * @summary Vue basic textarea box.
     *
     * @memberof Components_Form
     * @function vue-textarea
     * @locus Client
     * @isTemplate true
     * @augments vue-formFields
     *
     * @return nothing - emits: onTextentry with string value
     *
     */

    export default {
        props: {
            id: String,
            value: [String, Object, Array],
            attributes: Object,
            cmpLabel: String
        },

        data() {
            return {
                taValue: ""
            }
        },

        watch: {

            value() {
                if(typeof this.value === 'object'){
                    this.taValue =  JSON.stringify(this.value);
                }else{
                    this.taValue = this.value;
                }
            }
        },
        methods: {
            hasKeyup(val){
                this.$emit('on-textentry', val);
            },

            hasInput(val){
                this.$emit('on-textentry', val);
            }
        }
    }
</script>
