<template>

    <div>
        <div class="field has-addons">

            <div class="control">
                <div class="button is-primary is-height-browse">
                    <i v-bind:class="icon_browse" title=""></i>

                    <input type="file" class="input file-input add-cursor"
                           v-on:input="setfile"
                           v-bind:placeholder="ph">
                </div>
            </div>

            <div class="control is-expanded">
                <div class="button is-height-browse is-file-name">

                    <div v-on:mouseleave="deleteLeave" v-on:mouseenter="txtImgEnter">
                        <div class="icon-delete" v-show='showDelete' v-on:click="deleteInfo">
                            <i v-bind:class="icon_del" title=""></i>
                        </div>

                        <div v-show='!showDelete'>
                            <div class="file-icon-txt" v-if="format === 'text'">
                                <span v-show="showTxtImg">
                                    <i v-bind:class="icon_txt" title=""></i>
                                </span>
                            </div>

                            <div class="file-icon-img" v-if="format === 'image'">
                                <img class="file-icon-img-src"
                                     v-bind:src="icon_img"
                                     title=""
                                     style=""
                                     alt="file input icon">
                            </div>
                        </div>
                    </div>

                    <div class="is-message-area text-0dot9rem" v-html="messages"></div>
                </div>
            </div>

            <div class="control" v-if="hasCroppie">
                <div class="button is-primary is-height-browse is-last-item" v-on:click="cropImage">
                    <i v-bind:class="icon_crop" title=""></i>
                </div>
            </div>

            <label class="has-float-label adjust-label">{{cmpLabel}}</label>

        </div>

        <div class="" v-show="hasCroppie && showCropArea">
            <vue-croppie
                    ref="croppieRef"
                    style="height: 500px; margin-bottom: 75px;"
                    v-bind:viewport="parms.croppie && parms.croppie.viewport ? parms.croppie.viewport : {}"
                    v-on:result="result"
                    v-on:update="update">

            </vue-croppie>
        </div>

    </div>

</template>



<script>
    /**
     * @summary Vue based file input component for text or image types.
     *
     * @memberof Components_Form
     * @function vue-fileBrowse
     * @locus Client
     * @isTemplate true
     * @augments vue-formFields
     *
     * @requires './vue-fileBrowse_text'
     * @requires {i18nf}_from_'/imports/client/functions/func-i18nf'
     *
     * @return nothing - emits: newFile
     *
     */

    import './vue-fileBrowse_text'
    import {i18nf} from '/imports/client/functions/func-i18nf'
    import VueCroppie from '/imports/client/components/vues-utils/vue-croppie'


    export default {

        props: {
            ph: String,
            parms: Object,
            value: Object,
            cmpLabel: String
        },

        data: function () {
            return {
                icon_browse: kanen.icons.FILE_BROWSE,
                icon_crop: kanen.icons.CROP,
                icon_del: kanen.icons.FILE_DEL,
                icon_txt: kanen.icons.FILE_FILE,
                icon_img: "",

                hasCroppie: !!this.parms.croppie,
                showCroppie: false,
                showCropArea: false,

                showDelete: false,
                showTxtImg: false,
                messages: "",

                val: this.value,
                format: "none"
            };
        },

        components: {VueCroppie},

        methods: {
            setfile(ev) {
                let files = ev.target.files;

                if (files.length > 0) {
                    let file = files[0];

                    //* basic file checks
                    let isMatch = this.parms.type.some(function (rx) {
                        let type = RegExp(rx);
                        return type.test(file.type);
                    });

                    if (!isMatch) {
                        this.format = "none";
                        this.messages = i18nf("vue_fileBrowse.file_wrong_type") + file.type;
                        return;
                    }

                    //* JSON files are a special case
                    let processJson = file.type.includes("json") && file.size < 512 * 1024 * 1024;

                    if (!processJson && file.size > kanen.constants.MAX_IMAGE_SIZE) {
                        this.format = "none";
                        this.messages = i18nf("vue_fileBrowse.file_too_long") + Math.round(file.size / 1024) + "KB";
                        return;
                    }

                    //* get file data and maintain parent context
                    this.format = this.parms.format;
                    let reader = new FileReader();

                    reader.onload = () => {
                        if (this.parms.format === "image") {
                            this.showTxtImg = false;
                            this.icon_img = reader.result;
                            this.showCroppie = true;

                        } else {
                            this.showTxtImg = true;
                            this.showCroppie = false;
                        }

                        this.messages = file.name;
                        this.val = {name: file.name, src: reader.result};

                        this.$emit('on-newfile', this.val);
                        this.$emit('input', this.val);
                    };

                    if (this.parms && this.parms.format) {
                        (this.parms.format === "image") ? reader.readAsDataURL(file) : reader.readAsText(file);
                    } else {
                        console.warn("Cannot read parms", this.parms);
                    }
                }
            },


            //* show / hide the delete file icon
            txtImgEnter() {
                this.showDelete = true;
            },

            deleteLeave() {
                this.showDelete = false;
            },

            //* on click of delete file icon, reset the field data
            deleteInfo() {
                this.icon_img = "";
                this.icon_txt = "";
                this.showTxtImg = false;
                this.messages = "";
                this.val = {name: "", src: "", size: 0};

                this.$emit('on-newfile', this.val);
                this.$emit('input', this.val);
            },

            cropImage() {
                this.showCropArea = !this.showCropArea;
                this.$refs.croppieRef.bind({url: this.icon_img});
            },

            result(output) {
                this.icon_img = output;
                this.val.src = output;
                this.$emit('input', this.val);
                this.$emit('on-newfile', this.val);
                this.showCropArea = false;
            },

            update(val) {
                //console.log("update", val);
            }
        },

        watch: {
            value() {
                this.val = this.value;
                this.messages = this.value.name;
                this.icon_img = this.value.src;
                this.showTxtImg = !!(this.value.src && this.parms.format !== "image");
                this.format = this.parms.format;
                this.showDelete = false;
            }
        }
    }
</script>


<style scoped>

    .file-icon-txt {
        font-size: 2rem;
        width: 4rem !important;
        cursor: pointer;
    }

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
        height: 4rem;
        width: 4rem;
        cursor: pointer;
        font-size: 3rem;
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
