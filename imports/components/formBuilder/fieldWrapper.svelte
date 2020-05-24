<script>
    /**
     * Form wrapper around individual input fields.
     *
     * @memberof Components:Form
     * @function fieldWrapper
     * @locus Client
     * @augments formTabFields
     *
     * @param {String}  field - unique field name identifier
     * @param {String}  fieldType - type of input field
     * @param {Number}  tab - if tabbed fields are set, defines which tab to show this field
     *
     * @param {Object}  attributes - optional additional html attribute settings for field type
     * @param {Object}  params - optional additional configuration information for field type
     * @param {Boolean} optional - flags a field that must have user input to be valid
     * @param {String}  defaultValue - initial input value
     *
     * @param {String}  helpText - optional help text to explain the input field meaning; ditto
     * @param {String}  fieldText - optional field text label (ie apiKey); ditto
     * @param {String}  selectsText - optional selects array for 'select', 'checkbox' and 'radio'; ditto
     *
     * @emits field-changed
     *
     * @notes
     * 1. Supports common inputs 'text', 'number', 'email', 'password', 'tel'
     * 2. Supports more complex 'textarea', 'select', 'checkbox', 'radio', 'switch', 'date', 'upload'
     * 3. Supports custom 'apiKey', 'editor'
     *
     */

    //* props
    export let field = {};

    //* support functions
    import Icon from '/imports/components/elements/icon.svelte'
    import {onMount, getContext} from 'svelte'
    import {createEventDispatcher} from 'svelte';
    const dispatch = createEventDispatcher();

    //* load component fields
    import Inputs from './fields/inputs.svelte'

    let components = {
        input: Inputs
    }


    //* local reactive variables
    let fieldOpt = field.optional ? "" : "field-error";
    let fieldValue = field.defaultValue;
    let fieldHelpShow = false;
    let fieldHide = false;
    let formText = getContext("formText");


    onMount(() => {
        let checkVal = typeof field.value !== "undefined" ? field.value : field.defaultValue;
        fieldOpt = testValid(checkVal, field.optional);
        fieldValue = checkVal;

        //* for initial state, check for watched default
        if (field.listen && field.listen.src) {
            fieldHide = checkDefault(field.rawFields, field.listen);
        }

        //* check to make sure that we should watch another field and hide if default value
        if (field.watchFields && field.listen && field.listen.src && (field.listen.src === field.watchFields.field)) {
            fieldHide = checkWatched(field.watchFields, field.listen);
        }
    } );


    //* functions that mutate local variables
    function toggleHelp() {
        fieldHelpShow = !fieldHelpShow;
    }

    function fieldInfo(field) {
        return Object.assign(field, {watchFields: this.watchFields, rawFields: this.rawFields});
    }

    const fieldUpdate = (inMsg) => {
        fieldOpt = testValid(inMsg.detail.value, field.optional);

        //*** flow input fields changes up to holder
        dispatch('field-changed', {
            field: field.field,
            fieldType: field.fieldType,
            value: inMsg.detail.value,
            defaultValue: field.defaultValue,
            valid: !fieldOpt,
        });
    }



    //* pure functions
    const testValid = (val, optional) => {
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

    const checkWatched = (watched, listen) => {
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

    const checkDefault = (arr, listen) => {
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

</script>



{#if !fieldHide}
    <div class="field" style="position: relative;">
        <div class="control {fieldOpt}">
            <label class="has-float-label">{formText[field.field].label}</label>

            <svelte:component
                    this="{components[field.fieldType]}"
                    {field}
                    bind:value="{field.fieldValue}"
                    on:on-inputentry="{fieldUpdate}"
            />

        </div>

        {#if formText[field.field].helpText}
            <span class="field-info has-text-primary add-cursor" on:click|stopPropagation="{toggleHelp}">
                <Icon icon={getContext("iconHelp")} class="has-text-info"/>
            </span>

            <div class="{fieldHelpShow ? 'open-body': 'close-body'}">
                <p class="mt-2 mb-3 is-family-secondary">{@html formText[field.field].helpText}</p>
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
