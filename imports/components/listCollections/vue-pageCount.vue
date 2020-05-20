<template>

    <div class="field">
        <i v-bind:class=iconCount></i> {{pageCountLabel}}
    </div>

</template>


<script>
    /**
     * @summary Shows page count as range / total of search (total docs).
     *
     * @memberof Components_List
     * @function vue-pageCount
     * @locus Client
     * @isTemplate true
     *
     * @param  {String} pageCounts
     *
     * @returns nothing
     *
     */

    export default {

        props: {
            pageCountLabel: String,
        },

        data() {
            return {
                iconCount: kanen.icons.DOC,
            }
        },

        watch: {
            pageCounts: function () {
                return this.pageCounts;
            }
        }
    }
</script>
