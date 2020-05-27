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

    //* props
    export let fields = [];
    export let clearSearch = false;

    //** support functions
    import {getContext} from 'svelte';
    import Icon from '/imports/components/elements/icon.svelte'
    import {createEventDispatcher} from 'svelte';
    const dispatch = createEventDispatcher();

    import {i18n} from '/imports/functions/i18n'
    import searchBoxText from '/imports/client/setup/textSearch'

    //* local raective variables
    let helpText = i18n(searchBoxText, "helpText");
    let label = i18n(searchBoxText, "label");
    let searchchars = "";
    let showIcon = !!helpText;
    let showHelp = false;


    function changesearch() {

        if (searchchars.length > 2) {                              // need at least three characters to start a query
            searchchars = searchchars.replace(/ /g, '');      // remove all white spaces
            let query = buildQuery(searchchars, fields);
            dispatch('search-changed', {search: searchchars, query: query});
        } else {
            dispatch('search-changed', {search: "", query: null});
        }
    }

    function toggleHelp() {
        showHelp = !showHelp;
    }

    //* search string parser where "str" is the user entered string and fields are the collection fields to search
    function buildQuery(str, fields) {
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
    }

    //* checks for "+" and builds MongoDb anded search term
    function andSplit(arr, fields) {
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
    }

    //* checks for ";" and builds MongoDb ored search term
    function orSplit(arr, fields) {
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
    }

    function checkString(str) {
        if (str.charAt(0) === "!") {
            return {$regex: ".*" + str.slice(1) + ".*", $options: "i"};
        } else {
            return {$regex: ".*" + str + ".*", $options: "i"};
        }
    }

</script>


<div>
    <div class="field has-addons" style="margin: 0;">
        <div class="control">
            <a class="button is-static">
                <Icon icon='{getContext("iconSearch")}' class="text-1dot5rem"/>
            </a>
        </div>

        <div class="control is-expanded">
            <input type="text" on:keyup="{changesearch}" bind:value="{searchchars}" class="input"
                   aria-label="input field" title="search input">

        </div>

        <div class="control">
            {#if showIcon}
                <a class="button is-info is-outlined" on:click="{toggleHelp}">

                    <Icon icon='{getContext("iconHelp")}' class="text-1dot5rem"/>
                </a>
            {/if}
        </div>
    </div>

    <div class="{showHelp ? 'open-body': 'close-body'}">
        <p class="is-family-secondary">{@html helpText}</p>
    </div>

</div>


<style>

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
