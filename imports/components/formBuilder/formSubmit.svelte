<script>
    /**
     * Submit button for form.
     *
     * @memberof Components:Form
     * @function formSubmit
     * @augments formHolder
     * @locus Client
     *
     * @param {String}   btnEdit
     * @param {String}   btnCreate
     * @param {Boolean}  btnState
     * @param {Boolean}  btnInvalid
     * @param {Object}   btnInvText
     * @param {Number}   btnCount
     *
     * @return nothing - emits: submit-btn
     *
     */

    //* svelte handlers
    import {createEventDispatcher} from 'svelte';
    const dispatch = createEventDispatcher();

    //* support files
    import {elements} from '/imports/client/setup/systemGlobals'

    //* props
    export let btnEdit;
    export let btnCreate;
    export let btnBack;
    export let btnBackShow;

    export let btnState;
    export let btnInvalid;
    export let btnInvText;
    export let btnCount;

    //* reactive variables
    let formBtn =  btnCreate;
    let formBtnColor =  elements.BG_BUTTON;
    let formBtnColorAlt =  elements.BG_BUTTON_ALT;
    let btnColor =  elements.BG_BUTTON;

    formBtn = btnState ? btnEdit : btnCreate;
    btnColor = btnState ? formBtnColorAlt : formBtnColor;


    function submit() {
        dispatch('submit-btn', true);
    }

    function backToCaller() {
        dispatch('back-btn', true);
    }

    function invalidMsg() {
        return btnCount === 1 ? btnInvText.suffix1 : btnInvText.suffixn;
    }

    /*
    function btnStateF() {
        formBtn = btnState ? btnEdit : btnCreate;
        btnColor = btnState ? formBtnColorAlt : formBtnColor;
    }
     */

</script>


<div class="submit-buttons">
    <div class="d-flex">
        <div class="button {btnColor}" on:click="{submit}">
            {formBtn}
        </div>

        {#if btnBackShow}
            <button class="button is-info ml-5" on:click="{backToCaller}">
                {btnBack}
            </button>
        {/if}
    </div>

    {#if btnInvalid}
        <p class="has-text-danger">{btnInvText.prefix} {btnCount} {invalidMsg() }</p>
    {/if}
</div>


