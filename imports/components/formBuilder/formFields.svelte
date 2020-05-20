<script>
    /**
     * Form wrapper around individual input fields.
     *
     * @memberof Components:Form
     * @function formFields
     * @locus Client
     * @augments formTabFields
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

    //* props
    export let field;
    export let fieldType;
    export let tab;
    export let listen;
    export let watchFields;
    export let rawFields;

    export let attributes;
    export let params;
    export let optional;
    export let defaultValue;

    export let label;
    export let helpText;
    export let fieldText;

    export let selects;
    export let value;

    //* support functions
    import {onMount, onDestroy, setContext, getContext} from 'svelte'
    import {createEventDispatcher} from 'svelte';
    import Icon from '/imports/components/elements/icon.svelte'
    import {validateEmail} from '/imports/functions/validateEmail'

    const dispatch = createEventDispatcher();


    //* load input fields
    import Inputs from './fields/inputs.svelte'

    let components = {
        input: Inputs
    }



    //* local reactive variables
    let config = {};
    let helpIcon = ""; //kanen.icons.HELP;
    let formTab = tab;

    let fieldOpt = optional ? "" : "field-error";
    let fieldValue = defaultValue;
    let fieldParms = params;
    let fieldSelects = selects;
    let fieldDebounce = defaultValue;
    let fieldHelpShow = false;
    let fieldHide = false;

    let formText = getContext("formText");

    onMount(() => {

        let testVal = defaultValue.newVal !== "true" ? defaultValue.newVal : true;
        testVal = defaultValue.newVal !== "false" ? defaultValue.newVal : false;
        this.fieldValue = testVal;
        this.fieldOpt = testValid(this.fieldValue);

        console.log("defaultValue", field, defaultValue.newVal)


        let checkVal = typeof value.val !== "undefined" ? value.val : defaultValue;
        fieldOpt = testValid(checkVal);
        fieldValue = checkVal;

        //* for initial state, check for watched default
        if (listen && listen.src) {
            let raw = rawFields;
            fieldHide = checkDefault(raw, listen);
        }



        //* check to make sure that we should watch another field and hide if default value
        if (watchFields && listen && listen.src && (listen.src === watchFields.field)) {
            fieldHide = checkWatched(watchFields, listen);
        }

    } );



    function fieldUpdate(msg) {
        const self = this;
        let outValue = null;

        switch (true) {
            case (attributes && attributes.type === "email"):
                outValue = msg;
                fieldOpt = msg.length < 1 || validateEmail(msg) ? "" : "field-error";
                break;

            case fieldType === "editor":
                outValue = fieldValue;
                fieldOpt = testValid(outValue);
                break;

            case fieldType === "date":
                outValue = msg;
                if (Array.isArray(msg)) {
                    outValue = outValue[0];
                }

                if (outValue) {
                    let test = new Date(outValue);
                    outValue = test.toISOString();
                }

                fieldOpt = testValid(outValue);
                break;

            default:
                outValue = msg;
                fieldOpt = testValid(outValue);
        }

        //*** some inputs (ie. date) require time to update input element
        setTimeout(function () {

            dispatch('field-changed', {
                field: self.field,
                fieldType: self.fieldType,
                value: outValue,
                defaultValue: self.defaultValue,
                valid: self.fieldOpt !== "field-error",
            });

        }, 10);
    }

    function toggleHelp() {
        fieldHelpShow = !fieldHelpShow;
    }

    function testValid(val) {
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

        return optional || test ? "" : "field-error";
    }

    function checkWatched(watched, listen) {
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
    }

    function checkDefault(arr, listen) {
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
    }

    function triggerByField(info){
        dispatch("trigger-by-form-field", info);
    }

</script>



{#if !fieldHide}
    <div class="field {fieldOpt}" style="position: relative;">
        <div class="control">
            <svelte:component
                    this="{components[fieldType]}"
                    id="{field}"
                    {attributes}
                    cmpLabel="{formText[field].label}"
                    bind:value="{fieldValue}"
                    on:on-inputentry="{fieldUpdate}"
            />
        </div>

        {#if formText[field].helpText}
            <span class="field-info has-text-primary add-cursor" on:click|stopPropagation="{toggleHelp}">
                <Icon icon={getContext("iconHelp")} class="icon has-text-info"/>
            </span>

            <div class="{fieldHelpShow ? 'open-body': 'close-body'}">
                <p class="mt-2 is-family-secondary">{@html formText[field].helpText}</p>
            </div>
        {/if}
    </div>
{/if}

<style>

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
