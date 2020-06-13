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
    import {createEventDispatcher, setContext} from 'svelte';
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
    import {lastRoute} from '/imports/both/systemStores'

    import {logUser} from '/imports/functions/logUser'
    import Field_Wrapper from '/imports/components/formBuilder/fieldWrapper.svelte'
    import Auth_Service from './authService.svelte'
    import { navigateTo } from 'svelte-router-spa/src/spa_router'

    //* local static variables
    let services = pageConfig.services;
    let formFields = pageConfig.form;
    let formText = i18n(page, "form", $lang);
    setContext("formText", formText);

    //* local reactive variables
    let text = i18n(page, "page", $lang);
    let formEmail = "";
    let formPassword = "";
    let messages = [];
    let watchFields = {};

    function fieldChanged(msg){
        switch(msg.detail.field){
            case "loginEmail":
                formEmail = msg.detail.value
                break;

            case "loginPassword":
                formPassword = msg.detail.value;
                break;
        }

        watchFields = msg.detail;
    }


    function authPassword() {
        Meteor.loginWithPassword({email: formEmail}, formPassword, function (err) {
            redirect(err);
        });
    }

    function Auth(msg){
        redirect(msg.detail.err);
    }

    function redirect(err){
        messages = [];
        if (err) {
            messages.push(err.message);
        } else {
            logUser(Meteor.user(), "logIn");

            let penultimate = $lastRoute.length > 2 ? $lastRoute.slice(-2, -1)[0] : null;
            let target = penultimate && penultimate.name ? penultimate.name : "/myProfile";
            navigateTo(target);
        }
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

                    <a class="button is-primary mt-5" on:click="{authPassword}">
                        {text.btnSend}
                    </a>

                    {#if services}
                        <div class="is-divider field-hr" style="margin: 2.5rem 0 0.5rem 0;" data-content="{text.labelDivider}"></div>

                        {#each services as service}
                            <section class="level mt-5">
                                <Auth_Service on:on-auth={Auth} {...service} />
                            </section>
                        {/each}
                    {/if}

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
