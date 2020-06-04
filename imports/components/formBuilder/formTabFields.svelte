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
    export let tabLabels = [];
    export let fields = [];
    export let defaults = [];

    //* support functions
    import {createEventDispatcher, getContext} from 'svelte';
    const dispatch = createEventDispatcher();

    //* children components
    import Field_Wrapper from './fieldWrapper.svelte'


    //* local reactive variables
    let config = getContext("formConfig");
    let currTab = tabLabels.length > 0 ? tabLabels[0] : "";
    let currTabStep = 0;
    let steps = tabLabels && tabLabels.length > 0 ? tabLabels.length : 1;
    let watchFields = {}
    let rawFields = flatten(defaults);
    let finishBtn = "fin";


    //* event handlers
    function fieldChanged(msg){
        dispatch('field-changed', msg.detail);
        watchFields = msg.detail;
    }


    //* functions that mutate local variables
    function fieldInfo(field){
        return Object.assign(field, {watchFields: watchFields, rawFields: rawFields});
    }

    function changetab(tab){ currTab = tab; }

    function finished(){ currTabStep = steps; }

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

    function changeStepTab(step) {
        currTabStep = step - 1;
        currTab = tabLabels[step - 1];
    }


    //* pure functions
    function flatten(arr) {
        let flat1 = [].concat.apply([], arr);
        return [].concat.apply([], flat1);
    }

</script>




<div class="form-tabs">

    {#if config.hasStepper}
        <ul class="steps is-horizontal has-content-centered mb-5">
            {#each tabLabels as item, idt}
                <li class="steps-segment {idt === currTabStep ? 'is-active' : ''} {idt < currTabStep ? 'is-completed' : ''}">
                    <span class="steps-marker add-cursor" on:click="{ () => changeStepTab(idt + 1) }">{idt + 1}</span>

                    <div class="steps-content">
                        <p class="step-title has-text-weight-bold is-hidden-mobile">{item}</p>
                    </div>
                </li>
            {/each}
        </ul>
    {/if}

    {#if config.hasTabs && !config.hasStepper}
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




    {#if config.hasTabs && !config.hasGroups}
        {#each fields as tab, index}
            <div class:is-hidden={!(tabLabels[index] === currTab)} style="margin-top: 1rem;">
                {#each tab as field}
                    <Field_Wrapper field="{fieldInfo(field)}"  on:field-changed="{fieldChanged}"/>
                {/each}
            </div>
        {/each}
    {/if}

    {#if !config.hasTabs && config.hasGroups}
        {#each fields as groups, idg}
            <div class="columns">
                {#each groups as field, idf}
                    <div class="column {field.group && field.group.class ? field.group.class : '' }">
                        <Field_Wrapper field="{fieldInfo(field)}"  on:field-changed="{fieldChanged}"/>
                    </div>
                {/each}
            </div>
        {/each}
    {/if}

    {#if config.hasTabs && config.hasGroups}
        {#each fields as tab, index}
            {#each tab as groups, grp}
                <div class="columns" class:is-hidden={!(tabLabels[index] === currTab)}>
                    {#each groups as group, idg}
                        <div class="column {group.group && group.group.class ? group.group.class : '' }" style="margin-top: 1rem;">
                            <Field_Wrapper field="{fieldInfo(group)}" on:field-changed="{fieldChanged}"/>
                        </div>
                    {/each}
                </div>
            {/each}
        {/each}
    {/if}

    {#if !config.hasTabs && !config.hasGroups}
        {#each fields as field, idf}
            <div class="mb-3">
                <Field_Wrapper field="{fieldInfo(field)}" on:field-changed="{fieldChanged}"/>
            </div>
        {/each}
    {/if}

    {#if config.hasStepper}
        <div class="d-flex mt-5" style="justify-content: flex-end;">
            {#if currTabStep > 0}
                <a class="button is-light align-items-center mr-3" on:click="{prev}">
                    <span class="text-1dot5rem" style="margin-top: -0.25rem;">«</span>{currTabStep}
                </a>
            {/if}

            {#if currTabStep < steps - 1}
                <a class="button is-light align-items-center" on:click="{next}">
                    <span class="text-1dot5rem" style="margin-top: -0.25rem;">»</span> {currTabStep + 2}
                </a>
            {/if}

            {#if currTabStep > steps - 1}
                <a class="button is-light" on:click="{finished}">{finishBtn}</a>
            {/if}
        </div>
    {/if}

</div>
