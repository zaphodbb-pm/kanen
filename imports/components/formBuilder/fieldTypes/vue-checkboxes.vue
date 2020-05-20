<template>

    <div class="columns is-multiline">

        <label class="has-float-label">{{cbLabel}}</label>

        <div v-for="cb in source"
             v-bind:key="cb._id"
             v-bind:class="colWidth"
             class="column checkbox-field">

            <div v-bind:class="classes">
                <input type="checkbox"
                       v-bind:class="inputClass"
                       title=""
                       v-bind:id="cbField + '_checkbox_' + cb._id"
                       v-bind:name="cbField + '_checkbox_' + cb._id"
                       v-bind="attributes"
                       v-bind:value="cb._id"
                       v-model="checkedNames"
                       v-on:change.stop="emitCheckedNames">

                <div v-if="buttons" class="button-label">
                    <label class="button unchecked" v-bind:for="cbField + '_checkbox_' + cb._id">
                        {{cb.name}}
                    </label>

                    <label class="button is-primary checked"
                           v-bind:for="cbField + '_checkbox_' + cb._id">

                        {{cb.name}}
                    </label>
                </div>

                <label v-else v-bind:for="cbField + '_checkbox_' + cb._id">{{cb.name}}</label>
            </div>

        </div>

    </div>

</template>

<script>
    /**
     * @summary Vue basic checkbox.
     *
     * @memberof Components_Form
     * @function vue-checkboxes
     * @locus Client
     * @isTemplate true
     * @augments vue-formFields
     *
     * @param {Object} parms - {col: number, buttons: true} uses button layout instead of checkboxes
     *
     * @return nothing
     * @emits onCheckbox with Array of objects value: {_id, name}
     *
     */

    export default {
        props: {
            value: Array,
            attributes: Object,
            cbLabel: String,
            cbField: String,
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
            let isButton = !!(this.parms && this.parms.buttons);

            return {
                buttons: isButton,
                classes: isButton ? "checkbox-button" : "field",
                inputClass: isButton ? "" : "is-checkradio is-primary has-background-color",
                checkedNames: []
            }
        },

        computed: {

            colWidth() {
                let cols = this.parms && this.parms.cols ? this.parms.cols : 1;
                cols = cols === 7 ? null :  Math.round(12 / cols);

                return cols ? `is-${cols}` : "";
            }
        },

        watch: {
            value() {
                this.checkedNames = this.value.map( (val) => val._id);

                // debug to clean up old lists
                //this.checkedNames = [];
                //console.log("checkedNames", this.checkedNames);
            }
        },

        methods: {
            emitCheckedNames(){
                let items = this.checkedNames.map((cn) => {
                   return  _.findWhere(this.source, {_id: cn});
                } );

                this.$emit('on-checkbox', items)
            }
        }
    }
</script>


<style scoped>

    .checkbox-field:not(last-child) {
        padding-bottom: 0;
    }

    .checkbox-field:last-child {
        padding-bottom: 0.75rem;
    }

    .checkbox-button input[type="checkbox"] {
        opacity: 0;
        cursor: none;
    }

    .checkbox-button input[type="checkbox"] + .button-label > .unchecked {
        display: inline-flex;
    }

    .checkbox-button input[type="checkbox"]:checked + .button-label > .unchecked {
        display: none;
    }

    .checkbox-button input[type="checkbox"] + .button-label > .checked {
        display: none;
    }

    .checkbox-button input[type="checkbox"]:checked + .button-label > .checked {
        display: inline-flex;
    }

    .button-label {
        margin-top: -1.25rem;
    }

</style>
