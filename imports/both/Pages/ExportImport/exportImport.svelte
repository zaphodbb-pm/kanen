<script>
    /**
     * General input card with export import functionality.
     *
     * @memberof Pages:ExportImport
     * @function exportImport
     * @locus Client
     *
     */


    //* page set-up boilerplate *************************************

    //** setup props to receive route data
    export let currentRoute;
    export let params;

    //** app services (getContext is often optional)
    import { setContext } from 'svelte';

    //** get the user language preference from store (optional)
    import {i18n} from '/imports/functions/i18n'
    import {lang} from '/imports/client/systemStores'

    //** get page text information and set contexts for children components
    import {header, page} from './exportImport_text'

    setContext("pageHdr", header);
    setContext("pageText", page);

    //** get component configuration information and set contexts for children components
    import pageConfig from './exportImport_config'
    setContext("pageConfig", pageConfig);

    //** get the page header common component; component get gets its own translated text from "pageText" context
    import Hdr from '/imports/both/pageStructure/PageHeader.svelte'

    //****************************************************************



    //* page-body support **************************
    import {onMount, onDestroy} from 'svelte'

    //* get application specific support libraries
    import {parseJSONString} from '/imports/functions/parseJSONString'
    import {fileName} from '/imports/functions/fileName'
    import {fileSaver} from '/imports/functions/fileSaver'

    let text = {};


            //** define specific input fields
    let info = {
        collections: {
            parms: {type: "staticSelect"},

            value: {},
            attributes: {},
            selLabel: text.labelTarget,
                    cmpSelects: text.targets,
        },

        fileInput: {
            parms: {format: "text", type: ["json"]},
            value: {},
            attributes: {},
            cmpLabel: text.labelInputFile,
                    cmpSelects: text.targets,
        },

        build: {coll: "", fname: "", infile: "", fsize: 0},
        documents: [],
                messages: [],

                disableReceive: true,
                disableSend: true,
    }


    //** general button activation with specific actions
    function buttonClickReceive() {
        info.messages = [text.msgBuild];
        cardActionReceive(info.build);
    }

    function buttonClickSend() {
        info.messages = [text.msgBuild];
        cardActionSend(info.build.coll);
    }


    //** card specific field input data
    function updateCollection(msg) {
        info.build.coll = msg._id;
        info.disableSend = false;
        info.messages = [];
    }

    function updateFile(msg) {
        let test = parseJSONString(msg.src);

        if (test) {
            info.build.infile = test;
            info.build.fname = msg.name ? msg.name : "Unknown";
            info.build.fsize = msg.src.length;
            info.messages = [];
            info.disableReceive = false;
        } else {
            console.warn("Not a valid JSON file: ", msg.name);
            info.disableReceive = true;
        }
    }

    //** card specific action execution
    function cardActionSend(coll) {

        if (info.disableSend) {
            info.messages = [text.msgError];
        } else {
            if (coll && coll !== "none") {
                let fname = fileName(coll, "json");

                Meteor.call('exportJSON', coll, {}, function (err, fileContent) {
                    //methodReturn(err, fileContent, "exportJSON");

                    if (fileContent) {
                        let blob = new Blob([fileContent.data], {type: "text/plain;charset=utf-8"});
                        let size = ` (${(fileContent.size / 1000).toFixed(1)} KB)`;

                        info.messages = [
                            "Export: " + fname,
                            "Records: " + fileContent.records + size
                        ];

                        fileSaver(blob, fname);
                    } else {
                        info.messages = [text.msgExportFail, err];
                    }
                });
            } else {
                info.messages = [text.msgError];
            }
        }
    }

    function cardActionReceive(params) {

        if (info.disableReceive && info.disableSend) {
            info.messages = [text.msgError];
        } else {

            if (params.coll && params.coll !== "none" && params.infile && params.infile.length > 0) {

                Meteor.call('importJSON', params.coll, params.infile, function (err, res) {
                    //methodReturn(err, res, "importJSON");

                    if (res) {
                        info.messages = [
                            `Import: ${params.fname}`,
                            `Records: ${params.infile.length} (${(params.fsize / 1024).toFixed(1)} KB)`
                        ];
                    } else {
                        info.messages = [text.msgImportFail, err];
                    }
                });
            } else {
                info.messages = [text.msgError];
            }
        }
    }


</script>



<Hdr />



<section class="page-body">

    <div class="columns">
        <div class="column is-6-tablet">

            <div class="vue-general-purpose card">

                <div class="card-header {text.bg}">
                    <div class="card-header-title" style="color: inherit; font-size: inherit; font-weight: inherit;">
                        {text.title}
                    </div>
                </div>

                <div class="card-content">

                    <!-- card specific fields and functionality -->
                    <div class="columns">

                        <div class="column is-three-quarters">

                            <div class="field">
                                <div class="control is-expanded">
                                    select
                                    <!--
                                    <vue-select class="is-fullwidth"
                                                v-bind="info.collections"
                                                v-on:on-select="updateCollection">
                                    </vue-select>
                                    -->
                                </div>
                            </div>

                            <div class="field">
                                <div class="control is-expanded">
                                    file browse

                                    <!--
                                    <vue-file-browse class="is-fullwidth"
                                                     v-bind="info.fileInput"
                                                     v-on:on-newfile="updateFile">
                                    </vue-file-browse>
                                    -->
                                </div>
                            </div>

                            <div class="">
                                <a class="button {text.btn}"
                                   disabled="{info.disableReceive || info.disableSend}"
                                   on:click="{buttonClickReceive}">
                                    {text.btnReceive}
                                </a>
                            </div>

                        </div>

                        <div class="column">
                            <a class="button is-pulled-right {text.btn}"
                               disabled="{info.disableSend}"
                               on:click="{buttonClickSend}">
                                {text.btnSend}
                            </a>
                        </div>

                    </div>

                    {#if info.messages.length > 0}
                        <article class="message is-warning">
                            <div class="message-body">
                                {#each info.messages as message}
                                    <p>{message}</p>
                                {/each}
                            </div>
                        </article>
                    {/if}

                </div>

            </div>

        </div>
    </div>

</section>
