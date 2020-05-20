<template>

    <div class="field has-addons">
        <div class="control">
            <a class="button is-static">
                <i v-bind:class="iconRows"></i>
            </a>
        </div>

        <div class="control">
            <span class="select">

                <select v-model="initval"
                        v-on:change="changerow">

                    <option v-for="option in opts">{{option}}</option>
                </select>

            </span>
        </div>

    </div>

</template>


<script>
    /**
     * @summary Builds row selector and documents count.
     *
     * @memberof Components_List
     * @function vue-rowSize
     * @locus Client
     * @isTemplate true
     *
     * @param  {Object} config - decoration for row selector
     * @param  {String} label
     *
     * @returns {Object} - emits 'row-changed'
     *
     */

    export default {

        props: {
            config: Object,
        },

        data() {
            return {
                opts: [10, 15, 20, 30, 50, 100],      // sets the row length per page selection
                initval: 10,                             // set initial rows / page
                iconRows: kanen.icons.ROWS,               // icon value from global config
            }
        },

        methods: {
            changerow() {
                this.$emit('row-changed', {
                    row: this.initval
                });
            },
        }
    }
</script>