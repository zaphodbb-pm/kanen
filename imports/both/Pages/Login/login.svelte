<script>
    /**
     * Layout for Login page.
     *
     * @memberof Pages:Login
     * @function login
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
    import {lang} from '/imports/both/systemStores'

    //** get page text information and set contexts for children components
    import {header, page} from './login_text'
    setContext("pageHdr", header);

    //** get component configuration information and set contexts for children components
    import pageConfig from './login_config'

    //** get the page header common component; component get gets its own translated text from "pageText" context
    import Hdr from '/imports/both/pageStructure/PageHeader.svelte'

    //****************************************************************



    //* page-body support **************************
    import Field_Wrapper from '/imports/components/formBuilder/fieldWrapper.svelte'
    import Auth_Google from './thirdPartyAuth/authGoogle.svelte'
    import { navigateTo } from 'svelte-router-spa/src/spa_router'

    let formFields = pageConfig.form;
    let formText = i18n(page, "form", $lang);
    setContext("formText", formText);

    let text = i18n(page, "page", $lang);
    let messages = [];
    let watchFields = {};

    let formEmail = "";
    let formPassword = "";

    function fieldChanged(msg){

        console.log("fieldChanged", msg.detail, msg.detail.value);

        switch(msg.detail.field){
            case "loginSwitch":

                //* preserve email entry values
                let email = formFields.findIndex( (f) => f.field === "loginEmail");
                formFields[email].value = formEmail;

                //* preserve password entry values and toggle input type
                let pswd = formFields.findIndex( (f) => f.field === "loginPassword");
                formFields[pswd].attributes.type = msg.detail.value ? "text" : "password";
                formFields[pswd].value = formPassword;

                //* toggle switch field
                let toggle = formFields.findIndex( (f) => f.field === "loginSwitch");
                formFields[toggle].value = msg.detail.value;

                break;

            case "loginEmail":
                formEmail = msg.detail.value
                console.log("loginEmail", msg.detail.value);
                break;

            case "loginPassword":
                formPassword = msg.detail.value;
                console.log("loginPassword", msg.detail.value);
                break;
        }

        dispatch('field-changed', msg.detail);
        watchFields = msg.detail;
    }


    function buttonClickSend() {

        redirect();

        /*
        Meteor.loginWithPassword({email: getEmail}, getPassword, function (err) {
            redirect(err);
        });
        */
    }

    function Auth(msg){
        console.log("Auth", msg, msg.detail);
    }

    function redirect(err){
        messages = [];
        if (err) {
            messages.push(err.message);
        } else {
            targetPage();
        }
    }

    async function targetPage() {

        //let result = await Meteor.callPromise("loadExtraFields");
        //result = result ? result : null;

        //Session.set("userExtras", result ? result : {} );

        //buildNavLinkObjects(result);
        navigateTo("/myProfile");

        //*** if access was attempted to a restricted page and login worked, then redirect to attempted page

        /*
        let path = FlowRouter.getQueryParam('history');
        path = path ? path : destination;
        FlowRouter.go(path);

         */
    }

</script>



<Hdr />



<section class="page-body">

    <div class="columns is-centered">
        <div id="loginForm-display" class="column is-half">

            <div class="login-form card">

                <header class="card-header">
                    <p class="card-header-title">{text.labelTitle}</p>
                </header>

                <form class="card-content">
                    {#each formFields as field}
                        <div class="mb-3" style="padding-top: 1rem;">
                            <Field_Wrapper {field} {watchFields} on:field-changed="{fieldChanged}"/>
                        </div>
                    {/each}

                    <a class="button is-primary mt-5" on:click="{buttonClickSend}">
                        {text.btnSend}
                    </a>



                    <div class="is-divider field-hr" style="margin: 2.5rem 0 0.5rem 0;" data-content="{text.labelDivider}"></div>

                    <section class="level mt-5">
                        <Auth_Google on:on-auth={Auth}   />
                    </section>

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
