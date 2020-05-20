<template>

    <fieldset class="box vue-dragDrop">

        <div class="columns">
            <div class="column" v-for="(col, idx) in columns" v-bind:key="idx">

                <div class="has-border-left pl-2">
                    <div class="title is-size-6">{{titles[idx]}}</div>

                    <Container group-name="buildColumn"
                               v-bind:get-child-payload="getChildPayload(idx)"
                               v-on:drop="onDrop(idx, $event)">

                        <Draggable v-for="item in col" v-bind:key="item.id">
                            <div class="draggable-item">
                                {{item.data.label}}
                            </div>
                        </Draggable>
                    </Container>

                </div>

            </div>
        </div>

        <label class="has-float-label">{{cmpLabel}}</label>
    </fieldset>

</template>

<script>
    /**
     * @summary Vue array drag and drop items into columns.
     *
     * @memberof Components_Form
     * @function vue-dragColumns
     * @locus Client
     * @isTemplate true
     * @augments vue-formFields
     *
     * @return nothing - emits: onArray with string value
     *
     */

    //* get application specific support libraries
    import {Container, Draggable, smoothDnD} from 'vue-smooth-dnd'

    export default {
        props: {
            id: String,
            cmpLabel: String,
            value: Array,
            attributes: Object,
            parms: Object,
        },

        data() {
            return {
                arrValue: this.value,

                columns: {},
                children: {},
                titles: [],

                headings: this.parms.headers,
                rows: this.parms.rows
            }
        },

        components: {
            Container,
            Draggable,
            smoothDnD
        },

        watch: {

            value() {
                this.arrValue = this.value;
            }
        },

        mounted() {

            if (this.headings && this.headings.length > 0) {
                let length = this.headings.length;
                let temp = this.buildColumns(length, this.rows);

                this.columns = temp.items;
                this.titles = temp.titles;
            }
        },

        methods: {

            onDrop(col, dropResult) {
                this.columns[col] = this.applyDrag(this.columns[col], dropResult);

                //console.log("new drop", col, dropResult, this.columns[col])
            },

            getChildPayload(idx) {
                return (function (index) {
                    return this.columns[idx][index]
                }).bind(this);
            },

            buildColumns(cols, len) {
                let items = {};
                let titles = {};
                let colNum = 0;

                while (colNum < cols) {
                    items["col" + colNum] = this.generateItems(len, i => ({
                        id: `${colNum + 1}${i}`,
                        hdr: this.headings[colNum],
                        data: {
                            label: `Item ${colNum + 1} - ${i}`,
                            value: colNum,
                        }
                    }));

                    titles["col" + colNum] = this.headings[colNum];
                    colNum++;
                }

                return {titles: titles, items: items};
            },

            applyDrag(arr, dragResult) {
                const {removedIndex, addedIndex, payload} = dragResult;
                if (removedIndex === null && addedIndex === null) return arr;

                const result = [...arr];
                let itemToAdd = payload;

                if (removedIndex !== null) {
                    itemToAdd = result.splice(removedIndex, 1)[0];
                }

                if (addedIndex !== null) {
                    result.splice(addedIndex, 0, itemToAdd);
                }

                return result
            },

            generateItems(count, creator) {
                const result = [];
                for (let i = 0; i < count; i++) {
                    result.push(creator(i));
                }

                return result;
            }
        }
    }

</script>


<style scoped>

    .draggable-item {
        cursor: pointer;
    }

    .drag-handle {
        float: left;
        padding: 0 10px
    }

</style>