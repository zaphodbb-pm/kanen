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

        //** setup props to receive route data (optional)
        export let currentRoute;
        export let params;

        //** page specific text and configuration
        import {header, page} from './exportImport_text'
        import {pageConfig} from './exportImport_config'

        //** app support files
        import { setContext } from 'svelte';
        import PageWrapper from '/imports/both/pageStructure/PageWrapper.svelte'

    //* end of page boilerplate *************************************


    //* page-body support **************************
    import {i18n} from '/imports/functions/i18n'
    import {lang} from '/imports/client/systemStores'

    import {methodReturn} from '/imports/functions/methodReturn'
    import {parseJSONString} from '/imports/functions/parseJSONString'
    import {fileName} from '/imports/functions/fileName'
    import {fileSaver} from '/imports/functions/fileSaver'
    import Field_Wrapper from '/imports/components/formBuilder/fieldWrapper.svelte'

    let text = i18n(page, "components", $lang).card;
    let formText = i18n(page, "form", $lang);
    setContext("formText", formText);


    //* local reactive variables
    let messages = [];
    let build = {coll: "", fname: "", infile: "", fsize: 0}
    let documents = []
    let disableImport = true;
    let disableExport = true


    //* event handlers
    function importFile() {
        messages = [text.msgBuild];
        actionImport(build);
    }

    function exportFile() {
        messages = [text.msgBuild];
        actionExport(build.coll);
    }

    function updateCollection(msg) {
        let coll = msg.detail.value && msg.detail.value._id ? msg.detail.value._id : null;

        if(coll && coll !== "none"){
            build.coll = coll;
            disableExport = false;
            messages = [];
        }else{
            build.coll = null;
            disableExport = true;
            messages = [text.msgNoColl, coll];
        }
    }

    function updateFile(inMsg) {
        let msg = inMsg.detail.value;

        let test = parseJSONString(msg.src);

        if (test) {
            build.infile = test;
            build.fname = msg.name ? msg.name : "Unknown";
            build.fsize = msg.src.length;
            messages = [];
            disableImport = false;
        } else {
            console.warn("Not a valid JSON file: ", msg.name);
            disableImport = true;
        }
    }

    //** card specific action execution
    function actionExport(coll) {
        if (disableExport) {
            messages = [text.msgError];
        } else {
            if (coll && coll !== "none") {
                let fname = fileName(coll, "json");

                Meteor.call('exportJSON', coll, {}, function (err, fileContent) {
                    methodReturn(err, fileContent, "exportJSON");

                    if (fileContent) {
                        let blob = new Blob([fileContent.data], {type: "text/plain;charset=utf-8"});
                        let size = ` (${(fileContent.size / 1000).toFixed(1)} KB)`;

                        messages = [
                            "Export: " + fname,
                            "Records: " + fileContent.records + size
                        ];

                        fileSaver(blob, fname);
                    } else {
                        messages = [text.msgExportFail, err];
                    }
                });
            } else {
                messages = [text.msgError];
            }
        }
    }

    function actionImport(params) {
        if (disableImport && disableExport) {
            messages = [text.msgError];
        } else {

            if (params.coll && params.coll !== "none" && params.infile && params.infile.length > 0) {

                Meteor.call('importJSON', params.coll, params.infile, function (err, res) {
                    methodReturn(err, res, "importJSON");

                    if (res) {
                        messages = [
                            `Import: ${params.fname}`,
                            `Records: ${params.infile.length} (${(params.fsize / 1024).toFixed(1)} KB)`
                        ];
                    } else {
                        messages = [text.msgImportFail, err];
                    }
                });
            } else {
                messages = [text.msgError];
            }
        }
    }

</script>



<PageWrapper {header} >

    <div class="columns">
        <div class="column is-6-tablet">

            <article class="import-export card">

                <div class="card-header has-background-info">
                    <div class="card-header-title has-text-weight-semibold has-text-white" >
                        {text.title}
                    </div>
                </div>

                <div class="card-content">

                    <div class="level pb-5">
                        <div class="level-left w-75">
                            <div class="control w-100">

                                <Field_Wrapper
                                        class=""
                                        field="{pageConfig.components.collections}"
                                        watchFields="{ {} }"
                                        on:field-changed="{updateCollection}"/>

                            </div>
                        </div>

                        <div class="level-right">
                            <button class="button is-primary is-outlined"
                                    disabled="{disableExport}"
                                    on:click="{exportFile}">

                                {text.btnSend}
                            </button>
                        </div>
                    </div>

                    <div class="level mt-5">
                        <div class="level-left w-75">
                            <div class="control w-100">

                                <Field_Wrapper
                                        class=""
                                        field="{pageConfig.components.fileInput}"
                                        watchFields="{ {} }"
                                        on:field-changed="{updateFile}"/>

                            </div>
                        </div>

                        <div class="level-right">
                            <button class="button is-primary is-outlined"
                                    disabled="{disableImport || disableExport}"
                                    on:click="{importFile}">
                                {text.btnReceive}
                            </button>
                        </div>
                    </div>

                    {#if messages.length > 0}
                        <article class="message is-warning">
                            <div class="message-body">
                                {#each messages as message}
                                    <p>{message}</p>
                                {/each}
                            </div>
                        </article>
                    {/if}

                </div>

            </article>

        </div>
    </div>

</PageWrapper>
