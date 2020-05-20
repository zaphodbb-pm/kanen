<template>

    <div class="field" style="position: relative;" v-bind:class="fieldOpt" v-show="!fieldHide">

        <div v-if="fieldType === 'input'" class="control">
            <vue-inputs
                    v-bind:id="field"
                    v-bind:attributes="attributes"
                    v-bind:cmpLabel="label"
                    v-model="fieldValue"
                    v-on:on-inputentry="fieldUpdate"
                    v-bind:aria-describedby="helpText">
            </vue-inputs>
        </div>

        <div v-else-if="fieldType === 'textarea'" class="control">
            <vue-textarea
                    v-bind:id="field"
                    v-bind:attributes="attributes"
                    v-bind:cmpLabel="label"
                    v-model="fieldValue"
                    v-on:on-textentry="fieldUpdate"
                    v-bind:aria-describedby="helpText">
            </vue-textarea>
        </div>

        <div v-else-if="fieldType === 'switch'" class="control">
            <div class="box is-box-small">
                <vue-switch
                        v-bind:id="'cb' + field"
                        v-bind:switchLabel="label"
                        v-bind:switchField="field"
                        v-on:on-switch="fieldUpdate"
                        v-model="fieldValue"
                        v-bind="attributes"
                        v-bind:aria-describedby="helpText">
                </vue-switch>
            </div>
        </div>

        <div v-else-if="fieldType === 'checkboxes'" class="control">
            <div class="box is-small">
                <vue-checkboxes
                        v-bind:id="'cb' + field"
                        v-bind:source="fieldSelects"
                        v-bind:cbField="field"
                        v-bind:cbLabel="label"
                        v-bind:parms="fieldParms"
                        v-on:on-checkbox="fieldUpdate"
                        v-model="fieldValue"
                        v-bind="attributes"
                        v-bind:aria-describedby="helpText">
                </vue-checkboxes>
            </div>
        </div>


        <div v-else-if="fieldType === 'radios'" class="control">
            <div class="box is-box-small">

                <vue-radios
                        v-bind:id="'rad' + field"
                        v-bind:source="fieldSelects"
                        v-bind:radField="field"
                        v-bind:radLabel="label"
                        v-bind:parms="fieldParms"
                        v-on:on-radios="fieldUpdate"
                        v-model="fieldValue"
                        v-bind="attributes"
                        v-bind:aria-describedby="helpText">
                </vue-radios>
            </div>
        </div>

        <div v-else-if="fieldType === 'colours'" class="control">
            <div class="box is-box-small">

                <vue-colours
                        v-bind:id="field"
                        v-bind:attributes="attributes"
                        v-bind:cmpLabel="label"
                        v-model="fieldValue"
                        v-on:on-colourentry="fieldUpdate"
                        v-bind:aria-describedby="helpText">
                </vue-colours>
            </div>
        </div>

        <div v-else-if="fieldType === 'date'" class="control control-flatpickr">
            <vue-flat-pickr class="input"
                            v-model="fieldValue"
                            v-bind:config="fieldParms"
                            v-bind:placeholder="label"
                            v-on:on-change="fieldUpdate"
                            v-bind:aria-describedby="helpText">
            </vue-flat-pickr>
            <label class="has-float-label">{{label}}</label>
        </div>

        <div v-else-if="fieldType === 'timePicker'" class="control">
            <vue-time-picker v-bind:id="field"
                             v-bind:label="label"
                             v-bind:config="fieldParms"
                             v-model="fieldValue"
                             v-on:on-input-time="fieldUpdate"
                             v-bind:aria-describedby="helpText">
            </vue-time-picker>
        </div>

        <div v-else-if="fieldType === 'select'" class="control">
            <vue-selects
                    class="is-fullwidth"
                    v-bind:id="field"
                    v-bind:cmpSelects="fieldSelects"
                    v-bind:cmpLabel="label"
                    v-on:on-select="fieldUpdate"
                    v-model="fieldValue"
                    v-bind="{parms: fieldParms, value: fieldValue}"
                    v-bind:aria-describedby="helpText">
            </vue-selects>
        </div>

        <div v-else-if="fieldType === 'typeahead'" class="control">
            <vue-typeahead
                    v-bind:id="field"
                    v-bind:source="fieldSelects"
                    v-bind:cmpLabel="label"
                    v-on:on-select="fieldUpdate"
                    v-model="fieldValue"
                    v-bind="{parms: fieldParms, value: fieldValue}"
                    v-bind:aria-describedby="helpText">
            </vue-typeahead>
        </div>

        <div v-else-if="fieldType === 'typeaheadSearch'" class="control">
            <vue-typeahead-search
                    v-bind:id="field"
                    v-bind:source="fieldSelects"
                    v-bind:cmpLabel="label"
                    v-on:on-select="fieldUpdate"
                    v-model="fieldValue"
                    v-bind="{parms: fieldParms, value: fieldValue}"
                    v-bind:aria-describedby="helpText">
            </vue-typeahead-search>
        </div>

        <div v-else-if="fieldType === 'editor'" class="control">
            <vue-editor name="content"
                        v-bind:id="field"
                        v-bind="attributes"
                        v-bind:placeholder="label"
                        v-bind:config="config"
                        v-model="fieldValue"
                        v-on:text-change="fieldUpdate"
                        v-bind:aria-describedby="helpText">
            </vue-editor>
            <label class="has-float-label">{{label}}</label>
        </div>

        <div v-else-if="fieldType === 'apiKey'" class="control">
            <vue-apikey
                    v-bind:id="field"
                    v-bind="[attributes, {ph: fieldText, parms: fieldParms, value: fieldValue}]"
                    v-bind:placeholder="fieldText"
                    v-bind:cmpLabel="label"
                    v-model="fieldValue"
                    v-on:on-apikey="fieldUpdate"
                    v-bind:aria-describedby="helpText">
            </vue-apikey>
        </div>

        <div v-else-if="fieldType === 'fileInput'" class="control">
            <vue-file-browse
                    v-bind:id="field"
                    v-bind="{ph: fieldText, parms: fieldParms, value: fieldValue}"
                    v-bind:cmpLabel="label"
                    v-bind:placeholder="fieldText"
                    v-model="fieldValue"
                    v-on:on-newfile="fieldUpdate"
                    v-bind:aria-describedby="helpText">
            </vue-file-browse>
        </div>

        <div v-else-if="fieldType === 'dragColumns'" class="control">
            <vue-drag-columns
                    v-bind:id="field"
                    v-bind:cmpLabel="label"
                    v-bind:attributes="attributes"
                    v-bind:parms="fieldParms"
                    v-model="fieldValue"
                    v-on:on-itemlist="fieldUpdate"
                    v-bind:aria-describedby="helpText">
            </vue-drag-columns>
        </div>

        <div v-else-if="fieldType === 'rows'" class="control">
            <vue-rows
                    v-bind:id="field"
                    v-bind:cmpLabel="label"
                    v-bind:attributes="attributes"
                    v-bind:parms="fieldParms"
                    v-bind:value="fieldValue"
                    v-model="fieldValue"
                    v-on:on-fieldset="fieldUpdate"
                    v-bind:aria-describedby="helpText">
            </vue-rows>
        </div>

        <div v-else-if="fieldType === 'arrayList'" class="control">
            <vue-array-list
                    v-bind:id="field"
                    v-bind:cmpLabel="label"
                    v-bind:attributes="attributes"
                    v-bind:parms="fieldParms"
                    v-model="fieldValue"
                    v-on:on-arraylist="fieldUpdate"
                    v-bind:aria-describedby="helpText">
            </vue-array-list>
        </div>

        <div v-else-if="fieldType === 'itemList'" class="control">
            <vue-item-list
                    v-bind:id="field"
                    v-bind:cmpLabel="label"
                    v-bind:attributes="attributes"
                    v-bind:parms="fieldParms"
                    v-bind:source="fieldSelects"
                    v-model="fieldValue"
                    v-on:on-itemlist="fieldUpdate"
                    v-bind:aria-describedby="helpText">
            </vue-item-list>
        </div>

        <div v-else-if="fieldType === 'fieldset'" class="control">
            <vue-fieldset
                    v-bind:id="field"
                    v-bind:cmpLabel="label"
                    v-bind:attributes="attributes"
                    v-bind:parms="fieldParms"
                    v-bind:value="fieldValue"
                    v-model="fieldValue"
                    v-on:on-fieldset="fieldUpdate"
                    v-bind:aria-describedby="helpText">
            </vue-fieldset>
        </div>

        <div v-if="fieldType === 'hr'" class="is-divider field-hr" style="margin: 2.5rem 0 0.5rem 0;" v-bind:id="field"
             v-bind:data-content="label"></div>

        <span class="field-info has-text-primary add-cursor" v-if="helpText" v-on:click.stop="toggleHelp">
            <i v-bind:class="helpIcon"></i>
        </span>

        <div v-bind:class="{'open-body': fieldHelpShow, 'close-body': !fieldHelpShow}">
            <p class="mt-2 is-family-secondary" v-html="helpText"></p>
        </div>

    </div>

</template>


<script>
    /**
     * @summary Vue based form wrapper around input fields.
     *
     * @memberof Components_Form
     * @function vue-formFields
     * @locus Client
     * @isTemplate true
     * @augments vue-formTabFields
     *
     * @requires VueInputs_from_'./fieldTypes/vue-inputs'
     * @requires VueSelect_from_'./fieldTypes/vue-selects'
     * @requires VueSwitch_from_'./fieldTypes/vue-switch'
     * @requires VueCheckboxes_from_'./fieldTypes/vue-checkboxes'
     * @requires VueRadios_from_'./fieldTypes/vue-radios'
     * @requires VueTextarea_from_'./fieldTypes/vue-textarea'
     * @requires VueApikey_from_'./fieldTypes/vue-apikey'
     * @requires VueFileBrowse_from_'./fieldTypes/vue-fileBrowse'
     * @requires VueRows_from_'./fieldTypes/vue-rows'
     * @requires VueFieldset_from_'./fieldTypes/vue-fieldset'
     * @requires VueFlatPickr_from_'vue-flatpickr-component'
     * @requires VueTimePicker from '/imports/client/components/vues-widgets/vue-timePicker'
     * @requires 'flatpickr/dist/flatpickr.css'
     * @requires {VueEditor}_from_'vue2-editor'
     * @requires VueTypeahead_from_'./fieldTypes/vue-typeahead'
     *
     * @param {String}  field - unique field name identifier
     * @param {String}  fieldType - type of input field
     * @param {Number}  tab - if tabbed fields are set, defines which tab to show this field
     *
     * @paran {Object}  attributes - optional additional html attribute settings for field type
     * @paran {Object}  params - optional additional configuration information for field type
     * @param {Boolean} optional - flags a field that must have user input to be valid
     * @param {String}  defaultValue - initial input value
     *
     * @param {String}  label - field label; automatically loaded from associated text file
     * @param {String}  helpText - optional help text to explain the input field meaning; ditto
     * @param {String}  fieldText - optional field text label (ie apiKey); ditto
     * @param {String}  selectsText - optional selects array for 'select', 'checkbox' and 'radio'; ditto
     *
     * @return nothing - emits: field-changed
     *
     * @notes
     * 1. Supports common inputs 'text', 'number', 'email', 'password', 'tel'
     * 2. Supports more complex 'textarea', 'select', 'checkbox', 'radio', 'switch', 'date', 'upload'
     * 3. Supports custom 'apiKey', 'editor'
     *
     */

    /*
     *  This form component is fully data driven by using an array of objects.  Each object defines an
     *  input component, its attributes and any associated parameters to configure it.
     *  We debated using more Vue components versus less boilerplate code.  By using more components,
     *  one would need to replicate Vue boilerplate for each component.  By using one set of boilerplate code,
     *  one ends up with a single large component.  Our decision was to reduce errors and ease maintenance by
     *  having one set of code and consequently living with a more complex template.
     *
     */

    //import {validateEmail} from '/imports/both/functions/func-validateEmail'

    import VueInputs from './fieldTypes/vue-inputs'
    import VueSelects from './fieldTypes/vue-selects'
    import VueSwitch from './fieldTypes/vue-switch'
    import VueCheckboxes from './fieldTypes/vue-checkboxes'
    import VueRadios from './fieldTypes/vue-radios'
    import VueColours from './fieldTypes/vue-colourPicker'
    import VueTextarea from './fieldTypes/vue-textarea'
    import VueItemList from './fieldTypes/vue-itemList'
    import VueArrayList from './fieldTypes/vue-arrayList'

    import VueApikey from './fieldTypes/vue-apikey'
    import VueFileBrowse from './fieldTypes/vue-fileBrowse'
    import VueRows from './fieldTypes/vue-rows'
    import VueFieldset from './fieldTypes/vue-fieldset'
    import VueDragColumns from './fieldTypes/vue-dragColumns'

    import VueFlatPickr from 'vue-flatpickr-component'
    import VueTimePicker from '/imports/client/components/vues-widgets/vue-timePicker'

    import {VueEditor} from 'vue2-editor'
    import VueTypeahead from './fieldTypes/vue-typeahead'
    import VueTypeaheadSearch from './fieldTypes/vue-typeaheadSearch'
    import {validateEmail} from "../../../both/functions/func-validateEmail";


    export default {

        props: {
            field: String,
            fieldType: String,
            tab: Number,
            listen: Object,
            watchFields: Object,
            rawFields: Array,

            attributes: Object,
            params: Object,
            optional: Boolean,
            defaultValue: [String, Number, Boolean, Object, Array, Date],

            label: String,
            helpText: String,
            fieldText: String,

            selects: {
                type: Array,
                required: false,
                default: function () {
                    return [];
                }
            },

            value: [String, Number, Boolean, Object, Array, Date],
        },

        components: {
            VueInputs,
            VueSelects,
            VueSwitch,
            VueCheckboxes,
            VueRadios,
            VueColours,
            VueTextarea,
            VueFlatPickr,
            VueTimePicker,
            VueEditor,
            VueApikey,
            VueFileBrowse,
            VueTypeahead,
            VueTypeaheadSearch,
            VueRows,
            VueFieldset,
            VueItemList,
            VueArrayList,
            VueDragColumns
        },

        data: function () {
            return {
                config: {},
                helpIcon: kanen.icons.HELP,
                formTab: this.tab,

                fieldOpt: this.optional ? "" : "field-error",
                fieldValue: this.defaultValue,
                fieldParms: this.params,
                fieldSelects: this.selects,
                fieldDebounce: this.defaultValue,
                fieldHelpShow: false,

                fieldHide: false,
            }
        },

        watch: {
            defaultValue(newVal) {
                //** allow boolean or text:boolean values
                let testVal = newVal !== "true" ? newVal : true;
                testVal = newVal !== "false" ? newVal : false;
                this.fieldValue = testVal;
                this.fieldOpt = this.testValid(this.fieldValue);

                console.log("defaultValue", this.field, newVal)
            },

            value(val) {
                let checkVal = typeof val !== "undefined" ? val : this.defaultValue;
                this.fieldOpt = this.testValid(checkVal);
                this.fieldValue = checkVal;

                //* for initial state, check for watched default
                if (this.listen && this.listen.src) {
                    let raw = this.rawFields;
                    this.fieldHide = this.checkDefault(raw, this.listen);
                }
            },

            watchFields() {
                //* check to make sure that we should watch another field and hide if default value
                if (this.watchFields && this.listen && this.listen.src && (this.listen.src === this.watchFields.field)) {
                    this.fieldHide = this.checkWatched(this.watchFields, this.listen);
                }
            }
        },


        methods: {

            fieldUpdate(msg) {
                const self = this;
                let outValue = null;

                switch (true) {
                    case (this.attributes && this.attributes.type === "email"):
                        outValue = msg;
                        this.fieldOpt = msg.length < 1 || validateEmail(msg) ? "" : "field-error";
                        break;

                    case this.fieldType === "editor":
                        outValue = this.fieldValue;
                        this.fieldOpt = this.testValid(outValue);
                        break;

                    case this.fieldType === "date":
                        outValue = msg;
                        if (Array.isArray(msg)) {
                            outValue = outValue[0];
                        }

                        if (outValue) {
                            let test = new Date(outValue);
                            outValue = test.toISOString();
                        }

                        this.fieldOpt = this.testValid(outValue);
                        break;

                    default:
                        outValue = msg;
                        this.fieldOpt = this.testValid(outValue);
                }

                //*** some inputs (ie. date) require time to update input element
                setTimeout(function () {

                    self.$emit('field-changed', {
                        field: self.field,
                        fieldType: self.fieldType,
                        value: outValue,
                        defaultValue: self.defaultValue,
                        valid: self.fieldOpt !== "field-error",
                    });

                }, 10);
            },

            toggleHelp() {
                this.fieldHelpShow = !this.fieldHelpShow;
            },

            testValid(val) {
                //** test for valid values in field
                let test = false;

                if (typeof val === "object" && val !== null) {
                    if (Array.isArray(val)) {
                        test = val.length > 0;
                    } else {
                        test = val._id && !!val._id;
                    }
                } else {
                    test = !!val;
                }

                return this.optional || test ? "" : "field-error";
            },

            checkWatched(watched, listen) {
                let hide = false;
                let key = listen.key;
                let val = listen.value;

                switch (true) {

                    case !!(key && !val):
                        hide = watched.value[key] === watched.defaultValue[key];
                        break;

                    case !!(key && val):
                        if (val.includes("!")) {
                            hide = ("!" + watched.value[key] === val);
                        } else {
                            hide = !(watched.value[key] === val);
                        }
                        break;

                    case !!(!key && val):
                        if (val.includes("!")) {
                            hide = (("!" + watched.value) === val);
                        } else {
                            hide = !(watched.value === val);
                        }
                        break;

                    default:
                        hide = watched.value === watched.defaultValue;
                }

                return hide;
            },

            checkDefault(arr, listen) {
                //* for initial state, check for watched default and select value to track
                let out = false;

                arr.forEach(function (s) {
                    if (s.field === listen.src) {

                        switch (true) {

                            case s.value.hasOwnProperty('_id') && s.defaultValue.hasOwnProperty('_id'):
                                out = s.value._id === s.defaultValue._id;
                                out = out || (listen.value !== s.value._id);
                                break;

                            case s.value.hasOwnProperty('name') && s.defaultValue.hasOwnProperty('name'):
                                out = s.value.name === s.defaultValue.name;
                                out = out || (listen.value !== s.value.name);
                                break;

                            default:
                                out = s.value === s.defaultValue;
                        }
                    }
                });

                return out;
            },

            triggerByField(info){
                this.$emit("trigger-by-form-field", info);
            }
        }
    }

</script>


<style scoped>

    .field-info {
        position: absolute;
        top: -12px;
        right: -12px;
        font-size: 1.6rem;
        background-color: #FFF;
        line-height: 0;
        border-radius: 50%;
        padding: 0.25rem;
        z-index: 10;
    }

    .field-hr::after {
        color: #777 !important;
        font-size: 1rem;
    }

    .is-box-small {
        padding: 0.75rem;
    }

    .open-body {
        overflow: hidden;
        max-height: 50rem;

        transition-property: all;
        transition-duration: 3s;
        transition-timing-function: cubic-bezier(0.25, 0.1, 0.25, 1);
    }

    .close-body {
        overflow: hidden;
        max-height: 0;

        transition-property: all;
        transition-duration: 1.5s;
        transition-timing-function: cubic-bezier(0.25, 0.1, 0.25, 1);
    }

</style>
