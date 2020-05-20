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
     * @return nothing - emits: tabfc
     */

    //* props from Form Holder
    export let tabLabels;
    export let fields;
    export let defaults;

    export let hasTabs;
    export let hasGroups;
    export let hasStepper;

    //* support functions
    import {onMount, onDestroy, setContext, getContext} from 'svelte'
    import {createEventDispatcher} from 'svelte';
    const dispatch = createEventDispatcher();


    //* children components

    import Form_Fields from './formFields.svelte'


    //import VueFormFields from './vue-formFields.vue'




    //* local reactive variables
    let currTab = tabLabels.length > 0 ? tabLabels[0] : "";
    let currTabStep = 0;
    let steps = tabLabels && tabLabels.length > 0 ? tabLabels.length : 1;
    let watchFields = {}
    let rawFields = flatten(defaults);

    let finishBtn = "fin";



    function fieldInfo(field) {
        return Object.assign(field, {watchFields: watchFields, rawFields: rawFields});
    }

    function changetab(tab) {
        currTab = tab;
    }

    function prev() {
        let current = currTabStep - 1;
        currTabStep = current >= 0 ? current : 0;
        currTab = tabLabels[current];
    }

    function next() {
        let current = currTabStep + 1;
        currTabStep = current > steps ? steps : current;
        currTab = tabLabels[current];
    }

    function changeStepTab(step){
        currTabStep = step - 1;
        currTab = tabLabels[step - 1];
    }

    function finished() {
        currTabStep = steps;
    }

    function tabfc(msg) {
        dispatch('tabfc', msg);
        this.watchFields = msg;
    }

    function flatten(arr) {
        let flat1 = [].concat.apply([], arr);
        let flat2 = [].concat.apply([], flat1);

        return flat2;
    }

</script>




<div class="form-tabs">

    {#if hasStepper}
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

    {#if hasTabs && !hasStepper}
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




    {#if hasTabs && !hasGroups}
        {#each fields as tab, index}

            start of hasTabs && !hasGroups: {JSON.stringify(tab)}
            <div>
                {#if tabLabels[index] === currTab}
                    {#each tab as field}
                        hasTabs && !hasGroups: {JSON.stringify(field)}

                        <!--
                        <vue-form-fields
                                style="margin-top: 1rem;"
                                v-bind="fieldInfo(field)"
                                v-on:trigger-by-form-field="$emit('trigger-from-tab-field', $event)"
                                v-on:field-changed="tabfc">
                        </vue-form-fields>
                        -->
                    {/each}}
                {/if}
            </div>
        {/each}
    {/if}

    {#if !hasTabs && hasGroups}
        {#each fields as groups, idg}
            <div class="columns">
                {#each groups as field, idf}
                    <div class="column {field.group && field.group.class ? field.group.class : '' }">
                        !hasTabs && hasGroups: {JSON.stringify(field)}
                    <!--
                    <vue-form-fields
                            v-bind="fieldInfo(field)"
                            v-on:trigger-by-form-field="$emit('trigger-from-tab-field', $event)"
                            v-on:field-changed="tabfc">
                    </vue-form-fields>
                    -->
                    </div>
                {/each}
            </div>
        {/each}
    {/if}

    {#if hasTabs && hasGroups}
        {#each fields as tab, index}
            hasTabs && hasGroups: {JSON.stringify(tab)}

            {#if tabLabels[index] === currTab}
                {#each tab as groups, grp}
                    <div class="columns">
                        {#each groups as group, idg}
                            <div class="column {group.group && group.group.class ? group.group.class : '' }">
                                hasTabs && hasGroups: {JSON.stringify(group)}
                                <!--
                                <vue-form-fields
                                        v-bind="fieldInfo(group)"
                                        v-on:trigger-by-form-field="$emit('trigger-from-tab-field', $event)"
                                        v-on:field-changed="tabfc"
                                        style="margin-top: 1rem;">
                                </vue-form-fields>
                                -->
                            </div>
                        {/each}
                    </div>
                {/each}
            {/if}
        {/each}
    {/if}

    {#if !hasTabs && !hasGroups}
        {#each fields as field, idf}
            <div class="mb-3">
                <Form_Fields
                        {...field}
                        on:trigger-by-form-field="{ () => dispatch('trigger-from-tab-field', event.detail)}"
                        on:field-changed="{tabfc}"/>
            </div>
        {/each}
    {/if}

    {#if hasStepper}
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
