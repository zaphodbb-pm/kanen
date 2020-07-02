<script>
    /**
     * Layout for ChangePassword page.
     *
     * @memberof Pages:ChangePassword
     * @function changePassword
     * @locus Client
     *
     */


    //* page set-up boilerplate *************************************

    //** setup props to receive route data (optional)
    export let currentRoute;
    export let params;

    //** page specific text and configuration
    import {header, page} from './changePassword_text'
    import {pageConfig} from './changePassword_config'

    //** app support files
    import { setContext } from 'svelte';
    import PageWrapper from '/imports/both/pageStructure/PageWrapper.svelte'

    //* end of page boilerplate *************************************


    //* page-body support **************************
    import {i18n} from '/imports/functions/i18n'
    import {lang} from '/imports/client/systemStores'

    import Field_Wrapper from '/imports/components/formBuilder/fieldWrapper.svelte'


    //* local reactive variables
    let formFields = pageConfig.form;
    let text = i18n(page, "page", $lang);
    let errMsg = i18n(page, "errMsg", $lang);
    let formText = i18n(page, "form", $lang);
    setContext("formText", formText);

    let formOldPassword = "";
    let formNewPassword = "";
    let messages = [];
    let watchFields = {};


    //** event handlers
    function fieldChanged(msg){
        switch(msg.detail.field){
            case "oldPassword":
                formOldPassword = msg.detail.value
                break;

            case "newPassword":
                formNewPassword = msg.detail.value;
                break;
        }

        watchFields = msg.detail;
    }


    function changePassword(msg){
        messages = [];

        Accounts.changePassword(formOldPassword, formNewPassword, function (err) {
            if (err) {
                let msg = errMsg[err.error];
                if(typeof err === "object" && !msg){
                    messages = [...messages, errMsg[401]];
                }else{
                    messages = [...messages, msg];
                }
            } else {
                messages = [...messages, errMsg[200]];
            }
        })
    }

</script>



<PageWrapper {header} >

    <div class="columns is-centered">
        <div id="changePasswordForm-display" class="column is-half">

            <div class="changePassword-form card">

                <header class="card-header">
                    <p class="card-header-title">{text.labelTitle}</p>
                </header>

                <form class="card-content">
                    {#each formFields as field}
                        <Field_Wrapper class="my-4" {field} {watchFields} on:field-changed="{fieldChanged}"/>
                    {/each}

                    <a class="button is-primary my-5" on:click="{changePassword}">
                        {text.btnSend}
                    </a>

                    <article class="message is-warning" class:is-hidden="{messages.length < 1}">
                        <div class="message-body">
                            {#each messages as message}
                                <p>{message}</p>
                            {/each}
                        </div>
                    </article>
                </form>

            </div>

        </div>
    </div>

</PageWrapper>
