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

        //** setup props to receive route data (optional)
        export let currentRoute;
        export let params;

        //** page specific text and configuration
        import {header, page} from './login_text'
        import {pageConfig} from './login_config'

        //** app support files
        import { setContext  } from 'svelte';
        import PageWrapper from '/imports/both/PageStructure/PageWrapper.svelte'

    //* end of page boilerplate *************************************



    //* page-body support **************************
    import {i18n} from '/imports/functions/i18n'
    import {lang} from '/imports/client/systemStores'

    import {lastRoute} from '/imports/client/systemStores'
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
            let penultimate = $lastRoute.length > 2 ? $lastRoute.slice(-2, -1)[0] : null;
            let target = penultimate && penultimate.name ? penultimate.name : "/myProfile";
            navigateTo(target);
        }
    }

</script>



<PageWrapper {header} >

    <div class="columns is-centered">
        <div id="loginForm-display" class="column is-half">

            <div class="login-form card">

                <header class="card-header">
                    <p class="card-header-title">{text.labelTitle}</p>
                </header>

                <form class="card-content">
                    {#each formFields as field}
                        <Field_Wrapper class="my-4" {field} {watchFields} on:field-changed="{fieldChanged}"/>
                    {/each}

                    <a class="button is-primary mt-4" on:click="{authPassword}">
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

</PageWrapper>
