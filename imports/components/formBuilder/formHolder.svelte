<script>
    /**
     * Top level component that holds a document edit form.
     *
     * @memberof Components:Form
     * @function formHolder
     * @locus Client
     *
     * @param {Object} config - see example
     * @param {Object} formText - all form and children text (language adjusted) from parent
     * @param {Array} schema - array of schema objects to build form
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
     *          coll: base                          // collection to submit field values to
     *
     *          hasOverlay: false,                  // support for form overlaying the list during edit operation
     *          hasGroups: false,                   // allows fields to be grouped onto the same row
     *          hasStepper: false,                  // user a stepper layour to tab through set sof fields
     *          hasTabs: false,                     // uses tabs instead of stepper; note this should be opposite of 'hasStepper' or false
     *          hasPreview: true,                   // form can show a preview of select data fields
     *
     *          clone: true,                        // show clone button on form
     *          showHdr: false,                     // show card header and title if true
     *          bgTitle: elements.BG_CARD,          // background colour for header
     *
     */

    //* incoming props from page
    export let config;
    export let formText;
    export let schema;
    export let role;
    export let editdoc;
    export let coll;
    export let directdoc;

    //** svelte handlers
    import {onMount, setContext, getContext} from 'svelte';
    import {createEventDispatcher} from 'svelte';
    const dispatch = createEventDispatcher();


    //* make form text available to all children components
    setContext("formText", formText);

    //* get application specific support libraries
    import {elements} from '/imports/client/setup/systemGlobals'
    import {getDocs} from '/imports/functions/func-getDocs'
    import {submitForm} from './func-submitForm'
    import {orgFields} from "./func-orgFields";

    //* get children components
    import Form_Submit from './formSubmit.svelte'
    import Form_Tabs from './formTabFields.svelte'


    //* local reactive variables
    let tabLen = formText.formTabs && Array.isArray(formText.formTabs) ? formText.formTabs.length : 0;
    let hasTabs = tabLen > 0 && (!!config.hasTabs || !!config.hasStepper);

    let mainFields = {
        tabLabels: formText.formTabs,

        fields: [],
        defaults: [],

        hasTabs: config.hasTabs,
        hasGroups: config.hasGroups,
        hasStepper: config.hasStepper,

        //finishBtn: config.finishBtn,
        //finishBody: config.finishBody
    };

    let submit = {
        btnEdit: formText.labels.editBtn,
        btnCreate: formText.labels.createBtn,
        btnBack: formText.labels.backBtn,
        btnBackShow: false,

        btnState: false,
        btnInvalid: false,
        btnInvText: {
            prefix: "Can't submit: ",
            suffix1: " item needs entered value.",
            suffixn: " items need entered values."
        },
        btnCount: 0
    };

    //** this component's working variables
    let fieldValues = {};
    let fieldValid = {};
    let defaults = {};
    let adjFields = [];
    let initFields = [];

    let created = false;
    let currDoc = {};
    let bgClone = elements.BG_BUTTON_CLONE;
    let showClone = false

    //** determine what layout switches are active
    let organize = {
        hasTabs: hasTabs,
        tabLen: tabLen,
        hasGroups: config.hasGroups,
    }

    //info.mainFields.fields = orgFields(organize, schema, directdoc, role);

    $: loadEditdoc(editdoc);


    onMount( () => {
        schema.forEach(function (f) {
            defaults[f.field] = f.defaultValue;
        });

        //** note that there is a lot of "reactivity entanglement" to manage
        adjFields = orgFields(organize, schema, defaults, role);
        initFields = Object.assign({}, adjFields);
        mainFields.fields = adjFields;
        mainFields.defaults = adjFields;
    });






    async function submitDoc() {
        const self = this;
        let newValues = {};

        //** flag as a newly created doc
        if (!submit.btnState) {
            let defFields = Object.assign({}, defaults);
            newValues = Object.assign(defFields, fieldValues);
            delete newValues._id;
            created = true;
        } else {
            newValues = Object.assign(currDoc, fieldValues);
            this.created = false;
        }


        //** check for invalid / data not entered fields; create an independent object first
        let invalids = schema.map((fld) => fld);

        let valid = invalids.reduce(function (tot, check) {
            const checkVal = newValues[check.field];
            const checkValid = self.fieldValid[check.field];
            let isOptional = check.optional;

            let test = !!checkVal;                           // test = true is valid value else false

            if (checkVal && typeof checkVal === "object") {
                test = Array.isArray(checkVal) ? checkVal.length > 0 : checkVal._id && !!checkVal._id;
            }

            //** over-rides other checks; typically looks for valid email
            if (typeof checkValid === "boolean") {
                test = checkValid;
                isOptional = false;
            }

            return tot + (!isOptional && !test ? 1 : 0);
        }, 0);

        //** display error message or submit document
        if (valid > 0) {
            submit.btnInvalid = true;
            submit.btnCount = valid;
        } else {
            if (this.config.preSubmit) {
                newValues = await config.preSubmit(newValues);
            }

            //** reset schema to default state
            fieldValues = {};
            showClone = false;
            submit.btnState = false;

            submit.btnInvalid = false;
            submit.btnCount = 0;

            //** Note that Vue reactivity tries to be efficient with variable updates.
            //** This causes a problem when doing a new doc creation and so we need to
            //** "encourage" Vue to update in this case.
            mainFields.fields = this.adjFields;

            Meteor.setTimeout(function () {
                //** send completed doc to server insert / update methods
                submitForm(newValues, self.coll, false, false, self);
                mainFields.fields = mainFields.defaults;

                dispatch("current-editted-doc", newValues);
            }, 50);
        }
    }




    function backToCaller(msg) {
        dispatch("back-to-list", msg);
    }

    function showPreview() {
        let newValues = Object.assign(currDoc, fieldValues);
        dispatch("show-schema-preview", newValues);
    }

    function newValue(msg) {
        fieldValues[msg.field] = msg.detail.value;
        fieldValid[msg.field] = msg.detail.valid;
    }



    function cloneItem(){
        const self = this;
        let newValues = Object.assign({}, currDoc, fieldValues);
        delete newValues._id;


        Meteor.setTimeout(function () {
            //** send completed doc to server insert / update methods
            submitForm(newValues, coll, true, false, self);
            mainFields.fields = mainFields.defaults;

            dispatch("current-editted-doc", newValues);
        }, 50);
    }


    async function loadEditdoc(editdoc) {
        const self = this;

        currDoc = {};
        fieldValues = {};
        showClone = false;
        submit.btnBackShow = false;

        switch (true) {
            case coll && coll === "myProfile":
                currDoc = editdoc.data;
                mainFields.fields = orgFields(organize, schema, currDoc, role);
                break;

            case editdoc.type && editdoc.type === "edit":
                currDoc = await getDocs(coll, "oneAllFields", {_id: editdoc.id}, {}, null);
                showClone = config.clone;
                submit.btnBackShow = !!config.hasOverlay;
                break;

            case editdoc.type && editdoc.type === "create":
                currDoc = Object.assign({}, editdoc.data ? editdoc.data : {});
                showClone = false;
                submit.btnBackShow = !!config.hasOverlay;
                break;

            default:
                currDoc = {};
        }

        let isEmpty = !currDoc || Object.keys(currDoc).length === 0;
        if (isEmpty) {
            //*** reset schema to default state
            submit.btnState = false;

            showClone = false;
            mainFields.fields = orgFields(organize, schema, initFields, role);
        } else {
            showClone = config.clone;
            submit.btnState = true;
            mainFields.fields = orgFields(organize, schema, currDoc, role);
        }
    }

</script>



<div class=" card">

    {#if config.showHdr}
        <div class="card-header {config.bgTitle}">
            <div class="card-header-title" style="color: inherit; font-size: inherit; font-weight: inherit;">
                {formText.labels.hdr}
            </div>

            {#if showClone}
                <a class="button is-pulled-right mx-2 my-2 {bgClone}"
                   on:click="{cloneItem}">
                    {config.cloneBtn}
                </a>
            {/if}
        </div>
    {/if}

    <div class="card-content">
        <div id="tabbed-inputs">
            <Form_Tabs
                    {... mainFields}
                    on:trigger-from-tab-field="{ () => dispatch('trigger-from-form-holder', event.detail)}"
                    on:tabfc="{newValue}"
            />

            <div class="buffer-y-large mt-4">
                <div class="level">

                    <div class="level-left">
                        <Form_Submit {...submit} on:submit-btn="{submitDoc}" on:back-btn="{backToCaller}" />
                    </div>

                    <div class="level-right">
                        {#if config.hasPreview && submit.btnState}
                            <button class="button is-info" on:click="{showPreview}">
                                {formText.labels.previewBtn}
                            </button>
                        {/if}
                    </div>

                </div>
            </div>

        </div>
    </div>

</div>
