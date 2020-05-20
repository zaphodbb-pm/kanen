<template>

    <nav class="pagination is-centered is-small mt-2" role="navigation" aria-label="pagination">

        <ul v-if="showPages" class="pagination-list">
            <li v-if="more">
                <a v-on:click="prev" class="pagination-link" aria-label="prev">
                    &lt;
                </a>
            </li>

            <li v-for="item in items">
                <a class="pagination-link"
                   v-bind:aria-label="item"
                   v-bind:class="{'is-current': item === currPage}"
                   v-on:click="changepager(item)">
                    {{item}}
                </a>
            </li>

            <li v-if="more">
                <a v-on:click="next" class="pagination-link" aria-label="next">
                    &gt;
                </a>
            </li>
        </ul>
    </nav>

</template>


<script>
    /**
     * @summary Builds pagination bar.
     *
     * @memberof Components_List
     * @function vue-pagination
     * @locus Client
     * @isTemplate true
     *
     * @param  {Number} pagesQuery
     * @param  {Number} pagesRow
     * @param  {Number} pagesLength
     *
     * @returns {Object} - emits 'page-changed'
     *
     */

    export default {

        props: {
            rows: Number,
            totalDocs: Number,
        },

        data() {
            return {
                more: false,
                showPages: true,
                pages: 1,
                items: [],
                currPage: 1,
                pagesLength: 5                  // sets the number of pagination targets
            }
        },

        methods: {
            changepager(page) {
                this.currPage = page;
                this.$emit('page-changed', {
                    page: page
                });
            },

            prev() {
                if (this.currPage > 1) {
                    this.currPage = this.currPage - 1;
                    this.changepager(this.currPage);

                    if (this.currPage >= this.pagesLength) {
                        this.items.pop();
                        this.items.unshift(this.currPage + 1 - this.pagesLength);
                    }
                }
            },

            next() {
                if (this.currPage < this.pages) {
                    this.currPage = this.currPage + 1;
                    this.changepager(this.currPage);

                    if (this.currPage > this.pagesLength) {
                        let maxPage = this.currPage < this.pages ? this.currPage : this.pages;

                        this.items.shift();
                        this.items.push(maxPage);
                    }
                }
            },
        },


        watch: {
            totalDocs() {
                let totPages = Math.ceil(this.totalDocs / this.rows);
                let len = totPages < this.pagesLength ? totPages : this.pagesLength;

                this.pages = totPages;
                this.items = [...Array(len).keys()].map(x => ++x);
                this.more = totPages > this.pagesLength;
                this.showPages = (totPages > 1);
            },

            rows() {
                let totPages = Math.ceil(this.totalDocs / this.rows);
                let len = totPages < this.pagesLength ? totPages : this.pagesLength;

                this.pages = totPages;
                this.items = [...Array(len).keys()].map(x => ++x);
                this.more = totPages > this.pagesLength;
                this.showPages = (totPages > 1);
            }
        }
    }
</script>