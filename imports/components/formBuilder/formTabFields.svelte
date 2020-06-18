<script>
    /**
     * Form wrapper for tabbing fields.
     *
     * @memberof Components:Form
     * @function formTabFields
     * @augments formHolder
     * @locus Client
     *
     * @param {Array}   tabLabels - optional array of tab labels
     * @param {Array}   fields - re-configured array (of arrays) of field information
     * @param {Boolean} hasTabs - signals the need to construct a tab header
     * @param {Boolean} hasGroups - signals the need to construct grouped fields
     *
     * @emits field-changed
     */

    //* props from Form Holder
    export let fields = [];

    //* support functions
    import {createEventDispatcher, getContext} from 'svelte';
    const dispatch = createEventDispatcher();

    //* children components
    import Field_Wrapper from './fieldWrapper.svelte'


    //* local reactive variables
    let config = getContext("formConfig");
    let tabLabels = getContext("formText").formTabs;

    let currTab = tabLabels.length > 0 ? tabLabels[0] : "";
    let currTabStep = 0;
    let steps = tabLabels && tabLabels.length > 0 ? tabLabels.length : 1;
    let watchFields = {};
    let finishBtn = "fin";

    //* event handlers
    function fieldChanged(msg){
        dispatch('field-changed', msg.detail);
        watchFields = msg.detail;
    }

    function changetab(tab){ currTab = tab; }

    function changeStepTab(step) {
        currTabStep = step - 1;
        currTab = tabLabels[step - 1];
    }

    function prev(){
        let current = currTabStep - 1;
        currTabStep = current >= 0 ? current : 0;
        currTab = tabLabels[current];
    }

    function next(){
        let current = currTabStep + 1;
        currTabStep = current > steps ? steps : current;
        currTab = tabLabels[current];
    }

    function finished(){ currTabStep = steps; }

</script>




<div class="form-tabs">

    <!-- header for tabs or stepper -->
    {#if config.hasTabs}
        {#if config.hasStepper}

            <ul class="steps is-horizontal has-content-centered mb-5">
                {#each tabLabels as item, idt}
                    <li class="steps-segment" class:is-active={idt === currTabStep} class:is-completed={idt < currTabStep}>
                        <span class="steps-marker add-cursor" on:click="{ () => changeStepTab(idt + 1) }">{idt + 1}</span>

                        <div class="steps-content">
                            <p class="step-title has-text-weight-bold is-hidden-mobile">{item}</p>
                        </div>
                    </li>
                {/each}
            </ul>

        {:else}

            <div class="tabs is-boxed is-centered">
                <ul>
                    {#each tabLabels as item}
                        <li class="{item === currTab ? 'is-active': ''}"
                            on:click="{ () => changetab(item) }">
                            <a>{item}</a>
                        </li>
                    {/each}
                </ul>
            </div>

        {/if}
    {/if}


    <!-- main body of input fields; organized around tabs and / or grouped fields   -->
    {#if config.hasTabs}

        {#each fields as tab, index}
            {#if config.hasGroups}
                {#each tab as groups, grp}
                    <div class="columns" class:is-hidden={!(tabLabels[index] === currTab)}>
                        {#each groups as field}
                            <div class="column {field.group && field.group.class ? field.group.class : '' }">
                                <Field_Wrapper class="" {field} {watchFields}  on:field-changed="{fieldChanged}"/>
                            </div>
                        {/each}
                    </div>
                {/each}
            {:else}
                <div class:is-hidden={!(tabLabels[index] === currTab)}>
                    {#each tab as field}
                        <Field_Wrapper class="" {field} {watchFields}  on:field-changed="{fieldChanged}"/>
                    {/each}
                </div>
            {/if}
        {/each}

    {:else}

        {#if config.hasGroups}
            {#each fields as groups, idg}
                <div class="columns">
                    {#each groups as field}
                        <div class="column {field.group && field.group.class ? field.group.class : '' }" style="padding-top: 1rem;">
                            <Field_Wrapper class="" {field} {watchFields}  on:field-changed="{fieldChanged}"/>
                        </div>
                    {/each}
                </div>
            {/each}
        {:else}
            {#each fields as field}
                <div class="mb-3" style="padding-top: 1rem;">
                    <Field_Wrapper class="" {field} {watchFields} on:field-changed="{fieldChanged}"/>
                </div>
            {/each}
        {/if}

    {/if}


    <!-- footer for stepper -->
    {#if config.hasStepper}
        <div class="d-flex mt-5" style="justify-content: flex-end;">
            <a class="button is-light align-items-center mr-3" class:is-hidden={currTabStep < 1}  on:click="{prev}">
                <span class="text-1dot5rem" style="margin-top: -0.25rem;">«</span>{currTabStep}
            </a>

            <a class="button is-light align-items-center" class:is-hidden={currTabStep > steps - 1} on:click="{next}">
                <span class="text-1dot5rem" style="margin-top: -0.25rem;">»</span> {currTabStep + 2}
            </a>

            <a class="button is-light" class:is-hidden={currTabStep < steps - 1}  on:click="{finished}">{finishBtn}</a>
        </div>
    {/if}

</div>
