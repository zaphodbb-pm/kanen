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
     * @emits  back-to-list - {Boolean} for overlayed list / form pairs
     * @emits  show-form-preview - {Object}} current document object with newly entered values
     * @emits  doc-submitted - {Boolean} end of submit cycle; sent by function "submitForm"
     * @emits  current-editted-doc - {Object} after submit; current document object with newly entered values
     *
     * @example
     *      configuration object to set up form:
     *          coll: "starter"                     // collection to submit field values to
     *          showHdr: false,                     // show card header and title if true
     *          bgTitle: elements.BG_CARD,          // background colour for header
     *
     *          hasGroups: false,                   // allows fields to be grouped onto the same row
     *          hasTabs:    false,                  // has tabbed fields in form
     *          hasStepper: false,                  // use stepper layout for tab fields (usually hasTabs is set to true)
     *          hasPreview: true,                   // form can show a preview of select data fields
     *          hasOverlay: false,                  // support for form overlaying the list during edit operation
     *          clone: true,                        // show clone button on form
     *
     *      schema object per field item:
     *          field: "startDynamicSelect",        String: (required) field name in database
     *          fieldType: "select",                String: (required) see fieldWrapper notes
     *          optional: true,                     Boolean: (required) if false, forces user entry to present in order to submit form
     *
     *          css: "is-fullwidth",                String: (optional for fieldWrapper) adds css to fieldWrapper
     *          adjustLabel: true,                  Boolean: (optional for fieldWrapper) shifts label right to accommodate button add-on
     *          group: {                            Object: (optional for formTabFields) allows formTabFields to create horizontal group of fields
     *              section: 0,                                     (required) unique index number per group of fields
     *              class: "is-two-thirds"                          (optional) column width control; else equal widths
     *          },
     *          tab: 1,                             Number: (optional for formTabFields) displays field in selected form tab set by formTabFields
     *          attributes: {},                     Object: (optional per field) adds attributes to html tags such as 'input'
     *          params: {                           Object: (optional for field) extra config for complex components
     *              type: "dynamicSelect",
     *              coll: "starter",
     *              filter: {fields: {name: 1}},
     *              options: {sort: {name: 1}}
     *          },
     *          defaultValue: {_id: "", name: ""},  Object|String|Number: (required) submit adds values if no user entry
     */

    //* incoming props from page
    export let config;
    export let formText;
    export let schema;
    export let role;
    export let editdoc;
    export let directdoc;

    //** svelte handlers
    import {userExtras} from '/imports/client/systemStores'
    import {onMount, setContext} from 'svelte';
    import {createEventDispatcher} from 'svelte';
    const dispatch = createEventDispatcher();

    //* make form text available to all children components
    setContext("formText", formText);
    setContext("formConfig", config);

    //* get application specific support libraries
    import {elements} from '/imports/client/setup/systemGlobals'
    import {getDocs} from '/imports/functions/getDocs'
    import {submitForm} from './func-submitForm'
    import {orgFields} from "./func-orgFields";

    //* get children components
    import Form_Submit from './formSubmit.svelte'
    import Form_Tabs from './formTabFields.svelte'


    //* local reactive variables
    let coll = config.coll;

    let submit = {
        btnEdit: formText.labels.editBtn,
        btnCreate: formText.labels.createBtn,
        btnBack: formText.labels.backBtn,
        btnInvText: formText.labels.invalidInput,

        btnBackShow: false,
        btnState: false,
        btnInvalid: false,
        btnCount: 0
    };

    //** this component's working variables
    let fields = [];
    let fieldValues = {};
    let fieldValid = {};
    let defaults = {};
    let adjFields = [];
    let initFields = [];

    let created = false;
    let currDoc = {};
    let bgClone = elements.BG_BUTTON_CLONE;
    let showClone = false;

    //* fields prepared for form display
    let tabFields = {
        fields: [],
        defaults: [],
    };

    //** determine what layout switches are active
    let tabLen = formText.formTabs && Array.isArray(formText.formTabs) ? formText.formTabs.length : 0;
    let hasTabs = tabLen > 0 && (!!config.hasTabs || !!config.hasStepper);

    let organize = {
        hasTabs: hasTabs,
        tabLen: tabLen,
        hasGroups: config.hasGroups,
    }

    $: loadEditdoc(editdoc);


    onMount( () => {
        schema.forEach(function (f) {
            defaults[f.field] = f.defaultValue;
        });

        //** note that there is a lot of "reactivity entanglement" to manage
        adjFields = orgFields(organize, schema, defaults, role);
        initFields = Object.assign({}, adjFields);
        tabFields.fields = adjFields;
        tabFields.defaults = adjFields;
    });


    //* event handlers
    function backToCaller(msg) {
        dispatch("back-to-list", msg);
    }

    function showPreview() {
        let newValues = Object.assign(currDoc, fieldValues);
        dispatch("show-schema-preview", newValues);
    }

    function fieldChanged(inMsg) {
        let msg = inMsg.detail;

        fieldValues[msg.field] = msg.value;
        fieldValid[msg.field] = msg.valid;
    }

    function cloneItem(){
        let newValues = Object.assign({}, currDoc, fieldValues);
        delete newValues._id;

        //** send completed doc to server insert / update methods
        submitForm(newValues, coll, true, false, dispatch);
        tabFields.fields = tabFields.defaults;
        dispatch("current-editted-doc", newValues);
    }


    //* functions that mutate local variables
    async function loadEditdoc(editdoc) {
        currDoc = {};
        fieldValues = {};
        showClone = false;
        submit.btnBackShow = false;

        switch (true) {
            case coll && coll === "myProfile":
                currDoc = editdoc.data;
                tabFields.fields = orgFields(organize, schema, currDoc, role);
                break;

            case editdoc.type && editdoc.type === "edit":
                currDoc = await getDocs(coll, "schemaForm", {_id: editdoc.id}, {}, null);
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
            tabFields.fields = orgFields(organize, schema, initFields, role);
        } else {
            showClone = config.clone;
            submit.btnState = true;
            tabFields.fields = orgFields(organize, schema, currDoc, role);
        }
    }

    async function submitDoc() {
        let newValues = {};

        //** flag as a newly created doc
        if (!submit.btnState) {
            let defFields = Object.assign({}, defaults);
            newValues = Object.assign(defFields, fieldValues);
            delete newValues._id;
            created = true;
        } else {
            newValues = Object.assign(currDoc, fieldValues);
            created = false;
        }

        //** check for invalid / data not entered fields; create an independent object first
        let invalids = schema.map((fld) => fld);

        let valid = invalids.reduce(function (tot, check) {
            const checkVal = newValues[check.field];
            const checkValid = fieldValid[check.field];
            let isOptional = check.optional;
            let test = !!checkVal;

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
            if (config.preSubmit) {
                newValues = await config.preSubmit(newValues);
            }

            //** reset schema to default state
            fieldValues = {};
            showClone = false;
            submit.btnState = false;
            submit.btnInvalid = false;
            submit.btnCount = 0;

            //** send completed doc to server insert / update methods
            tabFields.fields = adjFields;

            submitForm(newValues, coll, false, false, dispatch, $userExtras);

            tabFields.fields = tabFields.defaults;
            dispatch("current-editted-doc", newValues);
        }
    }

</script>



<div class=" card">

    {#if config.showHdr}
        <div class="card-header level {config.bgTitle}">
            <div class="card-header-title " style="color: inherit; font-size: inherit; font-weight: inherit;">
                {formText.labels.hdr}
            </div>

            {#if showClone}
                <a class="button mr-2 {bgClone}"
                   on:click="{cloneItem}">
                    {formText.labels.cloneBtn}
                </a>
            {/if}
        </div>
    {/if}


    <div class="card-content">
        <div id="tabbed-inputs">

            <Form_Tabs fields="{tabFields.fields}" on:field-changed="{fieldChanged}" />

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
