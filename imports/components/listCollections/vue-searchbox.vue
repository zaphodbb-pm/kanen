<template>

    <div>
        <div class="field has-addons" style="margin: 0;">
            <div class="control">
                <a class="button is-static">
                    <i v-bind:class="iconSearch"></i>
                </a>
            </div>

            <div class="control is-expanded">
                <input type="text" v-on:keyup="changesearch" v-model="searchchars" class="input"
                       aria-label="input field" title="search input">

            </div>

            <div class="control">
                <a v-if="showIcon"
                   v-on:click.prevent="toggleHelp"
                   class="button is-primary is-outlined">

                    <i v-bind:class="iconHelp"></i>
                </a>
            </div>
        </div>

        <div v-bind:class="{'open-body': showHelp, 'close-body': !showHelp}">
            <p class="is-family-secondary" v-html="helpText"></p>
        </div>

    </div>

</template>


<script>
    /**
     * @summary Builds a string to be used by various search mechanisms.
     *
     * @memberof Components_List
     * @function vue-searchbox
     * @locus Client
     * @isTemplate true
     *
     * @returns {Object} - emits 'search-changed' with {search: string}
     *
     */

    import {i18n} from '/imports/client/functions/func-i18n'
    import searchBoxText from './vue-searchbox_text'

    export default {

        props: {
            fields: Array,
            clearSearch: Boolean
        },

        data() {
            let help = i18n(searchBoxText, "helpText");
            let label = i18n(searchBoxText, "label");

            return {
                iconSearch: kanen.icons.SEARCH,
                iconHelp: kanen.icons.SEARCH_HELP + " text-1dot3rem",

                label: label ? label : "",
                helpText: help ? help : "",

                searchchars: "",
                showIcon: !!help,
                showHelp: false,
            }
        },

        watch: {

            clearSearch() {
                this.searchchars = "";
            }
        },

        methods: {

            changesearch() {

                if (this.searchchars.length > 2) {                              // need at least three characters to start a query
                    this.searchchars = this.searchchars.replace(/ /g, '');      // remove all white spaces
                    let query = this.buildQuery(this.searchchars, this.fields);
                    this.$emit('search-changed', {search: this.searchchars, query: query});
                } else {
                    this.$emit('search-changed', {search: "", query: null});
                }
            },

            toggleHelp() {
                this.showHelp = !this.showHelp;
            },

            //* search string parser where "str" is the user entered string and fields are the collection fields to search
            buildQuery(str, fields) {
                let compound = null;

                if (!str.includes(";") && !str.includes("+")) {
                    let search = [];

                    _.each(fields, function (el) {
                        let s = {};

                        //** checks for "!" and builds negated term
                        if (str.charAt(0) === "!") {
                            s[el] = {$regex: ".*" + str.slice(1) + ".*", $options: "i"};
                        } else {
                            s[el] = {$regex: ".*" + str + ".*", $options: "i"};
                        }

                        search.push(s);
                    });

                    if (str.includes("!")) {
                        compound = {$nor: search};
                    } else {
                        compound = {$or: search};
                    }
                }

                if (str.includes(";")) {
                    compound = this.orSplit(str, fields);
                }

                if (!str.includes(";") && str.includes("+")) {
                    compound = this.andSplit(str, fields);
                }

                return compound;
            },

            //* checks for "+" and builds MongoDb anded search term
            andSplit(arr, fields) {
                const self = this;
                let ands = arr.split("+");
                let andArray = [];

                _.each(ands, function (el) {
                    let andTerm = [];

                    _.each(fields, function (eli) {
                        let item = {};
                        if (el.length > 1) {                //need at least two characters to form a compound search
                            item[eli] = self.checkString(el);
                            andTerm.push(item);
                        }
                    });

                    if (andTerm.length > 0) {
                        if (el.includes("!")) {
                            andArray.push({$nor: andTerm});
                        } else {
                            andArray.push({$or: andTerm});
                        }
                    }
                });

                return {$and: andArray};
            },

            //* checks for ";" and builds MongoDb ored search term
            orSplit(arr, fields) {
                const self = this;
                let ors = arr.split(";");
                let orArray = [];

                _.each(ors, function (el) {
                    let orTerm = [];

                    if (el.includes("+")) {
                        orArray.push(self.andSplit(el, fields));
                    } else {
                        _.each(fields, function (eli) {
                            let item = {};

                            if (el.length > 1) {                //need at least two characters to form a compound search
                                item[eli] = {$regex: ".*" + el + ".*", $options: "i"};
                                orTerm.push(item);
                            }
                        });

                        if (orTerm.length > 0) {
                            orArray.push({$or: orTerm});
                        }
                    }
                });

                return {$or: orArray};
            },


            checkString(str) {
                if (str.charAt(0) === "!") {
                    return {$regex: ".*" + str.slice(1) + ".*", $options: "i"};
                } else {
                    return {$regex: ".*" + str + ".*", $options: "i"};
                }
            }
        }
    }

</script>


<style scoped>

    .open-body {
        overflow: hidden;
        max-height: 50rem;

        transition-property: all;
        transition-duration: 3s;
        transition-timing-function: cubic-bezier(0.25, 0.1, 0.25, 1);
    }

    .close-body {
        overflow: hidden;
        max-height: 0;

        transition-property: all;
        transition-duration: 1.5s;
        transition-timing-function: cubic-bezier(0.25, 0.1, 0.25, 1);
    }

</style>
