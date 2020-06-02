<script>
    /**
     * File input component for text or image types.
     *
     * @memberof Components:Form
     * @function fileBrowse
     * @locus Client
     * @augments fieldWrapper
     *
     * @param {Object} field
     * @param {Object} field.params (text) - {format: "text", type: ["json", "text.*"]},
     * @param {Object} field.params (image) -   { format: "image", type: ["image.*"],
     *                                            croppie: {viewport: {width: 450, height: 150, type: 'square'} }
     *                                          }
     *
     * @emits: 'on-inputentry' {value: {src, name}, error: false}
     *
     */

    //* common props from parent
    export let field = {};

    //* support functions
    import {documents} from '/imports/client/setup/systemGlobals'
    import {fileReader} from '/imports/client/setup/textCommon'
    import Icon from '/imports/components/elements/icon.svelte'
    import Crop_Image from '/imports/components/widgets/croppie.svelte'
    import {getContext, createEventDispatcher} from 'svelte';
    const dispatch = createEventDispatcher();
    let formText = getContext("formText");


    //* local reactive variable
    let inValue = {};

    let icon_img = "";
    let icon_txt = "";

    let hasCroppie = !!field.params.croppie;
    let showCroppie = false;
    let showCropArea = false;

    let showDelete = false;
    let showTxtImg = false;
    let messages = "";
    let format = "none";

    let errmsg = {
        file_too_long:   fileReader.file_too_long.replace("getImageSize", Math.round( documents.MAX_IMAGE_SIZE / 1024) ),
        file_wrong_type: fileReader.file_wrong_type,
    }

    $: setValue(field.value);


    //* event handlers
    function emitFile(selId) {
        dispatch('on-inputentry', {value: inValue, error: false}  );
    }

    //* functions that mutate local variables
    function setValue(val){
        inValue = val;

        messages = field.value.name;
        icon_img = field.value.src;
        showTxtImg = !!(field.value.src && field.params.format !== "image");
        format = field.params.format;
        showDelete = false;
    }

    function setfile(ev) {
        let files = ev.target.files;

        if (files.length > 0) {
            let file = files[0];

            //* basic file checks
            let isMatch = field.params.type.some(function (rx) {
                let type = RegExp(rx);
                return type.test(file.type);
            });

            if (!isMatch) {
                format = "none";
                messages = errmsg.file_wrong_type + file.type;
                return;
            }

            if (file.size > documents.MAX_IMAGE_SIZE) {
                format = "none";
                messages = errmsg.file_too_long + Math.round(file.size / 1024) + "KB";
                return;
            }

            //* get file data and maintain parent context
            format = field.params.format;
            let reader = new FileReader();

            reader.onload = () => {
                if (field.params.format === "image") {
                    showTxtImg = false;
                    icon_img = reader.result;

                } else {
                    showTxtImg = true;
                    showCroppie = false;
                }

                messages = file.name;
                inValue = {name: file.name, src: reader.result};

                dispatch('on-inputentry', {value: inValue, error: false} );
            };

            if (field.params && field.params.format) {
                (field.params.format === "image") ? reader.readAsDataURL(file) : reader.readAsText(file);
            } else {
                console.warn("Cannot read parms", field.params);
            }
        }
    }

    //* show / hide the delete file icon
    function txtImgEnter() {
        showDelete = true;
    }

    function deleteLeave() {
        showDelete = false;
    }

    //* on click of delete file icon, reset the field data
    function deleteInfo() {
        icon_img = "";
        icon_txt = "";
        showDelete = false;
        showTxtImg = false;
        messages = "";
        inValue = {name: "", src: "", size: 0};

        dispatch('on-inputentry', {value: inValue, error: false} );
    }

    function cropImage() {
        showCropArea = !showCropArea;
        showCroppie = !showCroppie;
    }

    function result(output) {
        icon_img = output.detail;
        inValue.src = output.detail;
        showCropArea = false;
        showCroppie = false;

        dispatch('on-inputentry', {value: inValue, error: false} );
    }

</script>


<div class="field has-addons">

    <div class="control">
        <div class="button is-primary is-height-browse">
            <Icon icon='{getContext("iconBrowse")}' class="text-1dot5rem"/>

            <input type="file" class="input file-input add-cursor" on:input="{setfile}">
        </div>
    </div>

    <div class="control is-expanded" on:mouseleave="{deleteLeave}">
        <div class="button is-height-browse is-file-name">

            <div  on:mouseenter="{txtImgEnter}">

                {#if showDelete}
                    <div class="icon-delete" on:click="{deleteInfo}">
                        <Icon icon='{getContext("iconFileDelete")}' class="is-size-1"/>
                    </div>

                {:else}

                    {#if format === 'text' && showTxtImg}
                        <Icon icon='{getContext("iconFileFile")}' class="is-size-1"/>
                    {/if}

                    {#if format === 'image'}
                        <div class="file-icon-img">
                            <img class="file-icon-img-src"
                                 src="{icon_img}"
                                 title="image file"
                                 style=""
                                 alt="">
                        </div>
                    {/if}

                {/if}
            </div>

            <div class="is-message-area text-0dot9rem">{@html messages}</div>
        </div>
    </div>

    {#if hasCroppie}
        <div class="control">
            <div class="button is-primary is-height-browse is-last-item" on:click="{cropImage}">
                <Icon icon='{getContext("iconCrop")}' class="text-1dot5rem"/>
            </div>
        </div>
    {/if}
</div>

{#if hasCroppie && showCroppie}
    <Crop_Image
            url="{icon_img}"
            options="{field.params && field.params.croppie ? field.params.croppie : {} }"
            on:croppie-result={result}/>
{/if}





<style>

    .file-icon-img {
        width: 100% !important;
        height: 6rem !important;
        cursor: pointer;
    }

    .file-icon-img-src {
        max-width: none;
        max-height: 4rem;
        margin-top: 1rem;
    }

    .icon-delete {
        color: #D81B60;
        cursor: pointer;
    }

    .is-height-browse {
        height: 6rem;
    }

    .is-file-name {
        width: 100%;
        cursor: default;
        text-align: left;
    }

    .is-message-area {
        width: 100%;
        padding-left: 1rem;
        white-space: normal;
        word-break: break-word;
    }

    .is-last-item {
        border-top-right-radius: 4px !important;
        border-bottom-right-radius: 4px !important;
    }

</style>
