<script>
    /**
     * Radio buttons to select a relative range of time values.
     *
     * @memberof Pages:ChangePassword
     * @function changePassword
     * @locus Client
     *
     */


    //* page set-up boilerplate *************************************

    //** setup props to receive route data
    export let currentRoute;
    export let params;

    //* support functions
    import {createEventDispatcher, setContext, getContext} from 'svelte';
    const dispatch = createEventDispatcher();

    //** get the user language preference from store (optional)
    import {i18n} from '/imports/functions/i18n'
    import {lang} from '/imports/client/systemStores'

    //** get page text information and set contexts for children components
    import {header, page} from './changePassword_text'
    setContext("pageHdr", header);

    //** get component configuration information and set contexts for children components
    import pageConfig from './changePassword_config'

    //** get the page header common component; component get gets its own translated text from "pageText" context
    import Hdr from '/imports/both/pageStructure/PageHeader.svelte'

    //****************************************************************



    //* page-body support **************************
    import {logUser} from '/imports/functions/logUser'
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
                logUser(Meteor.user(), "changePassword");
            }
        })
    }

</script>



<Hdr />



<section class="page-body">

    <div class="columns is-centered">
        <div id="changePasswordForm-display" class="column is-half">

            <div class="changePassword-form card">

                <header class="card-header">
                    <p class="card-header-title">{text.labelTitle}</p>
                </header>

                <form class="card-content">
                    {#each formFields as field}
                        <div class="mb-3" style="padding-top: 1rem;">
                            <Field_Wrapper {field} {watchFields} on:field-changed="{fieldChanged}"/>
                        </div>
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

</section>
