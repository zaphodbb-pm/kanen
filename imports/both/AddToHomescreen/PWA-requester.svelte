<script>
    /**
     * Progressive Web App requester.
     *
     * @memberof PWA
     * @function PWA-requester
     * @locus Client
     *
     * @see based on work by {@link https://github.com/docluv/add-to-homescreen|Chris Love}
     */

    import {defaultPrompt, defaultSession, athDefaults} from "./func-athDefaults";
    import {getPlatform} from "./func-getPlatform";
    import {checkPlatform} from "./func-checkPlatform";
    import {nextPrime} from "./func-nextPrime";
    import {showPlatformGuidance} from "./func-showPlatformGuidance";
    import {athMainClass} from "./func-class_athMain";

    const text = {
        title: "Install this application to your home screen?",
        install: "Install",
        notNow: "Not Now"
    }


    //* prepare common variables
    let modalOpen = false;
    let instructions = null;

    let appID = athDefaults.appID;
    let nativePrompt = false;
    let platform = {};
    let _beforeInstallPrompt;

    //* load session
    let session = localStorage.getItem( appID );

    if ( session && session.added ) {
        console.log("session exists", session);
    }

    session = session ? JSON.parse( session ) : defaultSession;

    //* initialize component
    let initOpts = {
        onShow: function () {
            console.log( "showing" );

            modalOpen = true;
        },
        onInit: function (ath) {
            console.log( "initializing", ath );
        },
        onAdd: function () {
            console.log( "adding" );
        },
        onInstall: function () {
            console.log( "Installing" );
        },
        onCancel: function () {
            console.log( "Cancelling" );
        },

        displayPace: 0,

        debug: "iphone",
    };



    //* event handlers
    function btnClose(){
        modalOpen = false;
    }

    function btnNotNow(){
        console.log("btnNotNow");

        if ( ath.options.onCancel ) {
            ath.options.onCancel();
        }
        btnClose();
    }

    function btnInstall(){
        if ( ath.options.onInstall ) {
            ath.options.onInstall();
        }

        let checkPlatform = getPlatform(platform, ath.options.debug);

        if ( _beforeInstallPrompt && ( !ath.options.debug || checkPlatform === "native" ) ) {
            platform.closePrompt();
            triggerNativePrompt();

        } else {

            if ( ath.autoHideTimer ) {
                clearTimeout( ath.autoHideTimer );
            }

            let promptTarget = Object.assign({}, defaultPrompt, ath.options.customPrompt, ath.options.prompt[checkPlatform]);
            instructions = showPlatformGuidance( promptTarget );
        }
    }


    //* setup browser platform object
    platform = checkPlatform(window.navigator.userAgent);

    //* service worker check
    if ( "serviceWorker" in navigator ) {
        let manifestEle = document.querySelector( "[rel='manifest']" );
        if ( !manifestEle ) {
            console.log( "no manifest file" );
            platform.isCompatible = false;
        }

        navigator.serviceWorker.getRegistration().then( afterSWCheck );
    } else {
        afterSWCheck( {} );
    }


    let ath =  new athMainClass( initOpts, platform, session, );
    console.log("ath", ath);

    function autoHide() {
        let target = getPlatform(platform, ath.options.debug);
        //let ath_wrapper = document.querySelector( ath.options.athWrapper );

        console.log("ah", target);

        btnNotNow();
    }

    function _delayedShow(ath) {
        setTimeout( _show(ath, platform, _beforeInstallPrompt), ath.options.startDelay * 1000 + 500 );
    }


    function _show(ath, platform, _beforeInstallPrompt){
        if ( ath.canPrompt() ) {
            if ( _beforeInstallPrompt && !ath.options.mustShowCustomPrompt ) {
                triggerNativePrompt();

            } else {
                if ( ath.options.lifespan && ath.options.lifespan > 0 ) {
                    ath.autoHideTimer = setTimeout( autoHide, ath.options.lifespan * 1000 );
                }
            }

            // fire the custom onShow event
            if ( ath.options.onShow ) {
                ath.options.onShow.call( this );
            }

            // increment the display count
            session.lastDisplayTime = Date.now();
            session.displayCount++;

            if ( ath.options.displayNextPrime ) {
                session.nextSession = nextPrime( session.sessions );
            }

            ath.updateSession();
        }
    }


    //* displays native A2HS prompt & stores results
    function triggerNativePrompt() {
        return _beforeInstallPrompt.prompt()
                .then( function ( evt ) {

                    // Wait for the user to respond to the prompt
                    return _beforeInstallPrompt.userChoice;
                } )
                .then( function ( choiceResult ) {
                    session.added = ( choiceResult.outcome === "accepted" );

                    if ( session.added ) {
                        ath.doLog( "User accepted the A2HS prompt" );

                        if ( ath.options.onAdd ) {
                            ath.options.onAdd();
                        }

                    } else {

                        if ( ath.options.onCancel ) {
                            ath.options.onCancel();
                        }

                        session.optedout = true;
                        ath.doLog( "User dismissed the A2HS prompt" );
                    }

                    ath.updateSession();
                    _beforeInstallPrompt = null;
                } )
                .catch( function ( err ) {
                    ath.doLog( err.message );

                    if ( err.message.indexOf( "user gesture" ) > -1 ) {
                        ath.options.mustShowCustomPrompt = true;
                        _delayedShow(ath);
                    } else if ( err.message.indexOf( "The app is already installed" ) > -1 ) {

                        console.log( err.message );
                        session.added = true;
                        ath.updateSession();

                    } else {
                        console.log( err );
                        return err;
                    }
                } );
    }

    function afterSWCheck( sw ) {
        ath.sw = sw;

        if ( !ath.sw ) {
            console.log( "no service worker" );
            platform.isCompatible = false;
        }

        session.sessions += 1;
        ath.updateSession();

        // override defaults that are dependent on each other
        if ( ath.options && ath.options.debug && ( typeof ath.options.logging === "undefined" ) ) {
            ath.options.logging = true;
        }

        // normalize some options
        ath.options.mandatory = ath.options.mandatory && ( 'standalone' in window.navigator ||
                ath.options.debug );

        //this is forcing the user to add to homescreen before anything can be done
        //the ideal scenario for this would be an enterprise business application
        //could also be a part of an onboarding workflow for a SAAS
        ath.options.modal = ath.options.modal || ath.options.mandatory;

        if ( ath.options.mandatory ) {
            ath.options.startDelay = -0.5; // make the popup hasty
        }

        // setup the debug environment
        if ( ath.options.debug ) {
            platform.isCompatible = true;
        }

        if ( ath.options.onInit ) {
            ath.options.onInit.call( ath );
        }

        if ( ath.options.autostart ) {
            ath.doLog( "Add to homescreen: autostart displaying callout" );
            ath.show();

        } else if ( !nativePrompt ) {
            ath.show();
        }
    }


    function beforeInstallPrompt( evt ) {
        evt.preventDefault();
        console.log( "capturing the native A2HS prompt", ath );
        _beforeInstallPrompt = evt;
        _delayedShow(ath);
    }


    //* event handlers
    if ( "onbeforeinstallprompt" in window ) {
        window.addEventListener( "beforeinstallprompt", beforeInstallPrompt );
        nativePrompt = true;
    }

    if ( "onappinstalled" in window ) {
        window.addEventListener( "appinstalled", function ( evt ) {
            ath.doLog( "a2hs", "installed" );
            session.added = true;
            ath.updateSession();

            if ( ath.options.onInstall ) {
                ath.options.onInstall.call( this );
            }
        } );
    }

    if ( document.readyState === "interactive" || document.readyState === "complete" ) {
        //ath._delayedShow();
        _delayedShow(ath);
    } else {
        //const self = this;
        document.onreadystatechange = function () {
            if ( document.readyState === 'complete' ) {
                _delayedShow(ath);
            }
        };
    }

</script>



<div class="modal" class:is-active="{modalOpen}">
    <div class="modal-background"></div>
    <div class="modal-content">
        <div class="ath-container banner-center-left" style="display: block;">

            <div class="columns mx-3 mt-3">
                <div class="column is-half-tablet is-offset-one-quarter-tablet">

                    <div class="title is-5">
                        <p>{text.title}</p>
                    </div>

                    <div class="d-flex justify-content-around">
                        <button class="button is-success" on:click={btnInstall}>{text.install}</button>
                        <button class="button is-outlined is-link" on:click={btnNotNow}>{text.notNow}</button>
                    </div>

                    <div class="has-text-center">
                        <img src="pwa/pwa-logo-50x50.png" alt="PWA" class="ath-prompt-logo">
                    </div>

                    {#if instructions}
                        {#each instructions as instruction}
                            <div class="has-text-center">
                                <img src="{instruction.src}" alt="{instruction.alt}" class="ath-prompt-logo">
                            </div>
                        {/each}
                    {/if}

                </div>
            </div>
        </div>

    </div>
    <button class="modal-close is-large" aria-label="close" on:click={btnClose}></button>
</div>




<style>
    .ath-container {
        position: fixed;
        display: none;
        flex-direction: column;
        z-index: 1000;
        width: 100%;
        background-color: #eee;
        color: #000;
        padding: 1%;
        text-align: center;
    }

    .banner-top-left {
        top: 0;
        left: 0;
    }

    .banner-top-right {
        top: 0;
        right: 0;
    }

    .banner-bottom-left {
        left: 0;
        bottom: 0;
    }

    .banner-bottom-right {
        right: 0;
        bottom: 0;
    }

    .banner-center {
        left: 25%;
        top: 25%;
    }

    .banner-center-left {
        top: 25%;
        left: 0;
    }

    .banner-center-right {
        top: 25%;
        right: 0;
    }

    .banner-top-center {
        width: 50%;
        left: 25%;
        top: 12px;
    }

    .banner-bottom-center {
        bottom: 12px;
    }
</style>
