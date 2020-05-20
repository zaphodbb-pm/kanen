<template>

    <div class=" card">

        <div v-if="config.showHdr" class="card-header" v-bind:class="config.bgTitle">
            <div class="card-header-title" style="color: inherit; font-size: inherit; font-weight: inherit;">
                {{config.label}}
            </div>

            <a v-if="showClone"
               class="button is-pulled-right mx-2 my-2"
               v-on:click="cloneItem"
               v-bind:class="bgClone">
                {{config.cloneBtn}}
            </a>
        </div>

        <div class="card-content">

            <div id="tabbed-inputs">
                <vue-form-tab-fields
                        v-bind="info.mainFields"
                        v-on:trigger-from-tab-field="$emit('trigger-from-form-holder', $event)"
                        v-on:tabfc="newValue">
                </vue-form-tab-fields>

                <div class="buffer-y-large mt-4">
                    <div class="level">

                        <div class="level-left">
                            <vue-form-submit
                                    v-bind="info.submit"
                                    v-on:submit-btn="submitDoc"
                                    v-on:back-btn="backToCaller">
                            </vue-form-submit>
                        </div>

                        <div class="level-right">
                            <button class="button is-info"
                                    v-if="hasPreview && info.submit.btnState"
                                    v-on:click="showPreview">
                                {{previewBtn}}
                            </button>
                        </div>

                    </div>
                </div>

            </div>

        </div>
    </div>

</template>


<script>
    /**
     * @summary top level Vue component that holds a document edit form.
     *
     * @memberof Components_Form
     * @function vue-formHolder
     * @locus Client
     * @isTemplate true
     *
     * @requires {graphGetDocs}_from_'/imports/client/functions/func-graphGetDocs'
     * @requires {submitForm}_from_'./func-submitForm'
     * @requires {orgFields}_from_'./func-orgFields'
     *
     * @requires VueFormTabFields_from_'./vue-formTabFields.vue'
     * @requires VueFormSubmit_from_'./vue-formSubmit'
     *
     * @param {Object} config - see example
     * @param {Array} form - schema objects to build form
     * @param {String} role - user roles that have access to this form
     * @param {Object} editdoc - document id to fetch and load into form
     * @param {Object} directdoc - full doc object with values; bypasses collection fetch cycle by "editdoc"
     * @param {String} coll - valid collection name
     *
     * @return nothing
     *
     * @emits {Boolean} back-to-list - for overlayed list / form pairs
     * @emits {Object} show-form-preview - current document object with newly entered values
     * @emits {Boolean} doc-submitted - end of submit cycle; sent by function "submitForm"
     * @emits {Object} current-editted-doc - after submit; current document object with newly entered values
     *
     * @example
     *      configuration object to set up form
     *
     *          hasOverlay: false,                  // support for form overlaying the list during edit operation
     *          hasGroups: false,                   // allows fields to be grouped onto the same row
     *          hasStepper: false,                  // user a stepper layour to tab through set sof fields
     *          hasTabs: false,                     // uses tabs instead of stepper; note this should be opposite of 'hasStepper' or false
     *          hasPreview: true,                   // form can show a preview of select data fields
     *
     *          formTabs: text.formTabs,            // text for the tabs
     *
     *          clone: true,                        // show clone button on form
     *          cloneBtn: text.labels.cloneBtn,     // button labels
     *          createBtn: text.labels.createBtn,   // button labels
     *          backBtn: text.labels.backBtn,       // button labels
     *          editBtn: text.labels.editBtn,       // button labels
     *          previewBtn: text.labels.previewBtn, // button labels
     *
     *          showHdr: false,                     // show card header and title if true
     *          label: text.labels.hdr,             // text for header
     *          bgTitle: kanen.constants.BG_CARD,   // background colour for header
     *
     *          coll: base                          // collection to submit field values to
     *
     */

    //* get application specific support libraries
    import {graphGetDocs} from '/imports/client/functions/func-graphGetDocs'
    import {submitForm} from './func-submitForm'
    import {orgFields} from "./func-orgFields";

    import VueFormTabFields from './vue-formTabFields.vue'
    import VueFormSubmit from './formSubmit.svelte'


    export default {

        props: {
            config: Object,
            form: Array,
            role: String,
            editdoc: Object,
            coll: String,
            directdoc: Object
        },

        components: {
            VueFormTabFields,
            VueFormSubmit
        },

        data() {
            let tabLen = this.config.formTabs && Array.isArray(this.config.formTabs) ? this.config.formTabs.length : 0;

            return {
                //** define specific form fields
                info: {

                    mainFields: {
                        tabLabels: this.config.formTabs,

                        fields: [],
                        defaults: [],

                        hasTabs: tabLen > 0 && (!!this.config.hasTabs || !!this.config.hasStepper),
                        hasGroups: !!this.config.hasGroups,
                        hasStepper: !!this.config.hasStepper,

                        finishBtn: this.config.finishBtn,
                        finishBody: this.config.finishBody
                    },

                    submit: {
                        btnEdit: this.config.editBtn,
                        btnCreate: this.config.createBtn,
                        btnBack: this.config.backBtn,
                        btnBackShow: false,

                        btnState: false,
                        btnInvalid: false,
                        btnInvText: {
                            prefix: "Can't submit: ",
                            suffix1: " item needs entered value.",
                            suffixn: " items need entered values."
                        },
                        btnCount: 0
                    },
                },

                //** this component's working variables
                fieldValues: {},
                fieldValid: {},
                defaults: {},
                adjFields: [],
                initFields: [],

                created: false,
                currDoc: {},
                bgClone: kanen.constants.BG_BUTTON_CLONE,
                showClone: false,
                hasPreview: !!this.config.hasPreview,
                previewBtn: this.config.previewBtn,

                //** determine what layout switches are active
                organize: {
                    hasTabs: tabLen > 0 && (!!this.config.hasTabs || !!this.config.hasStepper),
                    tabLen: tabLen,
                    hasGroups: !!this.config.hasGroups,
                }
            };
        },

        watch: {

            async editdoc() {
                const self = this;

                this.currDoc = {};
                this.fieldValues = {};
                this.showClone = false;
                this.info.submit.btnBackShow = false;

                switch (true) {
                    case this.coll && this.coll === "myProfile":
                        this.currDoc = this.editdoc.data;
                        self.info.mainFields.fields = orgFields(this.organize, this.form, this.currDoc, this.role);
                        break;

                    case this.editdoc.type && this.editdoc.type === "edit":
                        this.currDoc = await graphGetDocs(this.coll, "oneAllFields", {_id: this.editdoc.id}, {}, null);
                        this.showClone = this.config.clone;
                        this.info.submit.btnBackShow = !!this.config.hasOverlay;
                        break;

                    case this.editdoc.type && this.editdoc.type === "create":
                        this.currDoc = Object.assign({}, this.editdoc.data ? this.editdoc.data : {});
                        this.showClone = false;
                        this.info.submit.btnBackShow = !!this.config.hasOverlay;
                        break;

                    default:
                        this.currDoc = {};
                }

                let isEmpty = !this.currDoc || Object.keys(this.currDoc).length === 0;
                if (isEmpty) {
                    //*** reset form to default state
                    this.info.submit.btnState = false;
                    this.clone = false;
                    this.info.mainFields.fields = orgFields(this.organize, this.form, this.initFields, this.role);
                } else {
                    this.clone = this.config.clone;
                    this.info.submit.btnState = true;
                    this.info.mainFields.fields = orgFields(this.organize, this.form, this.currDoc, this.role);
                }
            },

            directdoc() {
                this.info.mainFields.fields = orgFields(this.organize, this.form, this.directdoc, this.role);
            }
        },

        mounted() {
            const self = this;

            this.form.forEach(function (f) {
                self.defaults[f.field] = f.defaultValue;
            });

            //** note that there is a lot of "reactivity entanglement" to manage
            this.adjFields = orgFields(this.organize, this.form, this.defaults, this.role);
            this.initFields = Object.assign({}, this.adjFields);
            this.info.mainFields.fields = this.adjFields;
            this.info.mainFields.defaults = this.adjFields;
        },

        methods: {
            backToCaller(msg) {
                this.$emit("back-to-list", msg);
            },

            showPreview() {
                let newValues = Object.assign(this.currDoc, this.fieldValues);
                this.$emit("show-form-preview", newValues);
            },

            newValue(msg) {
                this.fieldValues[msg.field] = msg.value;
                this.fieldValid[msg.field] = msg.valid;
            },

            async submitDoc() {
                const self = this;
                let newValues = {};

                //** flag as a newly created doc
                if (!this.info.submit.btnState) {
                    let defFields = Object.assign({}, this.defaults);
                    newValues = Object.assign(defFields, this.fieldValues);
                    delete newValues._id;
                    this.created = true;
                } else {
                    newValues = Object.assign(this.currDoc, this.fieldValues);
                    this.created = false;
                }


                //** check for invalid / data not entered fields; create an independent object first
                let invalids = this.form.map((fld) => fld);

                let valid = invalids.reduce(function (tot, check) {
                    const checkVal = newValues[check.field];
                    const checkValid = self.fieldValid[check.field];
                    let isOptional = check.optional;

                    let test = !!checkVal;                           // test = true is valid value else false

                    if (checkVal && typeof checkVal === "object") {
                        test = Array.isArray(checkVal) ? checkVal.length > 0 : checkVal._id && !!checkVal._id;
                    }

                    //** over-rides other checks; typically looks for valid email
                    if(typeof checkValid === "boolean"){
                        test = checkValid;
                        isOptional = false;
                    }

                    return tot + (!isOptional && !test ? 1 : 0);
                }, 0);

                //** display error message or submit document
                if (valid > 0) {
                    this.info.submit.btnInvalid = true;
                    this.info.submit.btnCount = valid;
                } else {
                    if (this.config.preSubmit) {
                        newValues = await this.config.preSubmit(newValues);
                    }

                    //** reset form to default state
                    this.fieldValues = {};
                    this.clone = false;
                    this.info.submit.btnState = false;
                    this.info.submit.btnInvalid = false;
                    this.info.submit.btnCount = 0;

                    //** Note that Vue reactivity tries to be efficient with variable updates.
                    //** This causes a problem when doing a new doc creation and so we need to
                    //** "encourage" Vue to update in this case.
                    this.info.mainFields.fields = this.adjFields;

                    Meteor.setTimeout(function () {
                        //** send completed doc to server insert / update methods
                        submitForm(newValues, self.coll, false, false, self);
                        self.info.mainFields.fields = self.info.mainFields.defaults;

                        self.$emit("current-editted-doc", newValues);
                    }, 50);
                }
            },

            cloneItem(){
                const self = this;

                let newValues = Object.assign({}, this.currDoc, this.fieldValues);
                delete newValues._id;

                Meteor.setTimeout(function () {
                    //** send completed doc to server insert / update methods
                    submitForm(newValues, self.coll, true, false, self);
                    self.info.mainFields.fields = self.info.mainFields.defaults;

                    self.$emit("current-editted-doc", newValues);
                }, 50);
            }
        }
    }

</script>
