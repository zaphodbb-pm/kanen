<script>
    /**
     * Form wrapper around individual input fields.
     *
     * @memberof Components:Form
     * @function fieldWrapper
     * @locus Client
     * @augments formTabFields
     *
     * @param {Object}  field - unique field name identifier
     * @param {String}  field.field - unique field name identifier
     * @param {String}  field.fieldType - type of input field
     * @param {String}  field.adjustLabel - shifts label right to accommodate button add-on
     * @param {Object}  field.attributes - optional additional html attribute settings for field type
     * @param {Object}  field.params - optional additional configuration information for field type
     * @param {Boolean} field.optional - flags a field that must have user input to be valid
     * @param {String}  field.defaultValue - initial input value
     *
     * @param {Object}  field.listen - {src: <fieldName>, key: watching object -> <keyName>, value: <trigger value>}
     * @param {Array}   field.role - list of user role strings that can see this field
     * @param {String}  field.css - certain field inserts can be further modified with css
     *
     * @notes
     *  Support text is set by 'formHolder' into context 'formText':
     *      label - field label
     *      helpText - (optional) help text to explain the input field meaning; ditto
     *      tag - (optional) extra text for some components such as 'switch'
     *      selects - (optional) array of {_id, name} objects for 'select' component
     *
     * @emits field-changed - {Object}
     *
     */

    //* props
    export let field = {};
    export let watchFields = {};

    let className;
    export { className as class };

    //* support functions
    import {getContext} from 'svelte'
    import {components} from './fields/func-registerField'
    import {slide} from 'svelte/transition';
    import {quintOut} from 'svelte/easing';
    import Icon from '/imports/components/elements/icon.svelte'
    import {createEventDispatcher} from 'svelte';
    const dispatch = createEventDispatcher();


    //* local reactive variables
    let fieldOpt = field.optional ? "" : "field-error";
    let fieldHelpShow = false;
    let fieldHide = false;
    let formText = getContext("formText");
    let label = formText && formText[field.field] && formText[field.field].label ? formText[field.field].label : "";
    let helpText = formText && formText[field.field] && formText[field.field].helpText ? formText[field.field].helpText : "";
    let adjustLabel = field.adjustLabel ? "adjust-label" : "";

    field.tag = formText && formText[field.field] && formText[field.field].tag ? formText[field.field].tag : null;

    $: {
        field = prepareField(field);
        fieldHide = !!( (field.listen && field.listen.src) && (field.defaultValue === field.value ) );
    }

    $: {
        if( (field.listen && field.listen.src) && watchFields.field){
            fieldHide = checkWatched(watchFields, field.listen);
        }
    }

    //* functions that mutate local variables
    function prepareField(fieldIn){
        let field = fieldIn;
        let checkVal = typeof field.value !== "undefined" ? field.value : field.defaultValue;
        fieldOpt = testValid(checkVal, field.optional);
        field.fieldValue = checkVal;
        field.value = checkVal;

        return field
    }


    function toggleHelp() {
        fieldHelpShow = !fieldHelpShow;
    }

    function fieldInfo(field) {
        return Object.assign(field, {watchFields: field.watchFields, rawFields: field.rawFields});
    }

    function fieldUpdate(inMsg){
        fieldOpt = testValid(inMsg.detail.value, field.optional);

        //*** flow input field changes up to formholder
        dispatch('field-changed', {
            field: field.field,
            fieldType: field.fieldType,
            value: inMsg.detail.value,
            defaultValue: field.defaultValue,
            valid: !fieldOpt,
        });
    }



    //* pure functions
    function testValid(val, optional){
        //** test for valid values in field
        let test;

        if (typeof val === "object" && val !== null) {
            test = Array.isArray(val) ? (val.length > 0) : (val._id && !!val._id);
        } else {
            test = !!val;
        }

        return optional || test ? "" : "field-error";
    }

    function checkWatched(watched, listen){
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

    function checkDefault(arr, listen){
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
    <div class="{className}">
        <div class="field" style="position: relative;">
            <div class="control {fieldOpt}">
                {#if label}
                    <label class="has-float-label {adjustLabel}">{label}</label>
                {/if}

                <svelte:component
                        this="{components[field.fieldType]}"
                        {field}
                        on:on-inputentry="{fieldUpdate}"/>

            </div>

            {#if helpText}
                <span class="field-info has-text-primary add-cursor" on:click|stopPropagation="{toggleHelp}">
                <Icon icon={getContext("iconHelp")} class="has-text-info"/>
            </span>

                {#if fieldHelpShow}
                    <div class= "mt-2 mb-4" transition:slide="{{delay: 100, duration: 300, easing: quintOut }}">
                        <p class="is-family-secondary">{@html helpText}</p>
                    </div>
                {/if}
            {/if}
        </div>
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

    .has-float-label {
        position: absolute;
        left: 1rem;
        top: -0.5rem;
        background-color: #FFF;
        padding: 0 0.25rem;
        font-weight: 500;
        font-size: 0.75rem;
        z-index: 10;
    }

    .adjust-label {
        left: 4rem;
    }

</style>
