<template>

    <div class="vue-form-tabs">

        <div v-if="hasStepper">
            <ul class="steps is-horizontal has-content-centered mb-5">
                <li class="steps-segment"
                    v-for="(item, idt) in tabLabels"
                    v-bind:class="{'is-active': idt === currTabStep, 'is-completed': idt < currTabStep}">

                    <span class="steps-marker add-cursor" v-on:click="changeStepTab(idt + 1)">{{idt + 1}}</span>

                    <div class="steps-content">
                        <p class="step-title has-text-weight-bold is-hidden-mobile">{{item}}</p>
                    </div>
                </li>
            </ul>
        </div>


        <div v-if="hasTabs && !hasStepper" class="tabs is-boxed is-centered">
            <ul>
                <template v-for="item in tabLabels">
                    <li v-bind:aria-label="item"
                        v-bind:class="{'is-active': item === currTab}"
                        v-on:click="changetab(item)">
                        <a>{{item}}</a>
                    </li>
                </template>
            </ul>
        </div>




        <div v-if="hasTabs && !hasGroups">
            <div v-for="(tab,index) in fields" v-bind:key="index">
                <div v-show="tabLabels[index] === currTab" v-for="field in tab">
                    <vue-form-fields
                            style="margin-top: 1rem;"
                            v-bind="fieldInfo(field)"
                            v-on:trigger-by-form-field="$emit('trigger-from-tab-field', $event)"
                            v-on:field-changed="tabfc">
                    </vue-form-fields>
                </div>
            </div>
        </div>




        <div v-else-if="!hasTabs && hasGroups">
            <div v-for="(groups, idg) in fields" v-bind:key="idg" class="columns">
                <div v-for="(field, idf) in groups" v-bind:key="idf" class="column"
                     v-bind:class="field.group && field.group.class ? field.group.class : '' ">
                    <vue-form-fields
                            v-bind="fieldInfo(field)"
                            v-on:trigger-by-form-field="$emit('trigger-from-tab-field', $event)"
                            v-on:field-changed="tabfc">
                    </vue-form-fields>
                </div>
            </div>
        </div>

        <div v-else-if="hasTabs && hasGroups">
            <div v-for="(tab,index) in fields" v-bind:key="index">
                <div v-show="tabLabels[index] === currTab" v-for="(groups, grp) in tab" v-bind:key="grp">
                    <div class="columns">
                        <div v-for="(group, idg) in groups" v-bind:key="idg" class="column"
                             v-bind:class="group.group && group.group.class ? group.group.class : '' ">
                            <vue-form-fields
                                    v-bind="fieldInfo(group)"
                                    v-on:trigger-by-form-field="$emit('trigger-from-tab-field', $event)"
                                    v-on:field-changed="tabfc"
                                    style="margin-top: 1rem;">
                            </vue-form-fields>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div v-else>
            <div v-for="(field, idf) in fields" v-bind:key="idf">
                <vue-form-fields
                        style="margin-top: 1rem;"
                        v-bind="fieldInfo(field)"
                        v-on:trigger-by-form-field="$emit('trigger-from-tab-field', $event)"
                        v-on:field-changed="tabfc">
                </vue-form-fields>
            </div>
        </div>

        <div v-if="hasStepper" class="d-flex mt-5" style="justify-content: flex-end;">
            <a v-if="currTabStep > 0" class="button is-light align-items-center mr-3" v-on:click="prev">
                <span class="text-1dot5rem" style="margin-top: -0.25rem;">«</span>{{currTabStep}}
            </a>

            <a v-if="currTabStep < steps - 1" class="button is-light align-items-center" v-on:click="next">
                <span class="text-1dot5rem" style="margin-top: -0.25rem;">»</span> {{currTabStep + 2}}
            </a>

            <a v-if="currTabStep > steps - 1" class="button is-light" v-on:click="finished">{{finishBtn}}</a>
        </div>

    </div>

</template>


<script>
    /**
     * @summary Vue based form wrapper for tabbing fields.
     *
     * @memberof Components_Form
     * @function vue-formTabFields
     * @augments vue-formHolder
     * @locus Client
     * @isTemplate true
     *
     * @param {Array}   tabLabels - optional array of tab labels
     * @param {Array}   fields - re-configured array (of arrays) of field information
     * @param {Boolean} hasTabs - signals the need to construct a tab header
     * @param {Boolean} hasGroups - signals the need to construct grouped fields
     *
     * @return nothing - emits: tabfc
     */

    import VueFormFields from './vue-formFields.vue'

    export default {

        props: {
            tabLabels: Array,
            fields: Array,
            defaults: Array,

            hasTabs: Boolean,
            hasGroups: Boolean,
            hasStepper: Boolean
        },

        components: {VueFormFields},

        data: function () {

            return {
                currTab: this.tabLabels.length > 0 ? this.tabLabels[0] : "",

                currTabStep: 0,
                steps: this.tabLabels && this.tabLabels.length > 0 ? this.tabLabels.length : 1,

                watchFields: {},
                rawFields: this.flatten(this.defaults),
            }
        },

        methods: {
            fieldInfo(field) {
                return Object.assign(field, {watchFields: this.watchFields, rawFields: this.rawFields});
            },

            changetab(tab) {
                this.currTab = tab;
            },

            prev() {
                let current = this.currTabStep - 1;
                this.currTabStep = current >= 0 ? current : 0;
                this.currTab = this.tabLabels[current];
            },

            next() {
                let current = this.currTabStep + 1;
                this.currTabStep = current > this.steps ? this.steps : current;
                this.currTab = this.tabLabels[current];
            },

            changeStepTab(step){
                this.currTabStep = step - 1;
                this.currTab = this.tabLabels[step - 1];
            },

            finished() {
                this.currTabStep = this.steps;
            },

            tabfc(msg) {
                this.$emit('tabfc', msg);
                this.watchFields = msg;
            },

            flatten(arr) {
                let flat1 = [].concat.apply([], arr);
                let flat2 = [].concat.apply([], flat1);

                return flat2;
            }
        }
    }

</script>
