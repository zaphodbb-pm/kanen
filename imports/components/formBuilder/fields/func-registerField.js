/**
 * Import and register form field components.
 *
 * @memberof Components:Form
 * @function registerForm
 * @locus Client
 * @augments formWrapper
 *
 * @param {Array} doc - document to submit [ {field: value} ]
 * @param {String} coll - name of mongoDB collection to store document
 * @param {Boolean} clone - flag to create a clone of the current document
 * @param {Boolean} test - for testing only; does not submit form but does all the checks
 * @param {Boolean} dispatch - parent's dispatch function object
 *
 * @returns {Object} - Svelte components
 *
 * @notes
 *  1. Supports common inputs 'text', 'number', 'email', 'password', 'tel'
 *  2. Supports more complex 'textarea', 'select', 'checkbox', 'radio', 'switch', 'date', 'upload'
 *  3. Supports custom 'apiKey', 'editor'
 *  4. Supports decorator components such as 'hr'
 *
 */


//* load component fields
import Inputs from './inputs.svelte'
import Switch from './switch.svelte'
import TextArea from './textarea.svelte'
import HR from './hr.svelte'
import CheckBoxes from './checkboxes.svelte'
import Radios from './radios.svelte'

import Selects from './selects.svelte'
import TypeAhead from './typeahead.svelte'
import TimePicker from './timePicker.svelte'
import DatePicker from './datePicker.svelte'

import ApiKey from './apikey.svelte'
import FileBrowse from './fileBrowse.svelte'
import Swatches from './colourPicker.svelte'

import Editor from './editor.svelte'
import ItemList from './itemList.svelte'




/*
    VueRows,
    VueFieldset,
    VueArrayList,
    VueDragColumns
*/





export const components = {
    input: Inputs,
    switch: Switch,
    textarea: TextArea,
    checkboxes: CheckBoxes,
    radios: Radios,
    colours: Swatches,
    hr: HR,
    select: Selects,
    typeahead: TypeAhead,
    apiKey: ApiKey,
    fileInput: FileBrowse,
    timePicker: TimePicker,
    datePicker: DatePicker,
    editor: Editor,
    itemList: ItemList,
}
